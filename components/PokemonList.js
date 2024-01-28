import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ filters }) => {
  const searchQuery = filters.searchQuery;
  const [pokemonList, setPokemonList] = useState([]);

  console.log(filters);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const queryParams = [];
        if (searchQuery) {
          queryParams.push(`name=${searchQuery}`);
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
  }, [searchQuery]);

  return (
    <div className="pokemon__list-wrapper">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
