import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Weather from "./Weather";

describe("Weather", () => {
  it("make sure the component is re-rendered when an API call is made", async () => {
    // Mock the fetch API call
    vi.spyOn(global, "fetch").mockImplementation(
      () =>
        new Promise<Response>((resolve) =>
          resolve({
            text: () => Promise.resolve("Clear sky"),
          })
        )
    );

    render(<Weather />);

    // Wait for the weather description to be rendered
    await waitFor(() => {
      expect(screen.getByText("Clear sky")).toBeInTheDocument();
    });
  });
});
