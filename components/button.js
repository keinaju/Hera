import css from './button.module.css';

export default function Button({
    children,
    disabled = false,
    onClick,
    submit = false
}) {
    return (<button
        className={css.button}
        disabled={disabled}
        onClick={onClick}
        type={submit ? 'submit' : 'button'}
    >
        {children}
    </button>);
}