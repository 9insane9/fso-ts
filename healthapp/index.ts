import express from "express";
import { bmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import { validateRequestBody } from "./util.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.post("/exercises", (req, res) => {
  const result = validateRequestBody(req.body);

  if ("error" in result) {
    return res.status(400).send(result);
  }
  const { target, daily_exercises } = result;
  const exercises = calculateExercises(target, daily_exercises);

  return res.send(exercises);
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }

  const resultLabel = bmi(Number(height), Number(weight));
  const result = {
    weight: Number(weight),
    height: Number(height),
    bmi: resultLabel,
  };

  return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
