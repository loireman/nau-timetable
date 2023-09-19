import { Link } from '@inertiajs/react';

export default function VerticalNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center w-full p-4 mt-2 rounded transition duration-600 ease-in-out focus:outline-none ' +
                (active
                    ? ' text-gray-200 bg-gray-700'
                    : 'hover:bg-gray-700 hover:text-gray-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
