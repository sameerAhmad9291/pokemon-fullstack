import { useEffect, useState } from "react";

export default function StatDropdown({ onChange }) {
  const [pokemonStats, setPokemonStats] = useState([]);

  // useEffect for pokemon stats
  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const url = `/api/pokemon/stats`;
        const response = await fetch(url);
        const data = await response.json();
        setPokemonStats(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    if (!pokemonStats.length) {
      fetchPokemonStats();
    }
  }, []);

  return (
    <select
      onChange={onChange}
      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md focus:outline-none mx-2"
    >
      <option value={""}> --- Select Stat --- </option>
      {pokemonStats.map(({ id, name }) => {
        return <option key={id}>{name}</option>;
      })}
    </select>
  );
}
