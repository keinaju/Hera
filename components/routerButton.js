'use client';

import Button from '@/components/button.js';
import { useRouter } from 'next/navigation';

export default function RouterButton({children, path}) {
    const router = useRouter();

    return (<Button onClick={() => router.push(path)}>
        {children}
    </Button>);
}