// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const limit = 151;
const BASE_URL = `${process.env.POKEMON_BASE_URL}/pokemon?limit=${limit}`;

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prismaService = new PrismaClient();

const getAllPokemons = async () => {
  const paginatedResponse = await fetch(BASE_URL);
  const data = await paginatedResponse.json();
  const results = data.results || [];
  return results;
};

// function to save Pokemon list into database.
async function savePokemons(pokemonList) {
  try {
    for (const pokemon of pokemonList) {
      // Start the transaction
      const createStats = pokemon.stats.map((stat) => {
        return {
          baseStat: stat.base_stat,
          effort: stat.effort,
          stat: {
            connectOrCreate: {
              where: {
                name: stat.stat.name,
              },
              create: {
                name: stat.stat.name,
                url: stat.stat.url,
              },
            },
          },
        };
      });
      const createTypes = pokemon.types.map((typ) => {
        return {
          slot: typ.slot,
          type: {
            connectOrCreate: {
              where: {
                name: typ.type.name,
              },
              create: {
                name: typ.type.name,
                url: typ.type.url,
              },
            },
          },
        };
      });

      const createdPokemon = await prismaService.pokemon.upsert({
        where: {
          id: pokemon.id,
        },
        update: {
          updatedAt: new Date().toISOString(),
        },
        create: {
          id: pokemon.id,
          name: pokemon.name,
          stats: {
            create: createStats,
          },
          types: {
            create: createTypes,
          },
        },
        include: {
          stats: true,
          types: true,
        },
      });

      console.log(
        "Pokemon saved successfully: ",
        createdPokemon.id,
        " - ",
        createdPokemon.name
      );
    }
  } catch (error) {
    throw error;
  } finally {
    // Disconnect PrismaClient to release resources
    await prismaService.$disconnect();
  }
}

// Usage: Call the function and pass the single Pokemon data as an argument
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = await getAllPokemons();

    if (!results.length) {
      res.status(200).json([]);
    }

    const pokemonHashMap = new Map<
      string,
      {
        id?: number;
        name: string;
        url?: string;
        stats?: any;
        types?: any;
      }
    >();
    const promiseArr = [];

    results.forEach(({ name, url }) => {
      pokemonHashMap.set(name, {
        name,
        url,
      });

      promiseArr.push(fetch(url));
    });

    const responses = await Promise.all(promiseArr);

    for (const pokenmokeResult of responses) {
      const { id, name, stats, types } = await pokenmokeResult.json();
      pokemonHashMap.set(name, {
        id,
        name,
        stats,
        types,
      });
    }

    const responseData = [];
    for (const [, pokemon] of pokemonHashMap) {
      responseData.push(pokemon);
    }
    await savePokemons(responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
