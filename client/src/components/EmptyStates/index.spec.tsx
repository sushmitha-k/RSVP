import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { EmptyState } from "./index";

describe("Empty State", () => {
  it("should show empty state details", () => {
    render(<EmptyState />);

    expect(screen.getByText("No guests found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We couldn’t find anything to display. Try changing your search or adding new items.",
      ),
    ).toBeInTheDocument();
  });
});
