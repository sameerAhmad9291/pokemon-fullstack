import { Pokemon, Stats } from "../types/pokemon";

export interface PokemonTypeProps {
  type: string;
}

const PokemonType = ({ type }: PokemonTypeProps) => {
  return (
    <span className="text-xs inline-block bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
      {type}{" "}
    </span>
  );
};

export interface PokemonStatProps {
  stat: Stats;
}

const PokemonStat = ({ stat }: PokemonStatProps) => {
  return (
    <>
      <span className="text-xs inline-block bg-red-400 text-white px-2 py-1 rounded-md mb-2 mr-1">
        {stat.stat.name}: <b>{stat.baseStat}</b>
      </span>
    </>
  );
};

export interface PokemonProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonProps) => {
  return (
    <div className="pokemon-card" data-cy="cypress-pokemon-card">
      <img
        loading="lazy"
        src={`/sprites/${pokemon.id}.svg`}
        alt={pokemon.name}
        className="w-full max-h-40"
      />
      <div className="px-4 py-2">
        <div
          className="font-bold text-lg mb-2 capitalize"
          data-cy="cypress-pokemon-name"
        >
          {pokemon.name}
        </div>
        <p className="text-gray-700 text-base" data-cy="cypress-pokemon-type">
          {pokemon.types.map(({ type: { name } }, index) => (
            <PokemonType type={name} key={index} />
          ))}
        </p>
        <p className="text-gray-700 text-base" data-cy="cypress-pokemon-stats">
          {pokemon.stats.map((stat, index) => (
            <PokemonStat stat={stat} key={index} />
          ))}
        </p>
      </div>
    </div>
  );
};
