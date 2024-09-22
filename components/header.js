import css from './header.module.css';
import dbConnect from '@/lib/dbConnect';
import Link from 'next/link';
import Navigation from '@/components/navigation.js';
import User from '@/models/user.js';
import { verifySession } from '@/lib/session';

export default async function Header() {
    const { userId } = await verifySession();
    let text;
    if (userId) {
        await dbConnect();
        const user = await User.findOne({ _id: userId }).select('email').exec();
        if(user) text = user.email;
    }

    return (<header className={css.header}>
        <div className={css.left}>
        </div>

        <div className={css.title}>
            <Link className={css.link} href='/'>Hera</Link>
        </div>

        <div className={css.nav}>
            {text ? <span className={css.user}>Logged in as {text}</span> : null}
            <Navigation />
        </div>
    </header>);
}