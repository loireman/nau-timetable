import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';

export default function VerticalNavLink({ active = false, className = '', title = '', icon = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'vertical-link transition duration-600 ease-in-out focus:outline-none ' +
                (active
                    ? 'active'
                    : '') +
                className
            }
        >
            {icon && <Icon icon={icon} />}
            {title && <span>{title}</span>}
            {children}
        </Link>
    );
}
