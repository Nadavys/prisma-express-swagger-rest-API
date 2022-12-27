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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dropAll();
        const result = Array(3).fill(null).map(() => __awaiter(this, void 0, void 0, function* () { return yield createUserWithPosts(); }));
        console.log("-- database seeded --", yield Promise.allSettled(result));
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
function dropAll() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.post.deleteMany();
        yield prisma.user.deleteMany();
        console.log("-- Tables truncated");
    });
}
function createUserWithPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.create({
            data: {
                name: faker_1.faker.name.fullName(),
                email: faker_1.faker.internet.email(),
                posts: {
                    create: Array(3).fill(null).map(() => ({
                        createdAt: new Date(),
                        title: faker_1.faker.hacker.phrase(),
                        body: faker_1.faker.lorem.text()
                    }))
                }
            }
        });
    });
}
