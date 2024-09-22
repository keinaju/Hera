'use client';

import Box from '@/components/box.js';
import { useRef, useState } from 'react';

export default function ImageInput({ id, setPicture = () => {} }) {
    const fileInput = useRef();
    const [filename, setFilename] = useState();

    function handleClick(event) {
        fileInput.current.click();
    }

    function handleChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setPicture(null);
            return;
        }

        setFilename(file.name);

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPicture(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }
    
    return (<>
        <label htmlFor='imageInput'>Picture:</label>
        <input
            id={id}
            hidden
            name='picture'
            onChange={handleChange}
            ref={fileInput}
            type='file' />
        <Box onClick={handleClick}>
            <div style={{textAlign: 'center'}}>
                {filename || 'Click to upload file.'}
            </div>
        </Box>
    </>);
}