interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  hours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hoursArr = process.argv.slice(3).map((h) => Number(h));

  if (!isNaN(Number(args[2])) && !hoursArr.some((h) => isNaN(Number(h)))) {
    return {
      target: Number(args[2]),
      hours: hoursArr,
    };
  } else {
    throw new Error("Provided values were not all numbers!");
  }
};

export const calculateExercises = (target: number, hours: number[]): Result => {
  const ratings = [
    {
      label: "great, keep it up",
      check: (avg: number) => avg >= target,
      ratingNumber: 3,
    },
    {
      label: "not terrible, but you can do better",
      check: (avg: number) => avg / target >= 0.7,
      ratingNumber: 2,
    },
    {
      label: "not great, you can do a lot better",
      check: (avg: number) => avg / target < 0.7,
      ratingNumber: 1,
    },
  ];

  const averageResult = hours.reduce((sum, h) => sum + h, 0) / hours.length;
  const ratingsResult =
    ratings.find((r) => r.check(averageResult)) || ratings[ratings.length - 1]; //fallback at end of list

  const result = {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    success: averageResult >= target,
    rating: ratingsResult.ratingNumber,
    ratingDescription: ratingsResult.label,
    target: target,
    average: averageResult,
  };

  return result;
};

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));

if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
  try {
    const { target, hours } = parseExerciseArguments(process.argv);
    const result = calculateExercises(target, hours);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
