import { type EntriesProps } from "../types";

const Entries = ({ entries }: EntriesProps) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {entries.map((e) => (
        <div
          className="entry"
          key={e.id}
        >
          <p>{e.date}</p>
          <p>visibility: {e.visibility}</p>
          <p>weather: {e.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default Entries;
