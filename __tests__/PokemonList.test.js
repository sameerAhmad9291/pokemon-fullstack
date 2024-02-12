import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import PokemonList from "../components/PokemonList";

describe("Page", () => {
  it("render a ", () => {
    const { getByRole } = render(
      <PokemonList filters={{ searchQuery: "", stats: "", types: "" }} />
    );
    const heading = getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe("Testing");
  });
});
