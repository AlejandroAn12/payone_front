export class Transaction {
    constructor(
        public amount: number,
        public sender?: string,
        public receiver?: string,
        public id?: string,
        public comment?: string,
        public active?: boolean,
        public last_access?: Date,
        public created_at?: Date,
    ){}
}