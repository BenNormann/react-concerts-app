import type { Event } from "./data/concerts";

export function ConcertGrid({ sorting, concerts } : { sorting: "artist" | "city" | "date", concerts: Event[] }) {

  const sortedConcerts = () => {    
      return [...concerts].sort((a, b) => {
        if (sorting === "artist") return a.artist.localeCompare(b.artist);
        if (sorting === "city") return a.city.localeCompare(b.city);
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      });
  }

  return (
    <div className="concertGrid">
      {sortedConcerts().map((concert) => (
        <div
          key={crypto.randomUUID()}
          className="concertCard"
        >
          <div className="concertArtist">{concert.artist}</div>
          <div className="concertMeta">
            <span className="concertCity">{concert.city}</span>
            <span className="concertDate">
              {new Date(concert.startTime).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

