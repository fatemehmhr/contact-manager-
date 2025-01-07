import { useEffect, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from "../../validations/contactValidation";


import { getContact, updateContact } from "../../services/contactServices";
import { ContactContext } from "../../context/contactContext";

import {useImmer} from 'use-immer';

import {toast} from "react-toastify";






const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading, groups, setContacts, setFilteredContacts } = useContext(ContactContext);


  const [contact, setContact] = useImmer({});
  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //////////////////////////////////////////////////////////////////////////////
  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);

      if (status === 200) {
        toast.info("مخاطب با موفقیت ویرایش گردید.");
        setLoading(false);
        setContacts(draft => {
          const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId) );
          draft[contactIndex] = {...data}
        });
        setFilteredContacts(draft => {
          const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId) );
          draft[contactIndex] = {...data}
        });
        navigate("/contacts");

      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };






  return (
    <>
      {loading ? (<Spinner />) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold text-deracula-ORANGE">
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr className="text-deracula-ORANGE" />
              <div
                className="row p-2 w-75 mx-auto align-items-center mt-10"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-4 m-5">
                  <img
                    src={contact.photo}
                    className="border border-deracula-PURPLE m-auto"
                  />
                </div>
                <div className="col-md-8">
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      // console.log(values);
                      submitForm(values);
                    }}
                  >
                    <Form>
                      <div>
                        <Field
                          name="fullname"
                          type="text"
                          placeholder="نام و نام خانوادگی"
                          className="w-full pr-5 py-1 border mb-2"
                        />
                        <ErrorMessage name="fullname"
                          render={(msg) => (
                            <div className="text-deracula-RED">{msg}</div>
                          )}
                        />
                      </div>
                      <div>
                        <Field
                          name="photo"
                          type="text"
                          placeholder="ادرس تصویر"
                          className="w-full pr-5 py-1 border mb-2"
                        />
                        <ErrorMessage name="photo"
                          render={(msg) => (
                            <div className="text-deracula-RED">{msg}</div>
                          )}
                        />
                      </div>
                      <div>
                        <Field
                          name="mobile"
                          type="number"
                          placeholder="شماره موبایل"
                          className="w-full pr-5 py-1 border mb-2"
                        />
                        <ErrorMessage name="mobile"
                          render={(msg) => (
                            <div className="text-deracula-RED">{msg}</div>
                          )}
                        />
                      </div>
                      <div>
                        <Field
                          name="email"
                          type="email"
                          placeholder=" آدرس ایمیل"
                          className="w-full pr-5 py-1 border mb-2"
                        />
                        <ErrorMessage name="email"
                          render={(msg) => (
                            <div className="text-deracula-RED">{msg}</div>
                          )}
                        />
                      </div>
                      <div>
                        <Field
                          name='job'
                          type="text"
                          placeholder="شغل"
                          className="w-full pr-5 py-1 border mb-2"
                        />
                        <ErrorMessage
                          name="job"
                          render={(msg) => (
                            <div className="text-deracula-RED">{msg}</div>
                          )}

                        />
                      </div>
                      <div>
                        <Field
                          name="group"
                          as="select"
                          className="w-full pr-5 py-1 border text-deracula-FOREGROUND text-opacity-50 text-sm border-deracula-PURPLE mb-2 bg-deracula-CURRENTLINE appearance-none"
                        >
                          <option className="text-opacity-25 " >انتخاب گروه</option>
                          {
                            groups.length > 0 && groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))
                          }
                        </Field>
                        <ErrorMessage
                          name="group"
                          render={(msg) => (
                            <div className="text-deracula-RED">{msg}</div>
                          )}
                        />

                      </div>
                      <div>
                        <input
                          type="submit"
                          value="ویرایش مخاطب"
                          className="border rounded-md border-deracula-PURPLE bg-deracula-PURPLE p-1 "
                        />
                        <Link
                          to={"/contacts"}
                          className="bg-deracula-PINK py-1 px-2 border border-deracula-PINK rounded-md mr-5"
                        >
                          انصراف</Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>

        </>
      )

      }
    </>
  )
}
export default EditContact;