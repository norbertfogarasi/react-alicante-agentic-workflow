import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker, sorted alphabetically by name", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "b", speaker: "Naia Etxeberria" }),
      session({ id: "a", speaker: "Diego Castellanos" }),
    ]);

    expect(grouped).toEqual([
      {
        speaker: "Diego Castellanos",
        sessions: [expect.objectContaining({ id: "a" })],
      },
      {
        speaker: "Naia Etxeberria",
        sessions: [expect.objectContaining({ id: "b" })],
      },
    ]);
  });

  it("keeps multiple sessions for the same speaker together, in input order", () => {
    const first = session({
      id: "first",
      speaker: "Marta Fernandez",
      startTime: "09:00",
    });
    const second = session({
      id: "second",
      speaker: "Marta Fernandez",
      startTime: "14:00",
    });

    const grouped = groupSessionsBySpeaker([first, second]);

    expect(grouped).toEqual([
      { speaker: "Marta Fernandez", sessions: [first, second] },
    ]);
  });

  it("excludes the closing panel's sentinel speaker value", () => {
    const grouped = groupSessionsBySpeaker([
      session({ speaker: "Full speaker lineup" }),
    ]);

    expect(grouped).toEqual([]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
