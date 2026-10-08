import { describe, expect, it } from "vitest";
import { filterDishes, toggleFavorite } from "../../src/model";
describe("synthetic dish choices", () => {
  it("intersects price, mall, category and heat without ranking", () => {
    expect(filterDishes(120, "river", "plant", false).map((d) => d.id)).toEqual(
      ["chili"],
    );
    expect(filterDishes(120, "river", "plant", true)).toEqual([]);
  });
  it("includes the exact price boundary", () =>
    expect(filterDishes(129, "garden", "rice", false).map((d) => d.id)).toEqual(
      ["bowl"],
    ));
  it("preserves fixture order and returns a meaningful empty result", () => {
    expect(filterDishes(300, "all", "all", false).map((d) => d.id)).toEqual([
      "bowl",
      "noodle",
      "green",
      "chili",
      "soup",
      "fish",
    ]);
    expect(filterDishes(60, "all", "all", false)).toEqual([]);
  });
  it("toggles saved dishes without mutating input", () => {
    const ids = ["bowl"];
    expect(toggleFavorite(ids, "bowl")).toEqual([]);
    expect(toggleFavorite(ids, "green")).toEqual(["bowl", "green"]);
    expect(ids).toEqual(["bowl"]);
  });
});
