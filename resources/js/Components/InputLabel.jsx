export default function InputLabel({ value, className = '', required = false, children, ...props }) {
    return (
        <label {...props} className={`form-label` + className}>
            {required && <span className="form-required">* </span>}
            {value ? value : children}
        </label>
    );
}
