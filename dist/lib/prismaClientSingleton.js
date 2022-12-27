"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
//@ts-ignore
let client = globalThis.client;
if (!client) {
    //@ts-ignore
    globalThis.client = client = new client_1.PrismaClient();
    console.log("-- prisma client init");
}
console.log("prisma client called -- ");
//@ts-ignore
exports.default = client;
