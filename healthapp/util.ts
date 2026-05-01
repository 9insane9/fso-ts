type ValidationResult =
  | { error: string }
  | {
      daily_exercises: number[];
      target: number;
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRequestBody = (reqBody: any): ValidationResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = reqBody;

  if (daily_exercises === undefined || target === undefined) {
    return { error: "parameters missing" };
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((n) => isNaN(Number(n))) ||
    isNaN(Number(target))
  ) {
    return { error: "malformatted parameters" };
  }

  return {
    daily_exercises: daily_exercises.map((n) => Number(n)),
    target: Number(target),
  };
};
