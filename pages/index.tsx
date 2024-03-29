import { PokemonList } from "../components/PokemonList";
import { useState } from "react";
import { TypeDropdown } from "../components/TypeDropdown";
import { StatDropdown } from "../components/StatDropdown";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stat, setStat] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <main className="mt-1 max-width">
      <section className="grid">
        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-10">
          {/* Search by name filter */}
          <input
            type="text"
            data-cy="cypress-filter-search-query"
            placeholder="Pokemon Name"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-col mx-2 mt-2"
          />

          {/* filter by type */}
          <TypeDropdown
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setType(event.target.value)
            }
          />

          {/* filter by stats */}
          <StatDropdown
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setStat(event.target.value)
            }
          />
        </div>
        <PokemonList filters={{ searchQuery, sortBy: stat, types: type }} />
      </section>
    </main>
  );
}
