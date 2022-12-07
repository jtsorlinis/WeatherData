import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Weather from "./Weather";

const fakeCountries = [
  { label: "country1", value: "AA" },
  { label: "country2", value: "BB" },
  { label: "country3", value: "CC" },
];

const fakeCities = [
  { label: "city1", value: "city1" },
  { label: "city2", value: "city2" },
  { label: "city3", value: "city3" },
];

describe("Weather component", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = render(<Weather />);
  });

  it("should render without crashing", async () => {
    expect(wrapper.getByText("Select a country...")).toBeInTheDocument();
  });

  // Currently an issue where unable to test multiple react-selects on the page so can't write tests
  // https://github.com/romgain/react-select-event/issues/109
  it("should enable the city select when a country is selected", async () => {});

  it("should clear the city value when country is changed", async () => {});
});
