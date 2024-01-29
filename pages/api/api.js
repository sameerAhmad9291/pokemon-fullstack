// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();

export default async function handler(req, res) {
  try {
    const filterParams = req.query || undefined;
    let { stats, name, types } = filterParams || {};
    if (typeof stats === "string") {
      stats = [stats];
    }
    if (typeof types === "string") {
      types = [types];
    }

    const pokemons = await prismaService.pokemon.findMany({
      take: 151,
      skip: 0,
      where: {
        /// if name filter provided
        ...(name && {
          name: {
            contains: name,
          },
        }),
        /// if stats filter provided
        ...(stats && {
          stats: {
            some: {
              stat: {
                name: {
                  in: stats,
                },
              },
            },
          },
        }),
        /// if type filter provided
        ...(types && {
          types: {
            some: {
              type: {
                name: {
                  in: types,
                },
              },
            },
          },
        }),
      },
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
