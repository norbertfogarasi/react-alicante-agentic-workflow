import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: string;
  sessions: Session[];
}

export function SpeakerCard({ speaker, sessions }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle as="h2" fontSize="md">
          {speaker}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="3">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/sessions/${session.id}`}
              aria-label={`${session.startTime}, ${session.title}`}
            >
              <Flex direction="column">
                <Text fontSize="sm" color="var(--text-secondary)">
                  {session.startTime}
                </Text>
                <Text color="var(--text-primary)">{session.title}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
