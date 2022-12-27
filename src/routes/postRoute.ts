import { Prisma, PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';
import { ZodError } from 'zod';
import prisma from '../../lib/prismaClientSingleton'
import { validatePost } from '../validation';

const router = express.Router()

router.use(
    (req, res, next)=>{
        res.setHeader('content-type', 'application/json');
        next()
    }
)


router.route('/')
    .get(
        async (req, res, next) => {
            const posts = await prisma.post.findMany();
            res.json(posts);
        }
    )
    .post(
        async (req, res, next) => {
            // validate input params
            try {
                const { title, body, writerId } = validatePost(req.body);
                const data: Prisma.PostCreateInput = {
                    title,
                    body,
                    createdAt: new Date(),
                    writer: {
                        connect: {
                            id: writerId
                        }
                    }
                }

                const result = await prisma.post.create({ data })
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
            const result = await prisma.post.deleteMany()
            res.json(result)
        }
    )



router.route('/:id')
    .get(
        async (req, res, next) => {
            const post = await prisma.post.findUnique({ where: { id: +req.params.id } });

            res.json(post);
        }
    )
    .put(
        async (req, res, next) => {
            const user = await prisma.post.update({
                where: { id: +req.params.id },
                data: req.body
            })

            res.json(user);
        }
    )
    .delete(
        async (req, res, next) => {
            const post = await prisma.post.delete({
                where: { id: +req.params.id },
            })
            res.json(post);
        }
    )



export default router;