import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Header } from "./Header";

export const DetailsEvent = () => {
    const { data, loading, error } = useFetch(
        "https://mern-meetup-server.vercel.app/eventList"
    );

    { loading && <p>Loading...</p> }
    { error && <p>Database error</p> }

    const { eventId } = useParams();
    const findDataById = data?.find( ( each ) => each._id == eventId );
    console.log( findDataById );

    return (
        <div className='container bg-color'>
            <Header />
            <hr />
            <section>
                { findDataById ? (
                    <div>
                        <div>
                            <h2 className="display-5 fw-normal">{ findDataById.title }</h2>
                            <p>Hosted By:</p>
                            <small className="fw-bold">{ findDataById.organizer }</small>
                            <br /><pre />
                            <img
                                src={ findDataById.thumbnail }
                                alt={ findDataById.title }
                                className="img-fluid rounded"
                                style={ { width: "400px", height: "300px" } }
                            />
                            <p></p>
                            <h3 className="fw-semibold"><strong>Details</strong></h3>
                            <p className="w-50  text-secondary py-3">{ findDataById.description }</p>
                            <h3 className="fw-bold">Additional Information:</h3>
                            <p><strong>Dress Code:</strong> { findDataById.dressCode }</p>
                            <p><strong>Age Restrictions:</strong> { findDataById.ageRestrication }</p>
                            <br />
                            <h3><strong>Event Tags:</strong></h3>
                            <br />
                            { findDataById.tags.map( each => (
                                <button key={ each } type="button" className="py-1 m-1  btn btn-danger">{ each }</button>
                            ) ) }
                        </div>
                        <div>
                            <div className="card shadow-lg p-4">
                                ⌚
                                <small className="text-secondary">{ findDataById.startAt }</small>
                                <small className="text-secondary">{ findDataById.endAt }</small>
                                <br />🔍
                                <small className="text-secondary">{ findDataById.venue.name }</small>
                                <small className="text-secondary">{ `${ findDataById.venue.address }, ${ findDataById.venue.city }, ${ findDataById.venue.country }` }</small>
                                <br />
                                <p>₹ { findDataById.price }</p>
                            </div>
                            <br />
                            <h3><strong>Speakers: ({ findDataById.speakers.length })</strong></h3>
                            <pre></pre>
                            <div className="row g-3">
                                { findDataById.speakers.map( ( each ) => (
                                    <div key={ each._id } className="col-md-6 text-center">
                                        <div className="card h-100  w-100 shadow-sm">
                                            <div className="align-item-center py-2">
                                                <img src="https://placehold.co/100" className="rounded-circle img-fluid"
                                                    style={ { width: "150px", height: "150px" } }
                                                />
                                            </div>
                                            <div className="card-body">
                                                <h4 className="fw-bold">{ each.name }</h4>
                                                <p>{ each.role }</p>
                                            </div>
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>{ loading && <p>Loading...</p> }</div>
                ) }
            </section>
        </div>
    );
};
