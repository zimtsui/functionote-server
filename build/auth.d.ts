import KoaPassport = require('koa-passport');
import Sqlite = require('better-sqlite3');
import { UserProfile } from './interfaces';
export declare class Auth {
    private db;
    constructor(db: Sqlite.Database);
    getUserProfileByName(name: string): UserProfile;
}
export declare class Passport extends KoaPassport.KoaPassport {
    constructor(auth: Auth);
}
