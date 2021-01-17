export default {
    init() {
        return {
            method: 'GET',
            mode: 'same-origin' as RequestMode,
            cache: "default" as RequestCache,
            credentials: 'same-origin' as RequestCredentials,
            redirect: 'follow' as RequestRedirect,
            referrer: 'client',
            headers: {} as Record<string, string>,
            body: null as BodyInit | null,

            reset() {
                this.method = 'GET';
                this.mode = 'same-origin' as RequestMode;
                this.cache = "default" as RequestCache;
                this.credentials = 'same-origin' as RequestCredentials;
                this.redirect = 'follow' as RequestRedirect;
                this.referrer = 'client';
                this.headers = {} as Record<string, string>;
                this.body = null;
            },
            setMethod(method: string) {
                this.method = method;
                return this;
            },
            setMode(mode: string) {
                this.mode = mode as RequestMode;
                return this;
            },
            setCache(cache: string) {
                this.cache = cache as RequestCache;
                return this;
            },
            setCredentials(credentials: string) {
                this.credentials = credentials as RequestCredentials;
                return this;
            },
            setHeaders(headers: Record<string, string>) {
                this.headers = headers;
                return this;
            },
            addHeaders(headers: Record<string, string>) {
                for (let key in headers) {
                    this.headers[key] = headers[key];
                }
                return this;
            },
            setContentType(type: string) {
                this.headers['Content-Type'] = type;
                return this;
            },
            setToken(token: string) {
                this.headers['Authorization'] = `Bearer ${token}`;
                return this;
            },
            setRedirect(redirect: string) {
                this.redirect = redirect as RequestRedirect;
                return this;
            },
            setReferrer(referrer: string) {
                this.referrer = referrer;
                return this;
            },
            setBody(content: BodyInit) {
                this.body = content;
                return this;
            }
        }
    }
}