import { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { Stat } from "../types/pokemon";

export interface StatDropdownProps {
  onChange: ChangeEventHandler;
}

export const StatDropdown = ({ onChange }: StatDropdownProps) => {
  const [pokemonStats, setPokemonStats] = useState<Stat[]>([]);

  // useEffect for pokemon stats
  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const url = `/api/pokemon/stats`;
        const response = await axios.get<Stat[]>(url);
        const data = response.data;
        setPokemonStats(data);
      } catch (error) {
        console.error("Error fetching Pokémon stats:", error);
      }
    };

    if (!pokemonStats.length) {
      fetchPokemonStats();
    }
  }, []);

  return (
    <select
      onChange={onChange}
      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md focus:outline-none mx-2 mt-2"
    >
      <option value={""}> --- Sort By --- </option>
      {pokemonStats.map(({ id, name }) => {
        return <option key={id}>{name}</option>;
      })}
    </select>
  );
};
