const CookieStore = {
    set(name, value, options = { path: '/' }) {
        let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (options && options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    },
    get(name) {
        const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    has(name) {
        return this.get(name) !== undefined;
    }
};
export {};
