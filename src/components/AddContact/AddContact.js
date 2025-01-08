import { contactSchema } from "../../validations/contactValidation";
import { Link } from "react-router-dom";
import { Spiner } from "..";
import man from "../../assets/man-taking-note.png";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';



const AddContact = () => {

    const { loading, groups, createContact } = useContext(ContactContext);

    return (
        <>
            {loading ? (<Spiner />) : (
                <>
                    <section>
                        <div className="">
                            <p className="p-5 text-2xl font-extrabold text-deracula-GREEN" >ساخت مخاطب جدید</p>
                            <hr className="border-deracula-GREEN" />
                        </div>
                        <div className="flex flex-col justify-between mt-10 mx-5 lg:flex-row ">
                            <div className="w-full lg:mr-16 ">
                                <Formik
                                    initialValues={{
                                        fullname: '',
                                        photo: '',
                                        mobile: '',
                                        email: '',
                                        job: '',
                                        group: ''
                                    }
                                    }
                                    validationSchema={contactSchema}
                                    onSubmit={(values) => {
                                        // console.log(values);
                                        createContact(values);
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
                                        <div className="mt-5">
                                            <input
                                                type="submit"
                                                value="ساخت مخاطب"
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
                            <div>
                                <img src={man} className="opacity-50 m-10 lg:w-10/12" />
                            </div>
                        </div>

                    </section>

                </>
            )

            }
        </>
    )
}
export default AddContact;