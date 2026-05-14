import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
const baseUrl = `http://localhost:3000/api/diaries`;

const getAll = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((res) => res.data);
};

const createNew = (diary: NewDiaryEntry) => {
  return axios
    .post<NonSensitiveDiaryEntry>(baseUrl, diary)
    .then((res) => res.data);
};

export default {
  getAll,
  createNew,
};
