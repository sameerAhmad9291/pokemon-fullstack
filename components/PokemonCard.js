const PokemonType = ({ type }) => {
  return (
    <span className="text-xs inline-block bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
      {type}
    </span>
  );
};

const PokemonStat = ({ stat }) => {
  return (
    <span className="text-xs inline-block bg-red-400 text-white px-2 py-1 rounded-md mr-2 mb-2">
      {stat.name}
    </span>
  );
};

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img
        src={`/sprites/${pokemon.id}.svg`}
        alt={pokemon.name}
        className="w-full max-h-40"
      />
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-2">{pokemon.name}</div>
        <p className="text-gray-700 text-base">
          {pokemon.types.map(({ type: { name } }, index) => (
            <PokemonType type={name} key={index} />
          ))}
          <br />
          {pokemon.stats.map(({ stat }, index) => (
            <PokemonStat stat={stat} key={index} />
          ))}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;