"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bindings_1 = require("@/bindings");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const container = new inversify_1.Container();
    yield container.loadAsync(bindings_1.bindings);
    const server = new inversify_express_utils_1.InversifyExpressServer(container, null, {
        rootPath: "/api",
    });
    server.setConfig((app) => {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({
            extended: true,
        }));
        app.use(cors_1.default());
        app.use(helmet_1.default());
    });
    server.setErrorConfig((app) => {
        app.use((err, _req, res, _next) => {
            console.error(err.stack);
            res.status(err.statusCode || 500).json(err);
        });
    });
    const app = server.build();
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is listening on port 3000");
    });
}))();
//# sourceMappingURL=server.js.map