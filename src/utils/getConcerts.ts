import { concerts, type Event } from "../data/concerts";

export async function getConcerts(): Promise<Event[]> {
  return new Promise<Event[]>((res) => {
    setTimeout(() => res(concerts), 500);
  });
}
