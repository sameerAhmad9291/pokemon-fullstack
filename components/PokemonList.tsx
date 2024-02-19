import React, { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";
import axios from "axios";
import { Pokemon } from "../types/pokemon";

export interface PokemonListProps {
  searchQuery?: string;
  sortBy?: string;
  types?: string;
}

export const PokemonList = ({ filters }: { filters: PokemonListProps }) => {
  const { searchQuery, sortBy, types } = filters || {};
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const queryParams = [];
        if (searchQuery?.length > 2) {
          queryParams.push(`name=${searchQuery}`);
        }
        if (sortBy) {
          queryParams.push(`sortBy=${sortBy}`);
        }
        if (types) {
          queryParams.push(`types=${types}`);
        }

        const url = `/api/api${
          queryParams.length ? `?${queryParams.join("&")}` : ""
        }`;

        const response = await axios.get<Pokemon[]>(url);
        const data = response.data;
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [searchQuery, sortBy, types]);

  return (
    <>
      <div className="pokemon__list-wrapper">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
};
