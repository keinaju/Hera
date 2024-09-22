'use client';

import Box from '@/components/box.js';
import { capitalize } from '@/lib/capitalize';
import countries from '@/common/countries.js';
import { createPlace } from '@/actions/createPlace.js';
import ErrorList from '@/components/errorList.js';
import HorizontalRuler from '@/components/horizontalRuler.js';
import ImageInput from '@/components/imageInput.js';
import ListInput from '@/components/listInput.js';
import LocationInput from '@/components/locationInput';
import { preventSubmitOnEnter } from '@/lib/preventSubmitOnEnter.js';
import RouterButton from '@/components/routerButton.js';
import TextInput from '@/components/textInput.js';
import SubmitButton from '@/components/submitButton.js';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function CreatePlacePage() {
    const [state, action] = useFormState(createPlace, undefined);
    const [location, setLocation] = useState();

    let feedback = null;
    if (state?.errors) {
        feedback = <ErrorList errors={[
            ...(state.errors.name || []),
            ...(state.errors.streetAddress || []),
            ...(state.errors.postalCode || []),
            ...(state.errors.city || []),
            ...(state.errors.country || []),
            ...(state.errors.latitude || []),
            ...(state.errors.longitude || []),
            ...(state.errors.phoneNumber || []),
        ]} />;
    } else if (state?.message) {
        feedback = <div>{state.message}</div>;
    }

    return (<section>
        <RouterButton path='/user'>Back</RouterButton>
        <h2>Create place</h2>
        <Box>
            <form action={action} onKeyDown={preventSubmitOnEnter}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <br />
                    <TextInput
                        id='name'
                        name='name'
                        placeholder=''
                    />
                </div>

                <HorizontalRuler />

                <div>
                    <label htmlFor='streetAddress'>Street address:</label>
                    <br />
                    <TextInput
                        id='streetAddress'
                        name='streetAddress'
                        placeholder=''
                    />
                </div>

                <div>
                    <label htmlFor='postalCode'>Postal code:</label>
                    <br />
                    <TextInput
                        id='postalCode'
                        name='postalCode'
                        placeholder=''
                    />
                </div>

                <div>
                    <label htmlFor='city'>City:</label>
                    <br />
                    <TextInput
                        id='city'
                        name='city'
                        placeholder=''
                    />
                </div>

                <div>
                    <label htmlFor='country'>Country:</label>
                    <br />
                    <ListInput id='country' name='country' items={countries.map(country => ({
                        key: country,
                        value: country,
                        text: country,
                    }))} />
                </div>

                <HorizontalRuler />

                <div>
                    <input hidden
                        id='latitude'
                        name='latitude'
                        readOnly type='text'
                        value={location?.latitude || ''} />
                    <input hidden
                        id='longitude'
                        name='longitude'
                        readOnly type='text'
                        value={location?.longitude || ''} />
                    <LocationInput setLocation={setLocation} />
                    <div>
                        {location ?
                            `${capitalize(location.address)} (${location.latitude}, ${location.longitude})`
                            : null}
                    </div>
                </div>

                <HorizontalRuler />

                <div>
                    <label htmlFor='phoneNumber'>Phone number:</label>
                    <br />
                    <TextInput
                        id='phoneNumber'
                        name='phoneNumber'
                        placeholder=''
                    />
                </div>

                <HorizontalRuler />

                <div>
                    <ImageInput id='imageInput' />
                </div>

                <div style={{ textAlign: 'right' }}>
                    <SubmitButton text='Send' />
                </div>
                {feedback}
            </form>
        </Box>
    </section>);
}