import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import logo from '@/images/logo.png';

export default function Home() {
    return (
        <div className={styles.page}>
            
            <main className={styles.main}>
                <Image
                    className={styles.logo}
                    src={logo}
                    alt="Next.js logo"
                    width={300}
                    height={300}
                    priority
                />

                <h3>Welcome to Hera!</h3>
                
                <ul>
                    <li>
                        Hera is a social media all about food.
                        Explain what you would like to eat, and Hera will tell you where to find it.
                    </li>
                    <li>
                        Looking for a place to eat?
                        Hera uses APIs to help you find nearby restaurants, if you let her know where.
                    </li>
                    <li>
                        Allergies and intolerances covered.
                        Looking for vegan food? Gluten or lactose-free?
                        Hera will help you.
                    </li>
                </ul>

                <div className={styles.ctas}>
                    <Link
                        className={styles.primary}
                        href='/feed'
                    >
                        Explore Hera's feed
                    </Link>

                    <Link
                        className={styles.primary}
                        href='/signup'
                    >
                        Sign up to share your food in Hera
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
            </footer>

        </div>
    );
}
