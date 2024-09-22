import Button from '@/components/button.js';
import TagSearch from '@/components/tagSearch.js';
import { useState } from 'react';

export default function TagInput({ onChange = () => {}, tags, setTags }) {
    const [isPopupActive, setPopupActive] = useState(false);

    function addTag(newTag) {
        if (tags.includes(newTag)) return;
        setTags(oldTags => [...oldTags, newTag]);
        onChange();
    }

    function dropTag(tagToRemove) {
        setTags(oldTags => oldTags.filter(tag => tag != tagToRemove));
        onChange();
    }

    return (<span style={{textAlign: 'left'}}>
        <TagSearch
            addTag={addTag}
            onCancel={() => setPopupActive(false)}
            visible={isPopupActive ? true : false}
        />

        <Button onClick={() => setPopupActive(true)}>+ add tags</Button>
        {tags.map(tag => <Button key={tag} onClick={() => dropTag(tag)}>
            - {tag}
        </Button>)}
    </span>);
}