type CookieOptions = {
  path?: string;
  expires?: Date | string | number;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
}

interface CookieStore {
  get(name: string): string | undefined;
  set(name: string, value: string, options?: CookieOptions): void;
  has(name: string): boolean;
}

const CookieStore: CookieStore = {
  set(name: string, value: string, options: CookieOptions = { path: '/' }) {
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (options && options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    
    for (let propName in options) {
      updatedCookie += "; " + propName;
      let propValue = options[propName as keyof CookieOptions];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }

    document.cookie = updatedCookie;
  },

  get(name: string): string | undefined {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  has(name: string): boolean {
    return this.get(name) !== undefined;
  }
}
