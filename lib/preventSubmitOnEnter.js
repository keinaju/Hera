/*
onKeyDown event handler to prevent form submitting on enter 
example of React component:
<form onKeyDown={preventSubmitOnEnter}></form>
*/

export function preventSubmitOnEnter(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
    }
}