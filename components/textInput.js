import css from './textInput.module.css';

export default function TextInput({
    id,
    max,
    min,
    name,
    onBlur,
    onInput,
    onKeyDown,
    placeholder,
    readOnly,
    size,
    step,
    type = 'text',
}) {
    return (<input
        autoComplete='off'
        className={css.input}
        id={id}
        max={max}
        min={min}
        name={name}
        onBlur={onBlur}
        onInput={onInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        size={size}
        step={step}
        type={type}
    />);
}