import z from "zod";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient extends NewPatient {
  id: string;
}

export const GenderValues = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof GenderValues)[keyof typeof GenderValues];

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NonSensitivePatient = Omit<Patient, "ssn">;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(GenderValues),
  occupation: z.string(),
});
