import PokemonList from "../components/PokemonList";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="grid">
      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-10">
        <input
          type="text"
          placeholder="Pokemon Name"
          value={searchQuery}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-col"
        />
      </div>
      <PokemonList filters={{ searchQuery }} />
    </section>
  );
}
