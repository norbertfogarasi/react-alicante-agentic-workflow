import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SpeakerCard } from "./speaker-card";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's title and start time", () => {
    render(
      <SpeakerCard
        speaker="Marta Fernandez"
        sessions={[
          session({
            id: "opening-keynote",
            title: "Opening Keynote",
            startTime: "09:00",
          }),
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Marta Fernandez", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
  });

  it("links each session to its session page with an unambiguous accessible name", () => {
    render(
      <SpeakerCard
        speaker="Marta Fernandez"
        sessions={[
          session({
            id: "opening-keynote",
            title: "Opening Keynote",
            startTime: "09:00",
          }),
        ]}
      />,
    );

    const link = screen.getByRole("link", {
      name: "09:00, Opening Keynote",
    });
    expect(link).toHaveAttribute("href", "/en/sessions/opening-keynote");
  });

  it("renders one entry per session when a speaker has more than one", () => {
    render(
      <SpeakerCard
        speaker="Marta Fernandez"
        sessions={[
          session({ id: "first", title: "First Talk", startTime: "09:00" }),
          session({ id: "second", title: "Second Talk", startTime: "14:00" }),
        ]}
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("First Talk")).toBeInTheDocument();
    expect(screen.getByText("Second Talk")).toBeInTheDocument();
  });
});
