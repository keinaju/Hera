'use client';

import Button from '@/components/button.js';
import css from './productList.module.css';
import { deleteProduct } from '@/actions/deleteProduct.js';
import HorizontalRuler from '@/components/horizontalRuler';
import Post from '@/components/post.js';
import { useRouter } from 'next/navigation';

export default function ProductList({ products }) {
    const router = useRouter();

    if (products.length == 0) {
        return 'You don\'t have any products yet.';
    }

    return (<ul className={css.list}>
        {products.map(product => <li key={product._id}>            
            <Post
                headText={product.title}
                imageSrc={`https://hera-posts-pictures.s3.eu-north-1.amazonaws.com/${product.picture}`}
                tags={product.tags.map(tag => `#${tag}`)}
            />

            <Button onClick={async () => {
                const response = await deleteProduct(product._id);
                alert(response.message);
                router.refresh();
            }}>
                Delete
            </Button>

            <HorizontalRuler />
        </li>)}
    </ul>);
}