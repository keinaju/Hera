import { z } from 'zod';

const nameSchema = fieldname => z
    .string()
    .trim()
    .min(1, { message: fieldname + ' must contain at least 1 character.' });

const emailSchema = z
    .string()
    .trim()
    .email({ message: 'Email must be valid.' });

const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
    });

export const SignUpFormSchema = z.object({
    firstName: nameSchema('First name'),
    lastName: nameSchema('Last name'),
    email: emailSchema,
    password: passwordSchema,
});

export const SignInFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});