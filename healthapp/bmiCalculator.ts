interface bmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const bmi = (heightCm: number, weightKg: number): string => {
  const value: number = Number(weightKg) / (Number(heightCm) / 100) ** 2;

  const categories = [
    {
      label: "Obese (Class III)",
      check: (v: number) => v >= 40,
    },
    {
      label: "Obese (Class II)",
      check: (v: number) => v >= 35,
    },
    {
      label: "Obese (Class I)",
      check: (v: number) => v >= 30,
    },
    {
      label: "Overweight",
      check: (v: number) => v >= 25,
    },
    {
      label: "Normal range",
      check: (v: number) => v >= 18.5,
    },
    {
      label: "Underweight (Mild thinness)",
      check: (v: number) => v >= 17,
    },
    {
      label: "Underweight (Moderate thinness)",
      check: (v: number) => v >= 16,
    },
    {
      label: "Underweight (Severe thinness)",
      check: (v: number) => v < 16,
    },
  ];

  const categoryLabel: string = categories.find((c) => c.check(value))!.label;
  return categoryLabel;
};

if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    const result = bmi(height, weight);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
