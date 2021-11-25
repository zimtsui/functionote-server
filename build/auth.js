"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport = exports.Auth = void 0;
const KoaPassport = require("koa-passport");
const PassportHttp = require("passport-http");
const assert = require("assert");
class Auth {
    constructor(db) {
        this.db = db;
    }
    getUserProfileByName(name) {
        const row = this.db.prepare(`
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
        };
    }
}
exports.Auth = Auth;
class Passport extends KoaPassport.KoaPassport {
    constructor(auth) {
        super();
        const basicAuth = new PassportHttp.BasicStrategy((username, password, done) => {
            try {
                const userProfile = auth.getUserProfileByName(username);
                if (password === userProfile.password)
                    done(null, userProfile.id);
                else
                    done(null, false);
            }
            catch (err) {
                done(null, false);
            }
        });
        this.use(basicAuth);
        this.serializeUser((user, done) => done(null, user));
        this.deserializeUser((id, done) => done(null, JSON.parse(id)));
    }
}
exports.Passport = Passport;
//# sourceMappingURL=auth.js.map