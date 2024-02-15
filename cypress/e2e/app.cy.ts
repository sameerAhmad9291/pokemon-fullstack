import { CypressIds } from "../constants";

describe("Validate Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should show 151 pokemons", () => {
    cy.get(CypressIds.pokemonCardId).should("have.length", 151);
  });

  it("should search pokemons by name", () => {
    const searchQuery = "bl";
    cy.get(CypressIds.pokemonSearchInputId).type(searchQuery);
    cy.get(CypressIds.pokemonNameId).should(($el) => {
      const text = $el.text();
      expect(text.startsWith(searchQuery)).to.be.true;
    });
  });
});
