import { Switch } from '@headlessui/react';
import { SunIcon } from '@heroicons/react/24/solid';
interface HeaderProps {
    enabled: boolean;
    handleToggle: () => void;
}
const ToggleTheme: React.FC<HeaderProps> = ({ enabled, handleToggle }) => {

    return (
        <div className="dark-bg pr-10">
            <Switch
                checked={enabled}
                onChange={handleToggle}
                className={`${enabled ? 'bg-blue-50' : 'bg-slate-700'}
          relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 
          border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
          focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-4' : 'translate-x-0'} 
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full text-yellow-500
            shadow-lg ring-0 transition duration-200 ease-in-out`}
                >
                    < SunIcon />
                </span>
            </Switch>
        </div>
    )
}
export default ToggleTheme;