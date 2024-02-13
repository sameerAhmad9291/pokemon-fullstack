import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();

export default async function handler(req, res) {
 const types = await prismaService.type.findMany({});
 res.status(200).json(types);
}
