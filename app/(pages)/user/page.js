import DeleteUserButton from '@/components/deleteUserButton.js';
import { findPlaces } from '@/lib/findPlaces.js';
import { findProducts } from '@/lib/findProducts.js';
import ProductList from '@/components/productList.js';
import RouterButton from '@/components/routerButton.js';
import PlaceList from '@/components/placeList';
import { verifySession } from '@/lib/session.js';

export default async function UserPage() {
    const { userId } = await verifySession();
    if (!userId) return;

    const [places, products] = await Promise.all([findPlaces(), findProducts()]);

    return (<section>
        <div style={{paddingBottom: '10px'}}>
            <RouterButton path='/create/place'>Create place</RouterButton>
            <RouterButton path='/create/product'>Create product</RouterButton>
            <DeleteUserButton>Delete this user</DeleteUserButton>
        </div>

        <h2>My places:</h2>
        <PlaceList places={places} />

        <h2>My products:</h2>
        <ProductList products={products} />
    </section>);
}