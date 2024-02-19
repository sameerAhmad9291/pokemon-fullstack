import { CypressIds } from "../constants";
const searchQuery = "ivys";

describe("Validate Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should show 151 pokemons", () => {
    cy.get(CypressIds.pokemonCardId).should("have.length", 151);
  });

  it(`should search pokemons and list only that startWith ${searchQuery}`, () => {
    cy.intercept({
      method: "GET",
      url: `/api/api?name=${searchQuery}`,
    }).as("searchByNameApi");

    cy.get(CypressIds.pokemonSearchInputId).type(searchQuery);
    cy.wait("@searchByNameApi");

    // validating each pokenmon name
    cy.get(CypressIds.pokemonNameId).each(($el) => {
      const text = $el.text()?.toLocaleLowerCase();
      expect(text.startsWith(searchQuery)).to.be.true;
    });
  });

  it(`should filter pokemons by fire type`, () => {
    // TODO: should not hardcoded.
    const pokemonType = "fire";

    cy.intercept({
      method: "GET",
      url: `/api/api?types=${pokemonType}`,
    }).as("typeFilterApi");

    cy.get(`${CypressIds.filterTypesSelectorId}`)
      .select(pokemonType)
      .should("have.value", pokemonType);

    cy.wait("@typeFilterApi");

    // validating each pokenmon type
    cy.get(`${CypressIds.pokemonCardId} ${CypressIds.pokemonTypeId}`).each(
      ($el) => {
        expect($el.text()).contains(pokemonType);
      }
    );
  });

  it(`should not show any pokemons, if search by invalid search query`, () => {
    const invalidSearch = "12H";
    cy.intercept({
      method: "GET",
      url: `/api/api?name=${invalidSearch}`,
    }).as("searchByNameApi");

    cy.get(CypressIds.pokemonSearchInputId).type(invalidSearch);
    cy.wait("@searchByNameApi");

    cy.get(CypressIds.pokemonNameId).should("not.exist");
  });
});
