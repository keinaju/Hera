import css from './post.module.css';
import Image from 'next/image';
import fallback from '@/images/fallback.jpg';

export default function Post({ headText, imageSrc, subText, tags }) {
    return (<article className={css.post}>
        <h3>{headText}</h3>

        <i>{subText}</i>

        {tags.join(', ')}

        <div className={css.pictureContainer} style={{ width: '100%', height: '50vh', position: 'relative' }}>
            <Image
                alt=' '
                width={0}
                height={0}
                sizes='100vw'
                src={imageSrc || fallback}
                style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                }}
            />
        </div>
    </article>);
}