import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// delete everything from db
export default async () => {
    await prisma.$transaction([
        prisma.request.deleteMany()
    ])
};