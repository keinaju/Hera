'use server';

import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';
import dbConnect from '@/lib/dbConnect.js';
import { redirect } from 'next/navigation';
import { SignInFormSchema } from '@/lib/validation/user';
import User from '@/models/user.js';

export async function signIn(state, formData) {
    // Validate
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });
    
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Determine if credentials are correct
    const { email, password } = validatedFields.data;
    await dbConnect();
    const user = await User.findOne({ email }).exec();
    if (user) {
        const result = await bcrypt.compare(password, user.hashedPassword);
        if (result == true) {
            await createSession(user.id);
            return redirect('/user');
        }
    }

    return { message: 'Invalid credentials.' };
}