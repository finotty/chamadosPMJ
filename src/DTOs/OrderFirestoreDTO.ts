//data transfer object
import { Timestamp } from "firebase/firestore";

export type OrderFirestoreDTO = {
    setor : string;
    description: string;
    status: 'open' | 'closed',
    solution?: string | any;
    created_at: Timestamp;
    closed_at?: Timestamp | any;
    user:string;
}