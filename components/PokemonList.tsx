import React, { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";
import axios from "axios";

export interface PokemonListProps {
  searchQuery?: string;
  stats?: string;
  types?: string;
}

export const PokemonList = ({ filters }: { filters: PokemonListProps }) => {
  const { searchQuery, stats, types } = filters || {};
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const queryParams = [];
        if (searchQuery) {
          queryParams.push(`name=${searchQuery}`);
        }
        if (stats) {
          queryParams.push(`stats=${stats}`);
        }
        if (types) {
          queryParams.push(`types=${types}`);
        }

        const url = `/api/api${
          queryParams.length ? `?${queryParams.join("&")}` : ""
        }`;

        const response = await axios.get(url);
        const data = response.data;
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [searchQuery, stats, types]);

  return (
    <>
      <h1 className="text-3xl ml-5 mt-5">Testing</h1>
      <div className="pokemon__list-wrapper">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
};
