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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const prismaClientSingleton_1 = __importDefault(require("../../lib/prismaClientSingleton"));
const validation_1 = require("../validation");
const router = express_1.default.Router();
router.use((req, res, next) => {
    res.setHeader('content-type', 'application/json');
    next();
});
/**
 * @swagger
 * /users:
 *   get:
 *     summary: xyz Retrieve a list of JSONPlaceholder users
 *     description: xxxRetrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.route('/')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prismaClientSingleton_1.default.post.findMany();
    res.json(posts);
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // validate input params
    try {
        const { title, body, writerId } = (0, validation_1.validatePost)(req.body);
        const data = {
            title,
            body,
            createdAt: new Date(),
            writer: {
                connect: {
                    id: writerId
                }
            }
        };
        const result = yield prismaClientSingleton_1.default.post.create({ data });
        console.log(result);
        res.json(result);
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            res.status(400);
            res.json(e.format());
        }
        else {
            res.status(500);
            res.send(e.message);
        }
    }
})).delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClientSingleton_1.default.post.deleteMany();
    res.json(result);
}));
router.route('/:id')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prismaClientSingleton_1.default.post.findUnique({ where: { id: +req.params.id } });
    res.json(post);
}))
    .put((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClientSingleton_1.default.post.update({
        where: { id: +req.params.id },
        data: req.body
    });
    res.json(user);
}))
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prismaClientSingleton_1.default.post.delete({
        where: { id: +req.params.id },
    });
    res.json(post);
}));
exports.default = router;
