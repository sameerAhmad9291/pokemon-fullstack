import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prismaService = new PrismaClient();

export default async function  handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
 const types = await prismaService.type.findMany({});
 res.status(200).json(types);
}
