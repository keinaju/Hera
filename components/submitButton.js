import Button from '@/components/button.js';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ text }) {
    const { pending } = useFormStatus();
    return (<Button disabled={pending} submit={true}>
        {pending ? 'Processing...' : text }
    </Button>);
}