import { createContext } from "react";


export interface PatientType {
    id: number;
    name: string;
    email: string;
    password: string;
    specialization: string;
    experience: number;
    gender: string;
    phone?: string | null;
    address?: string | null;
    createdAt: string;
    updatedAt: string;
}


interface PatientContextType {
    patient: PatientType | null;
    setPatient: (patient: PatientType | null) => void;
    fetchPatient: () => Promise<void>;
}

const defaultValues: PatientContextType = {
    patient: null,
    setPatient: () => { },
    fetchPatient: async () => { },
};

export const PatientContext = createContext<PatientContextType>(defaultValues);
