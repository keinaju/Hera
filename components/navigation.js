'use client';
import css from './navigation.module.css';
import { useRouter } from 'next/navigation';
import { signOut } from '@/actions/signOut';

export default function Navigation() {
    const router = useRouter();

    function handleInput(event) {
        const path = event.target.value;
        event.target.value = 'empty';
        
        if (path == 'empty') return;

        if (path == '/signout') {
            signOut();
            return;
        }
        
        router.push(path);
    }

    return (<select className={css.navigation} onInput={handleInput}>
        <option value='empty'></option>
        <option value='/feed'>Feed</option>
        <option value='/'>Front page</option>
        <option value='/signin'>Sign In</option>
        <option value='/signout'>Sign Out</option>
        <option value='/signup'>Sign Up</option>
        <option value='/user'>User</option>
    </select>);
}