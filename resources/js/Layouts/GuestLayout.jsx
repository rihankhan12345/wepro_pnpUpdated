import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="mt-5 flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
           

            <div className="w-full sm:max-w-xl mt-0 px-3 py-2 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
