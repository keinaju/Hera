import CreateProductForm from './form.js';
import { findPlaces } from '@/lib/findPlaces';
import RouterButton from '@/components/routerButton.js';

export default async function CreateProductPage() {
    const places = await findPlaces();
    const copy = places.map(place => ({
        key: place._id.toString(),
        value: place._id.toString(),
        text: `${place.name}, ${place.fullAddress}`,
    }));
    
    return (<>
        <RouterButton path='/user'>Back</RouterButton>
        <h2>Create product</h2>
        <CreateProductForm places={copy} />
    </>);
}