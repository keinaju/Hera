'use client';

import Button from '@/components/button.js';
import { deleteUser } from '@/actions/deleteUser.js';
import { signOut } from '@/actions/signOut.js';
import { useRouter } from 'next/navigation';

export default function DeleteUserButton({ children }) {
    const router = useRouter();

    return <Button onClick={async () => {
        const response = await deleteUser();
        alert(response.message);
        await signOut();
    }}>{children}</Button>;
}