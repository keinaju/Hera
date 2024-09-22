import css from './listInput.module.css';

export default function ListInput({ id, name, items }) {
    return (<select id={id} name={name} className={css.listInput}>
        <option value='empty'></option>
        {items.map(item => <option key={item.key} value={item.value}>{item.text}</option>)}
    </select>);
}