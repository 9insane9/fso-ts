import diaryService from "../services/diaryService";
import { useState } from "react";
import {
  type NewDiaryEntry,
  type FormProps,
  Weather,
  Visibility,
  NewEntrySchema,
} from "../types";
import { toast } from "react-toastify";
import axios from "axios";
import z from "zod";

const EntryForm = ({ updateLocalEntries }: FormProps) => {
  const [newEntry, setNewEntry] = useState<Partial<NewDiaryEntry>>({});

  const isComplete =
    newEntry.weather !== undefined &&
    newEntry.visibility !== undefined &&
    newEntry.date !== undefined;

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const entry = NewEntrySchema.parse(newEntry);

      const returnedDiary = await diaryService.createNew(entry);
      updateLocalEntries(returnedDiary);

      toast.success("Entry added");
      setNewEntry({});
    } catch (e: unknown) {
      // frontend validation errors
      if (e instanceof z.ZodError) {
        e.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }

      // axios errors
      if (axios.isAxiosError(e)) {
        const errors = e.response?.data?.error;

        if (Array.isArray(errors)) {
          errors.forEach((msg) => toast.error(msg));
        } else {
          toast.error(errors ?? "Server error");
        }
        return;
      }

      // fallback
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("unknown error");
      }
    }
  };

  return (
    <form
      className="entryForm"
      onSubmit={submitEntry}
    >
      <h1>Add new entry</h1>

      {/* DATE */}
      <label htmlFor="dateInput">date</label>
      <input
        type="date"
        id="dateInput"
        value={newEntry.date ?? ""}
        onChange={(e) =>
          setNewEntry((prev) => ({
            ...prev,
            date: e.target.value,
          }))
        }
      />

      {/* VISIBILITY */}
      <fieldset>
        <legend>visibility</legend>
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={newEntry.visibility === v}
              onChange={(e) =>
                setNewEntry((prev) => ({
                  ...prev,
                  visibility: e.target.value as Visibility,
                }))
              }
            />
            {v}
          </label>
        ))}
      </fieldset>

      {/* WEATHER */}
      <fieldset>
        <legend>weather</legend>
        {Object.values(Weather).map((w) => (
          <label key={w}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={newEntry.weather === w}
              onChange={(e) =>
                setNewEntry((prev) => ({
                  ...prev,
                  weather: e.target.value as Weather,
                }))
              }
            />
            {w}
          </label>
        ))}
      </fieldset>

      {/* COMMENT */}
      <label htmlFor="commentInput">comment</label>
      <input
        type="text"
        id="commentInput"
        value={newEntry.comment ?? ""}
        onChange={(e) =>
          setNewEntry((prev) => ({
            ...prev,
            comment: e.target.value,
          }))
        }
      />

      <button disabled={!isComplete}>submit</button>
    </form>
  );
};

export default EntryForm;
