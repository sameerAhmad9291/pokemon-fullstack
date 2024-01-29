import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ filters }) => {
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

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [searchQuery, stats, types]);

  return (
    <div className="pokemon__list-wrapper">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
