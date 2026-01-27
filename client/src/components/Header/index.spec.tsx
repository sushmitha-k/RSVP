import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Header } from "./index";

vi.mock("../../hooks/useGetGuestsList", () => ({
  useGetGuestsList: () => ({
    guests: [
      { id: "1", status: "confirmed" },
      { id: "2", status: "pending" },
    ],
  }),
}));

vi.mock("../../utils", () => ({
  getTotalsByStatus: () => ({
    confirmed: 2,
    pending: 1,
  }),
}));

describe("RSVP Dashboard Header", () => {
  it("should show header and status details", () => {
    render(<Header />);

    expect(screen.getByText("RSVP Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Annual Gala 2026 • June 15, 2026"),
    ).toBeInTheDocument();

    expect(screen.getByText("confirmed")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
