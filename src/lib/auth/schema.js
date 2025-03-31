import {z} from 'zod';

export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, 'Phone number must be at least 10 digits')
});

export const loginSchema = z.object({
    hash: z.string().min(64, 'Invalid authenitication hash')
})