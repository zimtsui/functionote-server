"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status) {
        super();
        this.status = status;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=http-error.js.map