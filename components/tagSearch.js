import Button from '@/components/button.js';
import css from './tagSearch.module.css';
import tags from '@/common/tags.js';
import TextInput from '@/components/textInput.js';
import { useState } from 'react';

export default function TagSearch({ addTag, onCancel, visible }) {
    const [matchingTags, setMatchingTags] = useState([]);

    function handleInput(event) {
        const searchString = event.target.value;
        if (!searchString) {
            setMatchingTags([]);
            return;
        }

        const regex = new RegExp(searchString);
        const matches = tags.filter(tag => regex.test(tag));
        setMatchingTags(matches);
    }

    return (<div className={css.modal} style={{ display: visible ? 'block' : 'none' }}>
        <div className={css['modal-content']}>
            <h3>Find tags:</h3>
            <TextInput id='search' onInput={handleInput} />
            <br />
            <div>
                {matchingTags.length > 0 && 'Click to add: '}
                {matchingTags.map(tag => <Button
                    key={tag}
                    onClick={() => addTag(tag)}
                >
                    + {tag}
                </Button>)}
            </div>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={onCancel}>Close</Button>
            </div>
        </div>
    </div>);
}