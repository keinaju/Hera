import css from './card.module.css';
import { useState } from 'react';

export default function Card({ backSide, frontSide }) {
    const [side, setSide] = useState('front');

    function changeSide() {
        setSide(oldSide => {
            if (oldSide == 'front') return 'back';
            else return 'front';
        });
    }

    return (<div
        onClick={changeSide}
        className={css.flipCard}
        style={{ width: '100%', height: '50vh', margin: '10px 0px' }}
    >
        <div className={`${css.flipCardInner} ${side == 'back' ? css.flipActive : null}`}>
            {<div className={css.flipCardFront}>{frontSide}</div>}
            {<div className={css.flipCardBack}>{backSide}</div>}
        </div>
    </div>);
}