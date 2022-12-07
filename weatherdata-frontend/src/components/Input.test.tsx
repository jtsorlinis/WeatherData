import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("renders the label and input field", () => {
    render(<Input label="Name" name="name" value="" onChange={() => {}} />);
    const input = screen.getByLabelText("Name");
    expect(input).toBeInTheDocument();
  });

  it("handleChange gets called when value updates", () => {
    const handleChange = vi.fn();
    render(<Input label="Name" name="name" value="" onChange={handleChange} />);

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
