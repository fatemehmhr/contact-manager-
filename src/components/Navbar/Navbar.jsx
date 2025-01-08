import SearchContact from "../Search/SearchContact";
import { useLocation } from 'react-router-dom';


const Navbar = () => {

    const location = useLocation();

    return (
        <nav className="w-full shadow-lg pb-4">
            <div className="container flex justify-between m-auto pt-4 ">
                <div className="flex">
                    <span className="bg-deracula-PURPLE ml-2 flex items-center justify-center border border-deracula-PURPLE rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </span>
                    <h1 className="font-bold text-deracula-FOREGROUND">
                        وب اپلیکیشن مدیریت{" "}
                        <span className="text-deracula-PURPLE" >مخاطبین</span>
                    </h1>
                </div>
                {
                    location.pathname === '/contacts' ? (
                        <SearchContact />
                    ) : null
                }
            </div>
        </nav>

    )

}
export default Navbar;