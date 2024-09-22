'use client';

import Box from '@/components/box.js';
import css from './page.module.css';
import ErrorList from '@/components/errorList.js';
import Link from 'next/link';
import { signIn } from '@/actions/signIn.js';
import SubmitButton from '@/components/submitButton.js';
import TextInput from '@/components/textInput.js';
import { useFormState } from 'react-dom';
import HorizontalRuler from '@/components/horizontalRuler';

export default function SignInPage() {
    const [state, action] = useFormState(signIn, undefined);

    let feedback = null;
    if (state?.errors) {
        feedback = <ErrorList errors={[
            ...(state.errors.email || []),
            ...(state.errors.password || []),
        ]} />;
    } else if (state?.message) {
        feedback = <div>{state.message}</div>;
    }
    
    return (<section className={css.section}>
        <h1>Sign in to Hera:</h1>
        <Box>
            <form action={action}>
                <label htmlFor='email'>Email:</label>
                <TextInput id='email' name='email' size={16} />

                <label htmlFor='password'>Password:</label>
                <TextInput id='password' name='password' size={16} type='password' />

                <HorizontalRuler />
                
                <SubmitButton text='Sign in' />
                {feedback}
            </form>
        </Box>
        Don't have an account?
        <br />
        <Link href='/signup'>Sign up here.</Link>
    </section>);
}