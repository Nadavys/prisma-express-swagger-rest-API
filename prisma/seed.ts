import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
    await dropAll()

    const result = Array(3).fill(null).map(
        async () => await createUserWithPosts()
    )
    console.log("-- database seeded --", await Promise.allSettled(result))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

async function dropAll(){
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    console.log("-- Tables truncated")
}

async function createUserWithPosts() {
    return await prisma.user.create({
        data: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            posts: {
                create: Array(3).fill(null).map(
                    () => (
                        {
                            createdAt: new Date(),
                            title: faker.hacker.phrase(),
                            body: faker.lorem.text()
                        }
                    )
                )
            }
        }
    });
}
