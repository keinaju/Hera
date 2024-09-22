'use client';

import Box from '@/components/box.js';
import css from './page.module.css';
import ErrorList from '@/components/errorList.js';
import HorizontalRuler from '@/components/horizontalRuler';
import Link from 'next/link';
import { signUp } from '@/actions/signUp.js';
import SubmitButton from '@/components/submitButton.js';
import TextInput from '@/components/textInput.js';
import { useFormState } from 'react-dom';

export default function SignUpPage() {
    const [state, action] = useFormState(signUp, undefined);

    let feedback = null;
    if (state?.errors) {
        feedback = <ErrorList errors={[
            ...(state.errors.firstName || []),
            ...(state.errors.lastName || []),
            ...(state.errors.email || []),
            ...(state.errors.password || []),
        ]} />;
    } else if (state?.message) {
        feedback = <div>{state.message}</div>;
    }

    return (<section className={css.section}>
        <h1>Sign up to Hera:</h1>
        <Box>
            <form action={action}>
                <label htmlFor='firstName'>First name:</label>
                <TextInput id='firstName' name='firstName' size={16} />

                <label htmlFor='lastName'>Last name:</label>
                <TextInput id='lastName' name='lastName' size={16} />

                <label htmlFor='email'>Email:</label>
                <TextInput id='email' name='email' size={16} />

                <label htmlFor='password'>Password:</label>
                <TextInput id='password' name='password' size={16} type='password' />

                <HorizontalRuler />

                <SubmitButton text='Sign up' />
                {feedback}
            </form>
        </Box>
        Already have an account?
        <br />
        <Link href='/signin'>Sign in here.</Link>
    </section>);
}