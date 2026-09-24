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
        <CardTitle fontSize="lg">{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="3">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex
                direction="column"
                transition="color 0.2s"
                _hover={{ color: "var(--accent-hex)" }}
              >
                <Text fontSize="sm" color="var(--text-muted)">
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
