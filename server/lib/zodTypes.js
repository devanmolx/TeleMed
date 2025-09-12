import { z } from "zod";
import { Gender } from "../generated/prisma/index.js";

const registerType = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(6).max(100),
    age: z.number().min(0),
    gender: z.enum(Gender)
});

const loginType = z.object({
    email: z.email(),
    password: z.string().min(6).max(100)
});

export { registerType, loginType };