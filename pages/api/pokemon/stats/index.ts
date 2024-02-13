import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();

export default async function handler(req, res) {
 const stats = await prismaService.stat.findMany({});
 res.status(200).json(stats);
}
