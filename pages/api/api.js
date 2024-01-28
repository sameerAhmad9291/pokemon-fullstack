// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const limit = 151;
const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

const getAllPokemons = async (limit) => {
  const paginatedResponse = await fetch(BASE_URL);
  const data = await paginatedResponse.json();
  const results = data.results || [];
  return results;
};

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
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
