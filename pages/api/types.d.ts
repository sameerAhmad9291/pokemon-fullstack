export interface GetPokemonQueryParam {
  name?: string;
  types?: string[] | string;

  sortBy?: string;
}