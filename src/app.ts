import Koa = require('koa');
import Database = require('better-sqlite3');
import { Passport, Auth } from './auth';
import Session = require('koa-session');
import { Router, KoaStateAuth } from 'functionote-backend';
import KoaStatic = require('koa-static');
import { resolve } from 'path';



export class App extends Koa<KoaStateAuth> {
    private db = new Database(
        resolve(__dirname, '../functionote.db'),
        { fileMustExist: true },
    );
    private auth = new Auth(this.db);
    private router = new Router(this.db);
    private passport = new Passport(this.auth);

    constructor() {
        super();
        this.use(Session({
            signed: false,
            overwrite: false,
        }, this));

        this.use(this.passport.initialize());
        this.use(this.passport.session());
        this.use(this.passport.authenticate('basic', { session: true }));

        this.use(KoaStatic(resolve(__dirname, '../srv')));
        this.use(this.router.routes());
    }
}
