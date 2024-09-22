import css from './page.module.css';
import dbConnect from '@/lib/dbConnect.js';
import fallback from '@/images/fallback.jpg';
import Image from 'next/image';
import mongoose from 'mongoose';
import { notFound } from 'next/navigation';
import Place from '@/models/place.js';
import Product from '@/models/product.js';
import PostComponent from '@/components/post.js';
import { getPictureUrl } from '@/lib/bucket';

export default async function PlacePage({ params }) {
    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return notFound();
    }
    
    await dbConnect();
    const place = await Place
        .findOne({ _id: id })
        .exec();
    if (!place) {
        return notFound();
    }

    const products = await Product.find({ place: id }).exec();
    
    return (<>
        <section className={css.grid}>
            <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                <Image 
                    alt='Place'
                    width={0}
                    height={0}
                    sizes='100vw'
                    src={place.picture ? getPictureUrl(place.picture) : fallback}
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>

            <div className={css.placeInformation}>
                <h2>{place.name}</h2>
                {place.fullAddress}
                <br/>
                {place.phoneNumber}
            </div>
        </section>

        <section>
            {products.map(product => <PostComponent
                key={product.id}
                headText={product.title} 
                imageSrc={getPictureUrl(product.picture)}
                tags={product.tags.map(tag => `#${tag}`)}
            />)}
        </section>
    </>);
}