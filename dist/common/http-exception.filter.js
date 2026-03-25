"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        let error = 'InternalError';
        let details;
        if (exception instanceof common_1.HttpException) {
            const payload = exception.getResponse();
            if (typeof payload === 'string') {
                message = payload;
            }
            else if (payload && typeof payload === 'object') {
                const p = payload;
                const m = p.message;
                if (typeof m === 'string') {
                    message = m;
                }
                else if (Array.isArray(m)) {
                    message = m;
                }
                else {
                    message = exception.message;
                }
                const e = p.error;
                if (typeof e === 'string') {
                    error = e;
                }
                else {
                    error = exception.name;
                }
                const detailsCandidate = p['details'];
                if (detailsCandidate !== undefined)
                    details = detailsCandidate;
            }
            else {
                message = exception.message;
                error = exception.name;
            }
        }
        res.status(status).json({
            code: status,
            message: Array.isArray(message) ? message.join(', ') : String(message),
            error,
            details,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=http-exception.filter.js.map