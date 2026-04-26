const bmi = (heightCm: number, weightKg: number): string => {
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
  console.log(categoryLabel)

  return categoryLabel;
};

console.log(bmi(180, 74));
