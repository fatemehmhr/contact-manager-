import Contact from '../Contact/Contact';
import Spinner from '../Spinner/Spinner';
import NotFound from '../../assets/no-found.gif';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContactContext } from '../../context/contactContext';

const Contacts = () => {

    const {filteredContacts,loading,deleteContact} = useContext(ContactContext);

    return(
        <>
            <section className="container">
                <div className="flex bg-deracula-PINK py-2 px-1 w-44 mr-20 rounded-sm mt-5 justify-center">
                    <Link to={"/contacts/add"}>ساخت مخاطب جدید</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </section>
            {
                loading ? <Spinner /> : (
                <section className='flex flex-wrap items-center mt-10 m-auto w-11/12'>
                    <div className='flex flex-wrap items-center mx-5 justify-center mt-10 w-full '>
                    {
                         filteredContacts.length > 0 ? filteredContacts.map((c) => (
                            <Contact key={c.id} contact={c} deleteContact={() => deleteContact(c.id,c.fullname)} /> )) : (
                                <div className="py-5 bg-deracula-CURRENTLINE  ">
                                     <p className="flex-wrap mb-5">
                                        مخاطب یافت نشد!
                                    </p>
                                     <img src={NotFound} alt="پیدا نشد" className="m-auto"/>
                                </div>)
                    }
                    </div>

                    

                </section>
                )
            }
                 </>
    )
}
export default Contacts;