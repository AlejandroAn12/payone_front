export class Balance {
    constructor(
        public amount: string,
        public id?: string,
        public user_id?: string,
        public last_access?: Date,
        public created_at?: Date,
    ){}
}