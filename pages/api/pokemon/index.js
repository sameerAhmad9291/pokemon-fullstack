// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const limit = 151;
const BASE_URL = `${process.env.POKEMON_BASE_URL}/pokemon?limit=${limit}`;

import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();

const getAllPokemons = async () => {
  const paginatedResponse = await fetch(BASE_URL);
  const data = await paginatedResponse.json();
  const results = data.results || [];
  return results;
};

// function to save Pokemon list into database.
// code complexity and big(O) can be improved.

async function savePokemons(pokemonList) {
  try {
    for (const pokemon of pokemonList) {
      // Start the transaction
      await prismaService.$transaction(async (tx) => {
        // Create the Pokemon record
        const createdPokemon = await tx.pokemon.upsert({
          create: {
            id: pokemon.id,
            name: pokemon.name,
          },
          update: {
            updatedAt: new Date().toISOString(),
          },
          where: {
            id: pokemon.id,
          },
          include: {
            stats: true,
            types: true,
          },
        });

        // Iterate through each type of the Pokemon
        for (const {
          slot,
          type: { name, url },
        } of pokemon.types) {
          // Check if the PokemonStat already exists for the current Pokemon and stat
          const typeExists = await prismaService.pokemonType.findFirst({
            where: {
              pokemonId: pokemon.id,
              type: {
                name,
              },
            },
          });

          // Check if the PokemonStat already exists for the current Pokemon and stat
          if (!typeExists) {
            await tx.pokemonType.create({
              data: {
                slot,
                type: {
                  connectOrCreate: {
                    where: { name },
                    create: {
                      name,
                      url,
                    },
                  },
                },
                pokemon: {
                  connect: { id: createdPokemon.id },
                },
              },
            });
          }
        }

        // Iterate through each stat of the Pokemon
        for (const {
          base_stat: baseStat,
          effort,
          stat: { name, url },
        } of pokemon.stats) {
          console.info(
            `${[pokemon.id]} - ${[pokemon.name]} -- stats: ${
              pokemon.stats.length
            }`
          );
          // Check if the PokemonStat already exists for the current Pokemon and stat
          const statExists = await prismaService.pokemonStat.findFirst({
            where: {
              pokemonId: pokemon.id,
              stat: {
                name,
              },
            },
          });

          // If the PokemonStat doesn't exist, create it
          if (!statExists) {
            await tx.pokemonStat.create({
              data: {
                baseStat,
                effort,
                stat: {
                  connectOrCreate: {
                    where: { name },
                    create: {
                      name,
                      url,
                    },
                  },
                },
                pokemon: {
                  connect: { id: createdPokemon.id },
                },
              },
            });
          }
        }

        console.log(
          "Pokemon saved successfully: ",
          createdPokemon.id,
          " - ",
          createdPokemon.name
        );
      });
    }
  } catch (error) {
    throw error;
  } finally {
    // Disconnect PrismaClient to release resources
    await prismaService.$disconnect();
  }
}

// Usage: Call the function and pass the single Pokemon data as an argument
export default async function handler(req, res) {
  try {
    const results = await getAllPokemons(limit);

    if (!results.length) {
      res.status(200).json([]);
    }

    const pokemonHashMap = new Map();
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
