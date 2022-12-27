import { PrismaClient } from '@prisma/client'

//@ts-ignore
let client = globalThis.client
if(!client){
    //@ts-ignore
    globalThis.client = client = new PrismaClient()
    console.log("-- prisma client init");
}
console.log("prisma client called -- ");
//@ts-ignore
export default client;

