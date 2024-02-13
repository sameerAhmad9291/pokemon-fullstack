import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { PokemonList } from "../components/PokemonList";

describe("PokemonListComponent", () => {
  it("check render of the component", () => {
    const { getByRole } = render(<PokemonList filters={{}} />);
    const heading = getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe("Testing");
  });
});
