export class User {

    constructor(
        public email: string,
        public userID: string,
        // tslint:disable-next-line: variable-name
        private _token: string,
        // tslint:disable-next-line: variable-name
        public tokenExpiration: Date
    ) { }

    get token() {
        if (!this.tokenExpiration || new Date() > this.tokenExpiration) {
            return null;
        }
        return this._token;
    }
}
