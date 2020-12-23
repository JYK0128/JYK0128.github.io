import qs from "qs";

interface OauthServerType {
    client_id: string;
    client_secret: string;

    authorization_uri: string;
    response_type: string;
    scope: string;

    access_token_uri: string;
    redirect_uri: string;
    grant_type: string;
    state: string;
}

export default class OauthServer{
    info: OauthServerType;

    constructor(serverInfo: OauthServerType) {
        this.info = serverInfo;
    }

    getAuthorizationUri() {
        const param = qs.stringify({
            client_id: this.info.client_id,
            redirect_uri: this.info.redirect_uri,
            response_type: this.info.response_type,
            scope: this.info.scope,
            state: this.info.state,
        })
        return this.info.authorization_uri + "?" + param;
    };

    async getCode(popup: Window) {
        return new Promise<string>((resolve) => {
            const intervalID = window.setInterval(() => {
                if(popup.closed){
                    window.clearInterval(intervalID);
                }else {
                    try{
                        const currentUrl = popup.location.href;
                        console.log(currentUrl);
                        const params = new URL(currentUrl).searchParams;
                        const code = params.get('code');

                        if (code) {
                            resolve(code);
                            popup.close();
                        }
                    }catch (error){
                        //ignore error
                    }
                }
            }, 500);
        })
    }

    async getAccessToken(code: string) {
        const param = qs.stringify({
            code: code,
            client_id: this.info.client_id,
            client_secret: this.info.client_secret,
            redirect_uri: this.info.redirect_uri,
            grant_type: this.info.grant_type,
            state: this.info.state
        })
        const init = {
            method: "POST"
        }

        return fetch(this.info.access_token_uri + "?" + param, init)
            .then(res => res.json())
            .then(json => json.access_token as string)
            .then(access_token => access_token ? access_token : Promise.reject(new Error("can't get access token")))
    }
}