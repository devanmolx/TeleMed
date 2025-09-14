import { Router } from "express";
import prisma from "../lib/prismaClient.js";

const router = Router();

router.get("/all", async (req, res) => {

    try {

        const doctors = await prisma.doctor.findMany({
            include: {
                language: true,
                Appointment: true,
                DoctorAvailability: true
            }
        })

        res.status(200).json({ doctors, status: true });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", status: false });
    }

})

router.post("/book", async (req, res) => {
    const { doctorId, patientId, availabilityId } = req.body;

    console.log(doctorId, patientId, availabilityId);

    try {
        const appointment = await prisma.appointment.create({
            data: {
                doctorId,
                patientId,
                availabilityId
            }
        });

        res.status(201).json({ appointment, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", status: false });
    }
})


export default router;