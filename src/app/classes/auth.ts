import { User } from '../interfaces/user';
import { BehaviorSubject } from "rxjs";

export class Auth {
    static userEmitter = new BehaviorSubject<User | undefined>(undefined);
}