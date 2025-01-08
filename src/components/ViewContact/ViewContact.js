import { useState, useEffect, useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Link, useParams } from "react-router-dom";
import { getContact, getGroup } from "../../services/contactServices";
import Spinner from "../Spinner/Spinner";

const ViewContact = () => {

    const { contactId } = useParams();

    // console.log(contactId);

    const [state, setState] = useState({
        contact: {},
        group: {}
    })

    const { loading, setLoading } = useContext(ContactContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactData } = await getContact(contactId);
                const { data: groupsData } = await getGroup(contactData.group);

                setLoading(false);
                setState({ ...state, contact: contactData, group: groupsData })

            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }

        }
        fetchData();
    }, [])

    const { contact, group } = state;



    return (
        <section>
            <div className="mb-5">
                <p className="text-deracula-FOREGROUND p-5">اطلاعات مخاطب</p>
                <hr />
            </div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <>
                        {Object.keys(contact).length > 0 && (
                            <section className="view-contact mt-e">
                                <div
                                    className="container p-2 bg-deracula-CURRENTLINE"
                                    style={{ borderRadius: "1em" }}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                            <img
                                                src={contact.photo}
                                                alt=""
                                                className="img-fluid rounded-md border border-deracula-PURPLE m-auto mb-5"
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <ul className="list-group mb-5">
                                                <li className="list-group-item list-group-item-dark">
                                                    نام و نام خانوادگی :{" "}
                                                    <span className="fw-bold">{contact.fullname}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    شماره موبایل :{" "}
                                                    <span className="fw-bold">{contact.mobile}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    ایمیل : <span className="fw-bold">{contact.email}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    شغل : <span className="fw-bold">{contact.job}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    گروه : <span className="fw-bold">{group.name}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <Link
                                                to={"/contacts"}
                                                className=" bg-deracula-PURPLE px-4 py-1 rounded-md"
                                            >
                                                برگشت به صفحه اصلی
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                    </>
                )
            }
        </section>
    )
}
export default ViewContact;