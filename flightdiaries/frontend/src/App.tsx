import "./App.css";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import type { NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    [],
  );

  useEffect(() => {
    diaryService.getAll().then((initialEntries) => {
      setDiaryEntries(initialEntries);
    });
  }, []);

  const updateLocalEntries = (entry: NonSensitiveDiaryEntry) => {
    setDiaryEntries((prev) => prev.concat(entry));
  };

  return (
    <>
      <ToastContainer />
      <EntryForm updateLocalEntries={updateLocalEntries} />
      <Entries entries={diaryEntries} />
    </>
  );
}

export default App;
