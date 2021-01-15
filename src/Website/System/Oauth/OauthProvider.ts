import RenderUtils from "../../Utils/RenderUtils";
import {UserContextType} from '../Context/UserContext';
import OauthServer from "./OauthServer";

const base_uri = process.env.PUBLIC_URL? process.env.PUBLIC_URL : "http://localhost";
const provider = new Map();

provider.set("google", new OauthServer({
    client_id: "278564592334-j2vlvrr7lc06tfglindqf564tg75h0qt.apps.googleusercontent.com",
    client_secret: "UF_Crv3IRVPtZLm7DdVEggzs",
    access_token_uri: "https://www.googleapis.com/oauth2/v4/token",
    authorization_uri: "https://accounts.google.com/o/oauth2/v2/auth",
    redirect_uri: base_uri + "/oauth2/code/google",
    scope: "email openid",
    response_type: "code",
    grant_type: "authorization_code",
    state: "state"
}));

provider.set("kakao", new OauthServer({
    client_id: "6d70a01b8b65ab91b4ecfaea251c1422",
    client_secret: "c8bNweg3AF2xMkX5xmhHaCikplsjVcqm",
    access_token_uri: "https://kauth.kakao.com/oauth/token",
    authorization_uri: "https://kauth.kakao.com/oauth/authorize",
    redirect_uri: base_uri + "/oauth2/code/kakao",
    scope: "account_email",
    response_type: "code",
    grant_type: "authorization_code",
    state: "state"
}));

provider.set("naver", new OauthServer({
    client_id: "KbUfgrZHHcyINOOffQlU",
    client_secret: "678P53KC0p",
    access_token_uri: "https://nid.naver.com/oauth2.0/token",
    authorization_uri: "https://nid.naver.com/oauth2.0/authorize",
    redirect_uri: base_uri + "/oauth2/code/naver",
    scope: "email",
    response_type: "token",
    grant_type: "authorization_code",
    state: "state"
}));

export default function OauthProvider(servername: String): OauthServer {
    return provider.get(servername);
};

export async function PopupWindow(server: OauthServer) {
    return window.open(server.getAuthorizationUri(), "login",
        RenderUtils.getCenterLocation(500, 640, window));
}

export async function UserInfo(token: string) {
    return fetch("/member", {headers: {"Authorization": "Bearer " + token}})
        .then(req => req.json())
        .then(json => json.nickname)
        .then(nickname => nickname? nickname: Promise.reject(new Error("nickname is empty")))
        .then(nickname => {
            return {token: token, nickname: nickname} as UserContextType
        })
}