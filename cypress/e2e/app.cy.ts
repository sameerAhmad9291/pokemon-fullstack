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
    cy.get("@searchByNameApi").should("have.property", "state", "Completed");

    // validating each pokenmon name
    cy.get(CypressIds.pokemonNameId).each(($el) => {
      const text = $el.text()?.toLocaleLowerCase();
      expect(text.startsWith(searchQuery)).to.be.true;
    });
  });

  it(`should filter pokemons by fire type`, () => {
    const pokemonType = "fire"; // TODO: should not hardcoded.

    cy.intercept({
      method: "GET",
      url: `/api/api?types=${pokemonType}`,
    }).as("typeFilterApi");

    cy.get(`${CypressIds.filterTypesSelectorId}`)
      .select(3)
      .should("have.value", pokemonType);

    cy.wait("@typeFilterApi");
    cy.get("@typeFilterApi").should("have.property", "state", "Completed");

    // validating each pokenmon type
    cy.get(`${CypressIds.pokemonCardId} ${CypressIds.pokemonTypeId}`).each(
      ($el) => {
        expect($el.text()).contains(pokemonType);
      }
    );
  });

  it(`should search pokemons and list only that startWith ${searchQuery}`, () => {
    cy.intercept({
      method: "GET",
      url: `/api/api?name=${searchQuery}`,
    }).as("searchByNameApi");

    cy.get(CypressIds.pokemonSearchInputId).type(searchQuery);
    cy.wait("@searchByNameApi");
    cy.get("@searchByNameApi").should("have.property", "state", "Completed");

    // validating each pokenmon name
    cy.get(CypressIds.pokemonNameId).each(($el) => {
      const text = $el.text()?.toLocaleLowerCase();
      expect(text.startsWith(searchQuery)).to.be.true;
    });
  });
});
