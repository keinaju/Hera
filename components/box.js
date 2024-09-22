import css from './box.module.css';

export default function Box({ children, onClick }) {
    return (<section
        className={css.box}
        style={{cursor: onClick ? 'pointer' : null}}
        onClick={onClick}>
        {children}
    </section>);
}