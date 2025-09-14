import React, { ReactNode, useEffect, useState } from "react";
import { PatientContext, PatientType } from "./PatientContext";
import axios from "axios";
import { AllDoctorsRoute, MeRoute } from "@/lib/RouteProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PropType {
    children: ReactNode;
}

const PatientContextProvider: React.FC<PropType> = ({ children }) => {
    const [patient, setPatient] = useState<PatientType | null>(null);

    async function fetchPatient() {
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                return;
            }

            const res = (await axios.get(MeRoute, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }));

            console.log("Fetched patient data:", res.data);

            if (res.data.status) {
                const data: PatientType = res.data.patient;
                setPatient(data);
            }
        } catch (err) {
            console.log("Failed to fetch patient:", err);
        }
    }
    useEffect(() => {
        fetchPatient();
    }, []);

    return (
        <PatientContext.Provider value={{ patient, setPatient, fetchPatient }}>
            {children}
        </PatientContext.Provider>
    );
};

export default PatientContextProvider;
