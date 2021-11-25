import KoaPassport = require('koa-passport');
import PassportHttp = require('passport-http');
import Sqlite = require('better-sqlite3');
import assert = require('assert');
import {
    UserProfile,
} from './interfaces';


export class Auth {
    constructor(private db: Sqlite.Database) { }

    public getUserProfileByName(name: string): UserProfile {
        const row = <{
            id: number;
            password: string;
        }>this.db.prepare(`
            SELECT
                id,
                password
            FROM users
            WHERE name = ?
        ;`).get(name);
        assert(row);
        return {
            id: row.id,
            name,
            password: row.password,
        }
    }
}


export class Passport extends KoaPassport.KoaPassport {
    constructor(auth: Auth) {
        super();
        const basicAuth = new PassportHttp.BasicStrategy((username, password, done) => {
            try {
                const userProfile = auth.getUserProfileByName(username);
                if (password === userProfile.password)
                    done(null, userProfile.id);
                else
                    done(null, false);
            } catch (err) {
                done(null, false);
            }
        });
        this.use(basicAuth);

        this.serializeUser((user, done) => done(null, user));
        this.deserializeUser((id: string, done) => done(null, JSON.parse(id)));
    }
}
