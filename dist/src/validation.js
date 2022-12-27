"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = exports.validateUser = void 0;
const zod_1 = require("zod");
function validateUser(input) {
    return zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
    }).parse(input);
}
exports.validateUser = validateUser;
function validatePost(input) {
    return zod_1.z.object({
        title: zod_1.z.string().min(10),
        body: zod_1.z.string().min(10).max(5000),
        writerId: zod_1.z.number()
    }).parse(input);
}
exports.validatePost = validatePost;
