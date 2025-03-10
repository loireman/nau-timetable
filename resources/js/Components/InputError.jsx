export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'form-required ' + className}>
            {message}
        </p>
    ) : null;
}
