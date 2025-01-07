import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const SearchContact = () => {

    const { contactSearch } = useContext(ContactContext);

    return (
        <div className="flex border border-purple-500  rounded-xl ">
            <input className="pr-5 rounded-r-xl"
                onChange={
                    event => contactSearch(event.target.value)
                }
                type="text"
                dir="rtl"
                placeholder="جستوجوی مخاطب" />
            <button className="bg-purple-500  px-3 flex justify-center items-center rounded-l-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>
    )
}
export default SearchContact;