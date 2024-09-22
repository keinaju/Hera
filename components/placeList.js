'use client';

import Button from '@/components/button.js';
import css from './placeList.module.css';
import { deletePlace } from '@/actions/deletePlace.js';
import Link from 'next/link';
import Post from '@/components/post.js';
import HorizontalRuler from './horizontalRuler.js';
import { useRouter } from 'next/navigation';

export default function PlaceList({ places }) {
    const router = useRouter();

    if (places.length == 0) {
        return 'You don\'t have any places yet.';
    }

    return (<ul className={css.list}>
        {places.map(place => <li key={place._id}>
            <Post
                headText={<Link href={`/place/${place.id}`}>{place.name}</Link>}
                imageSrc={`https://hera-posts-pictures.s3.eu-north-1.amazonaws.com/${place.picture}`}
                subText={`${place.streetAddress} ${place.postalCode} ${place.city} ${place.country}`}
                tags={[]}
            />

            <Button onClick={async () => {
                const response = await deletePlace(place._id);
                alert(response.message);
                router.refresh();
            }}>
                Delete
            </Button>

            <HorizontalRuler />
        </li>)}
    </ul>);
}