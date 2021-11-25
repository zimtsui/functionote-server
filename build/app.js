"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const Koa = require("koa");
const auth_1 = require("./auth");
const Session = require("koa-session");
const functionote_backend_1 = require("functionote-backend");
const KoaStatic = require("koa-static");
const path_1 = require("path");
class App extends Koa {
    constructor(db) {
        super();
        this.db = db;
        this.auth = new auth_1.Auth(this.db);
        this.router = new functionote_backend_1.Router(this.db);
        this.passport = new auth_1.Passport(this.auth);
        this.use(Session({
            signed: false,
            overwrite: false,
        }, this));
        this.use(this.passport.initialize());
        this.use(this.passport.session());
        this.use(this.passport.authenticate('basic', { session: true }));
        this.use(KoaStatic((0, path_1.resolve)(__dirname, '../srv')));
        this.use(this.router.routes());
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map