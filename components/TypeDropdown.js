import { useEffect, useState } from "react";

export default function TypeDropdown({ onChange }) {
  const [pokemonTypes, setPokemonTypes] = useState([]);

  // useEffect for pokemon type
  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const url = `/api/pokemon/types`;
        const response = await fetch(url);
        const data = await response.json();
        setPokemonTypes(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    if (!pokemonTypes.length) {
      fetchPokemonTypes();
    }
  }, []);

  return (
    <select
      onChange={onChange}
      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md focus:outline-none mx-2"
    >
      <option value={""}> --- Select Type --- </option>
      {pokemonTypes.map(({ id, name }) => {
        return <option key={id}>{name}</option>;
      })}
    </select>
  );
}
