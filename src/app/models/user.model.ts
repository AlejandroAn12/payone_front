export class User {
    constructor(
        public names: string,
        public surnames: string,
        public id?: string,
        public dni?: string,
        public phone?: string,
        public email?: string,
        public rol?: string,
        public password?: string,
        public last_access?: Date,
        public created_at?: Date,
    ){}
}