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
    cy.get("@searchByNameApi").should("have.property", "state", "Complete");

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
      .select(3)
      .should("have.value", pokemonType);

    cy.wait("@typeFilterApi");
    cy.get("@typeFilterApi").should("have.property", "state", "Complete");

    // validating each pokenmon type
    cy.get(`${CypressIds.pokemonCardId} ${CypressIds.pokemonTypeId}`).each(
      ($el) => {
        expect($el.text()).contains(pokemonType);
      }
    );
  });

  // it(`should sort pokemon by stats`, () => {
  //   // TODO: should not hardcoded.
  //   const pokemonStat = "attack";

  //   cy.intercept({
  //     method: "GET",
  //     url: `/api/api?sortBy=${pokemonStat}`,
  //   }).as("sortByApi");

  //   cy.get(`${CypressIds.sortBySelectorId}`)
  //     .select(pokemonStat)
  //     .should("have.value", pokemonStat);

  //   cy.wait("@sortByApi");
  //   cy.get("@sortByApi").should("have.property", "state", "Complete");

  //   // validating each pokenmon type
  //   // cy.get(`${CypressIds.pokemonCardId} ${CypressIds.pokemonTypeId}`).each(
  //   //   ($el) => {
  //   //     expect($el.text()).contains(pokemonStat);
  //   //   }
  //   // );
  // });

  // it(`should not show any pokemons, if search by invalid search query`, () => {
  //   const invalidSearch = "12H";
  //   cy.intercept({
  //     method: "GET",
  //     url: `/api/api?name=${invalidSearch}`,
  //   }).as("searchByNameApi");

  //   cy.get(CypressIds.pokemonSearchInputId).type(invalidSearch);
  //   cy.wait("@searchByNameApi");
  //   cy.get("@searchByNameApi").should("have.property", "state", "Complete");

  //   cy.get(CypressIds.pokemonNameId).should("have.a.property", 0);
  // });
});
