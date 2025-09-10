import { Router } from "express";
import { registerType } from "../lib/zodTypes";
import prisma from "../lib/prismaClient";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";

const router = Router();

const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {

    const body = req.body;

    try {

        const parsedBody = registerType.safeParse(body);

        if (!parsedBody.success) {
            return res.status(400).json({ error: parsedBody.error, status: false });
        }

        const { name, email, password, age, gender } = parsedBody.data;

        const existingPatient = await prisma.patient.findUnique({
            where: {
                email: email
            }
        });

        if (existingPatient) {
            return res.status(400).json({ error: "Patient already exists", status: false });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);

        const patient = await prisma.patient.create({
            data: {
                name,
                email,
                password: hashedPassword,
                age,
                gender
            }
        });

        const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(201).json({ token, status: true });

    } catch (error) {
        console.error("Error registering patient:", error);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required", status: false });
        }

        const patient = await prisma.patient.findUnique({
            where: {
                email: email
            }
        });

        if (!patient || !bcrypt.compareSync(password, patient.password)) {
            return res.status(400).json({ error: "Invalid email or password", status: false });
        }

        const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(200).json({ token, status: true });

    } catch (error) {
        console.error("Error logging in patient:", error);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
});

export default router;