import css from './errorList.module.css';

export default function ErrorList({ errors }) {
    if (!errors) return null;
    return (<ul className={css.errorList}>
        {errors.map(error => <li key={error}>{error}</li>)}
    </ul>);
}