import { useState, useEffect } from "react";
import { ConcertGrid } from "./ConcertGrid";
import { getConcerts } from "./utils/getConcerts";
import type { Event } from "./data/concerts";

export function App() {
  const [concerts, setConcerts] = useState<Event[]>([]);
  const [sorting, setSorting] = useState<"artist" | "city" | "date">("artist");
  const [search, setSearch] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date, new Date("9999-12-31")]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    getConcerts().then(setConcerts);
  }, []);

  const filteredConcerts = () => {
    return [...concerts].filter((concert) => {
      const artist = concert.artist.toLowerCase().includes(search.toLowerCase());
      const city = concert.city.toLowerCase().includes(locations.join(',').toLowerCase());
      const date = 
        concert.startTime >= dateRange[0].toISOString() && 
        concert.startTime <= dateRange[1].toISOString();
      return artist && city && date;
    });
  }

  return (
    <div className="app">
      <header className="appHeader">
        <h1 className="text-center">Concerts</h1>

        <div className="sortBar">
          <label htmlFor="sortBy">Sort by</label>
          <select onChange={(e) => setSorting(e.target.value as "artist" | "city" | "date")}>
            <option value="artist">Artist</option>
            <option value="city">City</option>
            <option value="date">Date</option>
          </select>
          <input type="text" placeholder="Artist Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <input type="date" value={dateRange[0].toISOString().split('T')[0]} onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}/>
          <input type="date" value={dateRange[1].toISOString().split('T')[0]} onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}/>
          <input type="text" placeholder="Location Search" value={locations} onChange={(e) => setLocations(e.target.value.split(','))}/>
        </div>
      </header>

      <main>
        <ConcertGrid sorting={sorting} concerts={filteredConcerts()} />
      </main>
    </div>
  );
}

