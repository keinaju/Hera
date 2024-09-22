import css from './imageSlideShow.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageSlideShow({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(oldIndex => oldIndex < images.length - 1 ? oldIndex + 1 : 0);
        }, 2500 + Math.random() * 1000);

        return () => clearInterval(interval);
    }, []);

    return (<div className={css.slideshow}>
        {images.map((image, index) => <Image 
            alt={image.alt}
            width={0}
            height={0}
            sizes='100vw'
            className={index == currentIndex ? css.active : null}
            key={index}
            src={image.src}
            style={{
                height: '100%', width: '100%',
                objectFit: 'contain',
            }} 
        />)}
    </div>);
}