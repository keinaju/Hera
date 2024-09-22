'use client';

import css from './locationInput.module.css';
import { findLocation } from '@/actions/findLocation.js';
import { useRef, useState } from 'react';
import TextInput from './textInput';

export default function LocationInput({ setLocation }) {
    const [mode, setMode] = useState('text'); //text or manual
    const [feedback, setFeedback] = useState(null);
    const searchInputRef = useRef(null);

    function onInput(event) {
        searchInputRef.current = event.target.value;
    }
    
    async function updateLocation() {
        if (!searchInputRef.current) {
            return setFeedback('Provide search input.');
        }
        
        const newLocation = await findLocation(searchInputRef.current);
        if (!newLocation) {
            return setFeedback('Couldn\'t find location.');
        }

        setFeedback(null);
        setLocation(newLocation);
    }

    function handleManualLatitudeChange(event) {
        const newLatitude = Number(event.target.value);

        setLocation(oldLocation => ({
            address: 'manual coordinates: ',
            latitude: newLatitude,
            longitude: oldLocation?.longitude,
        }));
    }

    function handleManualLongitudeChange(event) {
        const newLongitude = Number(event.target.value);

        setLocation(oldLocation => ({
                address: 'manual coordinates: ',
                latitude: oldLocation?.latitude,
                longitude: newLongitude,
        }));
    }

    function handleModeChange(event) {
        setMode(event.target.value);
    }

    function handleEnter(event) {
        if (event.key == 'Enter') {
            updateLocation();
        }
    }

    const textModeJsx = (<div className={mode == 'manual' ? css.hidden : null}>
        <label htmlFor='searchInput'>Location: </label>

        <TextInput
            id='searchInput'
            name='searchInput'
            onBlur={updateLocation}
            onInput={onInput}
            onKeyDown={handleEnter}
            size={16}
            />  
    </div>);

    const manualModeJsx = (<div className={mode == 'text' ? css.hidden : null}>
        <div>
            <label htmlFor='latitudeInput'>Latitude:</label>
            <TextInput
                id='latitudeInput'
                min={-90}
                max={90}
                name='latitudeInput'
                type='number'
                onInput={handleManualLatitudeChange}
                size={6}
                step='0.00001'
            />
        </div>

        <div>
            <label htmlFor='longitudeInput'>Longitude:</label>
            <TextInput
                id='longitudeInput'
                min={-180}
                max={180}
                name='longitudeInput'
                type='number'
                onInput={handleManualLongitudeChange}
                size={6}
                step='0.00001'
            />
        </div>
    </div>);

    return (<section>
        {textModeJsx}
        {manualModeJsx}

        <div>
            {'Mode: '}

            <span className={css.radioButton}>
                <input
                    checked={mode == 'text'}
                    id='textMode'
                    name='modeInput'
                    onChange={handleModeChange}
                    type='radio'
                    value='text' />
                <label htmlFor='textMode'>Text search</label>
            </span>

            <span className={css.radioButton}>
                <input
                    checked={mode == 'manual'}
                    id='manualMode'
                    name='modeInput'
                    onChange={handleModeChange}
                    type='radio'
                    value='manual' />
                <label htmlFor='manualMode'>Coordinate input</label>
            </span>
        </div>
        
        {feedback ? feedback : null}
    </section>);
}