// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { GetPokemonQueryParam } from "./types";
const prismaService = new PrismaClient();

const getPokemons = async (filterParams: GetPokemonQueryParam) => {
  let { sortBy, name, types } = filterParams;

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
          startsWith: name,
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

  if (sortBy) {
    pokemons.sort((pokemonA, pokemonB) => {
      const statsA = pokemonA.stats.find(
        ({ stat: { name } }) => name === sortBy
      ) || { baseStat: 0 };
      const statsB = pokemonB.stats.find(
        ({ stat: { name } }) => name === sortBy
      ) || { baseStat: 0 };

      return statsB.baseStat - statsA.baseStat;
    });
  }

  return pokemons;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        const filterParams = (req.query as GetPokemonQueryParam) || {};
        const pokemons = await getPokemons(filterParams);
        res.status(200).json(pokemons);
        return;
      }
      default: {
        res.status(404);
        return;
      }
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
