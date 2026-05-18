import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
// import diagnosisService from "../services/diagnoses";
import type { Patient } from "../types";
// import type { Diagnosis } from "../types";
import EntryDetails from "./EntryDetails";

const PatientInformationPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  //   const [diagnoses, setDiagnoses] = useState<Diagnosis[] | []>([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchPatient = async (id: string) => {
      const patientData = await patientService.getById(id);
      setPatient(patientData);
    };
    // const fetchDiagnosisData = async () => {
    //   const diagnosisData = await diagnosisService.getAll();
    //   setDiagnoses(diagnosisData);
    // };
    void fetchPatient(id);
    // void fetchDiagnosisData();
  }, [id]);

  if (!id) {
    return <div>Invalid patient id</div>;
  }

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <h2>{patient.name}</h2>
        <img
          src={
            patient.gender === "male"
              ? "/male.svg"
              : patient.gender === "female"
                ? "/female.svg"
                : "/other.svg"
          }
          alt="gender icon"
        />
      </div>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>

      <div>
        <h3>entries</h3>

        {patient.entries.map((e) => (
          <EntryDetails
            key={e.id}
            entry={e}
          />
        ))}

        {/* {patient.entries.map((e) => (
          <div key={e.id}>
            <span>
              {e.date} {e.description}
            </span>

            {e.diagnosisCodes ? (
              <ul>
                {e.diagnosisCodes.map((dc) => (
                  <li key={dc}>
                    {dc} {diagnoses.find((d) => d.code === dc)?.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default PatientInformationPage;
