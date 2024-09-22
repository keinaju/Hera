'use client';

import { createProduct } from '@/actions/createProduct.js';
import Box from '@/components/box.js';
import ErrorList from '@/components/errorList.js';
import HorizontalRuler from '@/components/horizontalRuler.js';
import ImageInput from '@/components/imageInput.js';
import ListInput from '@/components/listInput';
import Post from '@/components/post.js';
import { preventSubmitOnEnter } from '@/lib/preventSubmitOnEnter.js';
import SubmitButton from '@/components/submitButton.js';
import TagInput from '@/components/tagInput.js';
import TextInput from '@/components/textInput.js';
import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';

export default function CreateProductForm({ places }) {
    const [state, action] = useFormState(createProduct, undefined);
    const [title, setTitle] = useState('');
    const [pictureUrl, setPictureUrl] = useState(null);
    const [tags, setTags] = useState([]);
    const formRef = useRef();
    const tagsRef = useRef();

    function handleTitleInput(event) {
        setTitle(event.target.value);
    }

    let feedback = null;
    if (state?.errors) {
        feedback = <ErrorList errors={[
            ...(state.errors.title || []),
            ...(state.errors.place || []),
            ...(state.errors.tags || []),
        ]} />;
    } else if (state?.message) {
        feedback = <div>{state.message}</div>;
    }

    return (<>
        <form action={action} onKeyDown={preventSubmitOnEnter} ref={formRef}>
            <Box>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <br />
                    <TextInput
                        id='title'
                        name='title'
                        onInput={handleTitleInput} />
                </div>
                <HorizontalRuler />
                <div>
                    <label htmlFor='place'>Place:</label>
                    <br/>
                    <ListInput id='place' name='place' items={places} />
                </div>
                <HorizontalRuler />
                <div>
                    <ImageInput id='imageInput' setPicture={setPictureUrl} />
                </div>
                <HorizontalRuler />
                <div>
                    <label>Tags:</label>
                    <input
                        hidden
                        id='tags'
                        name='tags'
                        readOnly={true}
                        ref={tagsRef}
                        type='text'
                        value={tags}/>
                    <br />
                    <TagInput tags={tags} setTags={setTags} />
                </div>
                <HorizontalRuler />
                <div style={{ textAlign: 'right' }}>
                    <SubmitButton text='Send' />
                </div>
                {feedback}
            </Box>
        </form>

        <h2>Preview</h2>
        <Post
            headText={title || '<Title text>'}
            imageSrc={pictureUrl}
            tags={tags} />
    </>);
}