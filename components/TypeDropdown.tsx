import { useEffect, useState } from "react";
import axios from "axios";
import { Type } from "../types/pokemon";

export interface TypeDropdownProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;}

export const TypeDropdown = ({ onChange }: TypeDropdownProps) => {
  const [pokemonTypes, setPokemonTypes] = useState<Type[]>([]);

  // useEffect for pokemon type
  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const url = `/api/pokemon/types`;
        const response = await axios.get<Type[]>(url);
        const data = response.data;
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
      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md focus:outline-none mx-2 mt-2"
      data-cy="cypress-filter-types-id"
    >
      <option value={""}> --- Search By --- </option>
      {pokemonTypes.map(({ id, name }) => {
        return <option key={id}>{name}</option>;
      })}
    </select>
  );
};
