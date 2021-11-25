/// <reference types="koa-passport" />
/// <reference types="koa-session" />
import Koa = require('koa');
import { KoaStateAuth } from 'functionote-backend';
export declare class App extends Koa<KoaStateAuth> {
    private db;
    private auth;
    private router;
    private passport;
    constructor();
}
