import './App.css';
import { Navbar, Contacts, AddContact, EditContact, ViewContact } from './components/index'
import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { createContact, getAllContacts, getAllGroups, deleteContact } from "./services/contactServices";
import { confirmAlert } from 'react-confirm-alert';
import { ContactContext } from './context/contactContext';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [groups, setGroups] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, [])
  ///////////////////////////////جهت ایجاد رندر مجدد///////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  ////////////////////مدیریت کننئه رویداد دوم ///////////ساخت مخاطب///////////////////////////////
  const createContactForm = async (values) => {
    try {
      setLoading((draft) => !draft);
      const { status, data } = await createContact(values);
      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد.");
        setContacts(draft => { draft.push(data) });
        setFilteredContacts(draft => { draft.push(data) });
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((draft) => !draft);
    }
  };

  /////////////////////////////////////  ایجاد confirm alert//////////////////////////////////////////
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir='rtl' className='bg-deracula-CURRENTLINE border rounded-md border-deracula-PURPLE p-4'>
            <h1 className='text-deracula-YELLOW'>پاک کردن مخاطب</h1>
            <p className='text-deracula-FOREGROUND my-3'>مطمعنی که میخواهی مخاطب {contactFullname} را پاک کنی؟</p>
            <button onClick={() => {
              removeContact(contactId);
              onClose();
            }}
              className='mx-2 p-2 bg-deracula-PURPLE border rounded-md '>مطمعن هستم</button>
            <button className='bg-deracula-CURRENTLINE p-2 border border-deracula-PURPLE rounded-md' onClick={onClose}>انصراف</button>
          </div>
        )
      }
    })
  }




  /////////////////////////////////////برای حذف کردن/////////////////////////////////////////////////
  const removeContact = async (contactId) => {
    // Contacts Copy
    const contactsBackup = [...contacts];
    try {
      setContacts((draft) => draft.filter((c) => c.id !== contactId));
      setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId));

      // Sending delete request to server
      const { status } = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف گردید.")
      if (status !== 200) {
        setContacts(contactsBackup);
        setFilteredContacts(contactsBackup);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);
    }
  };
  ///////////////////////////////search//////////////////////////////////////////////////////////////////////////
  const contactSearch = _.debounce(
    (query) => {
      if (!query) return setFilteredContacts([...contacts]);

      // console.log(query);

      setFilteredContacts((draft) => draft.filter((contact) => {
        return contact.fullname
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase());
      }))

    }
    , 1000)



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      setContacts,
      contacts,
      filteredContacts,
      setFilteredContacts,
      groups,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch,

    }}>
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/contacts " />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/contacts/add' element={<AddContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>

      </div>
    </ContactContext.Provider>

  );
}

export default App;
