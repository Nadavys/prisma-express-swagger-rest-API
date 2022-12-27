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
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const express_1 = __importDefault(require("express"));
const validation_1 = require("../validation");
const prismaClientSingleton_1 = __importDefault(require("../../lib/prismaClientSingleton"));
const zod_1 = require("zod");
const router = express_1.default.Router();
router.route('/')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prismaClientSingleton_1.default.user.findMany();
    res.status(201);
    res.json(users);
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //zod validate user input
        const data = (0, validation_1.validateUser)(req.body);
        const result = yield prismaClientSingleton_1.default.user.create({ data });
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
    //foreign key?
    const result = yield prismaClientSingleton_1.default.user.deleteMany();
    res.json(result);
}));
router.route('/:id')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const user = yield prismaClientSingleton_1.default.user.findUnique({ where: { id: +req.params.id } });
    res.json(user);
}))
    .put((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClientSingleton_1.default.user.update({
        where: { id: +req.params.id },
        data: req.body
    });
    res.json(user);
}))
    .delete(
//foreign key?
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClientSingleton_1.default.user.delete({
        where: { id: +req.params.id },
    });
    res.json(user);
}));
router.route('/:userId/posts')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.userId);
    const posts = yield prismaClientSingleton_1.default.post.findMany({
        where: { writerId: +req.params.userId }
    });
    res.json(posts);
})).delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClientSingleton_1.default.post.deleteMany({
        where: {
            writerId: +req.params.userId
        },
    });
    res.json(user);
}));
exports.default = router;
