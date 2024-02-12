// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();

const getPokemons = (filterParams = {}) => {
  let { stats, name, types } = filterParams;
  if (typeof stats === "string") {
    stats = [stats];
  }
  if (typeof types === "string") {
    types = [types];
  }

  return prismaService.pokemon.findMany({
    take: 151,
    skip: 0,
    where: {
      /// if name filter provided
      ...(name && {
        name: {
          startsWith: name,
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
    include: {
      stats: {
        include: {
          stat: true,
        },
      },
      types: {
        include: {
          type: true,
        },
      },
    },
  });
};

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        const filterParams = req.query;
        const pokemons = await getPokemons(filterParams);
        res.status(200).json(pokemons);
        return;
      }
      default: {
        res.status(404).send();
        return;
      }
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
