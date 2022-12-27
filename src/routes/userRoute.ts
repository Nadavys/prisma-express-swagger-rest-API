
import express, { Express, Request, Response } from 'express';
import { validateUser } from '../validation';
import prisma from '../../lib/prismaClientSingleton'
import { ZodError } from "zod"
const router = express.Router()

router.route('/')
    .get(
        async (req, res, next) => {
            const users = await prisma.user.findMany();
            res.status(200);
            res.json(users);
        }
    )
    .post(
        async (req, res, next) => {
            try {
                //zod validate user input
                const data = validateUser(req.body);
                const result = await prisma.user.create({ data })
                console.log(result);
                res.status(201);//201 created
                res.json(result);

            } catch (e) {
                if (e instanceof ZodError) {
                    res.status(400)
                    res.json(e.format())
                } else {
                    res.status(500)
                    res.send((e as Error).message)
                }
            }
        }
    ).delete(
        async (req, res, next) => {
            //foreign key?
            const result = await prisma.user.deleteMany()
            res.json(result)
        }
    )



router.route('/:id')
    .get(
        async (req, res, next) => {
            console.log(req.params.id)
            const user = await prisma.user.findUnique({ where: { id: +req.params.id } });

            res.json(user);
        }
    )
    .put(
        async (req, res, next) => {
            const user = await prisma.user.update({
                where: { id: +req.params.id },
                data: req.body
            })

            res.json(user);
        }
    )
    .delete(
        async (req, res, next) => {
            const user = await prisma.user.delete({
                where: { id: +req.params.id },
            })
            res.json(user);
        }
    )

router.route('/:userId/posts')
    .get(
        async (req, res, next) => {
            console.log(req.params.userId)
            const posts = await prisma.post.findMany({
                where: { writerId: +req.params.userId }
            })

            res.json(posts);
        }
    ).delete(
        async (req, res, next) => {
            const user = await prisma.post.deleteMany({
                where: {
                    writerId: +req.params.userId
                },
            })
            res.json(user);
        }
    )


export default router;