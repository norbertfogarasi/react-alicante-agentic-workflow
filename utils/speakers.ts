import type { Session } from "@/types/session";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * The closing panel's `speaker` column holds this sentinel instead of an
 * individual's name — it stands for "the day's speakers" collectively, not
 * one person, so it must not become its own speaker card.
 */
const NON_SPEAKER_VALUES = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker, sorted alphabetically by speaker name. Each
 * speaker's own sessions keep the order `sessions` provided them in
 * (`fetchSessions` already orders by start time).
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (NON_SPEAKER_VALUES.has(session.speaker)) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: speakerSessions,
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
