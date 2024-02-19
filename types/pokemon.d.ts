export interface Stat {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  id: number;
  baseStat: number;
  effort: number;
  statId: number;
  pokemonId: number;
  createdAt: string;
  updatedAt: string;
  stat: Stat;
}

export interface Type {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Types {
  id: number;
  slot: number;
  typeId: number;
  pokemonId: number;
  createdAt: string;
  updatedAt: string;
  type: Type;
}

export interface Pokemon {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  stats: Stats[];
  types: Types[];
}
