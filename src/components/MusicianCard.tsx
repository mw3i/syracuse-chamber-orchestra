import type { Musician } from "@/lib/types";

interface MusicianCardProps {
  musician: Musician;
}

export function MusicianCard({ musician }: MusicianCardProps) {