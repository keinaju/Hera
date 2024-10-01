'use client';

import Box from '@/components/box.js';
import Button from '@/components/button.js';
import Card from '@/components/card.js';
import css from './page.module.css';
import fallback from '@/images/fallback.jpg';
import { feedAction } from '@/actions/feed.js';
import HorizontalRuler from '@/components/horizontalRuler';
import Image from 'next/image';
import ImageSlideShow from '@/components/imageSlideShow.js';
import Link from 'next/link';
import LocationInput from '@/components/locationInput';
import TagInput from '@/components/tagInput.js';
import { useRef, useState } from 'react';
import { useIntersection } from './useIntersection.js';

export default function FeedPage() {
    const [exhausted, setExhausted] = useState(false);
    const isLoadingPost = useRef(false);
    const [places, setPlaces] = useState([]);

    const [tags, setTags] = useState([]);
    // Location object { address, latitude, longitude }
    const [location, setLocation] = useState(null);

    // Append feed when viewport intersects bottom of page
    const options = { root: null, rootMargin: '500px', threshold: 0 };
    const bottomOfFeed = useIntersection(options, appendFeed);

    async function appendFeed() {
        if (isLoadingPost.current) return;
        isLoadingPost.current = true;

        // Call server action that responds with post data
        const newPlaces = await feedAction({
            blacklist: places.map((place) => place.id),
            latitude: location?.latitude,
            longitude: location?.longitude,
            userTags: tags,
        });

        isLoadingPost.current = false;

        if (newPlaces.length == 0) {
            setExhausted(true);
            return;
        }

        // Append new data to old
        setPlaces((oldPlaces) => [...oldPlaces, ...newPlaces]);
    }

    function resetFeed() {
        setPlaces([]);
        setExhausted(false);
    }

    const placesJSX = [];
    for (const place of places) {
        const backSide = (
            <div className={css.grid}>
                {/* Top of grid */}
                <div className={css.topHalf}>
                    <Link href={`/place/${place.id}`}>
                        <h1>{place.name}</h1>
                    </Link>
                    {`${place.streetAddress} ${place.postalCode} ${place.city}`}
                    <br />
                    {place.phoneNumber}
                    <div style={{ textAlign: 'right' }}>
                        👍 {place.points} points
                    </div>
                </div>

                {/* Bottom of grid */}
                <div
                    style={{
                        backgroundColor: 'black',
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                    }}>
                    <Image
                        alt="Place"
                        width={0}
                        height={0}
                        sizes="100vw"
                        src={
                            place.placePicture
                                ? `https://hera-posts-pictures.s3.eu-north-1.amazonaws.com/${place.placePicture}`
                                : fallback
                        }
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            </div>
        );

        const frontSide = (
            <ImageSlideShow
                images={place.mealPictures.map((picture) => ({
                    alt: 'Meal',
                    src: `https://hera-posts-pictures.s3.eu-north-1.amazonaws.com/${picture}`,
                }))}
            />
        );

        placesJSX.push(
            <Card key={place.id} backSide={backSide} frontSide={frontSide} />
        );
    }

    return (
        <>
            <section className={css.parameters}>
                <Box>
                    <LocationInput
                        location={location}
                        setLocation={setLocation}
                    />
                    <HorizontalRuler />
                    Tags:
                    <span className={css.marginLeft}>
                        <TagInput tags={tags} setTags={setTags} />
                    </span>
                    <HorizontalRuler />
                    <div>
                        {tags.length > 0
                            ? tags.map((tag) => `#${tag}`).join(', ')
                            : 'Any tags'}

                        {location
                            ? ` near ${location.address}` +
                              ` (lat. ${location.latitude?.toFixed(3)},` +
                              ` lgt. ${location.longitude?.toFixed(3)})`
                            : ' anywhere'}

                        <span className={css.marginLeft}>
                            <Button onClick={resetFeed}>Apply to feed</Button>
                        </span>
                    </div>
                </Box>
            </section>

            <section style={{ textAlign: 'center' }}>
                {places.length > 0 ? 'Click posts for details.' : null}
                {placesJSX}

                {exhausted ? (
                    <div style={{ textAlign: 'center' }}>
                        Couldn't find more posts.
                    </div>
                ) : (
                    <div ref={bottomOfFeed}></div>
                )}
            </section>
        </>
    );
}
