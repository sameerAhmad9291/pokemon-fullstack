// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();

export default async function handler(req, res) {
  try {
    const pokemons = await prismaService.pokemon.findMany({
      take: 151,
      skip: 0,
      select: {
        id: true,
        name: true,
        types: {
          select: {
            slot: true,
            type: {
              select: {
                name: true,
                url: true,
              },
            },
          },
        },
        stats: {
          select: {
            baseStat: true,
            effort: true,
            stat: {
              select: {
                name: true,
                url: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
