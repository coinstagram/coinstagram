const LOCALSTORAGE_KEY = 'access_token';

interface ITokenService {
  get: () => string;
  save: (token: string) => void;
  remove: () => void;
}

const TokenService: ITokenService = class {
  static get() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static save(token: string) {
    localStorage.setItem(LOCALSTORAGE_KEY, token);
  }

  static remove() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
};

export default TokenService;
