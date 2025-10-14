import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Header } from "./Header";

export const DetailsEvent = () => {
    const { data, loading, error } = useFetch(
        "https://mern-meetup-server.vercel.app/eventList"
    );
    const { eventId } = useParams();
    const findDataById = data?.find( ( each ) => each._id == eventId );
    // console.log( findDataById );
    if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-4">Database error</p>;

    return (
        <div className='container bg-color py-4'>
            <Header />
            <hr />
            <section>
                { findDataById ? (
                    <section className="row g-4 mt-3">
                    {/* Left section: event details */}
                        <div className="col-lg-8">
                            <h2 className="display-6 fw-semibold mb-2">{ findDataById.title }</h2>
                            <p className="text-muted mb-1">Hosted By:</p>
                            <h6 className="fw-bold mb-3">{ findDataById.organizer }</h6>

                            <div className="mb-4">
                            <img
                                src={ findDataById.thumbnail }
                                alt={ findDataById.title }
                                className="img-fluid rounded shadow-sm w-100"
                                style={ { maxHeight: "350px", objectFit: "cover" } }
                            />
                            </div>

                            <h3 className="fw-semibold mt-3 mb-2"><strong>Details</strong></h3>

                            <p className="text-secondary py-3" style={{maxWidth: "85%"}}>{ findDataById.description }</p>

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

                        <div className="col-lg-4">
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
                    </section>
                ) : (
                    <div>{ loading && <p>Loading...</p> }</div>
                ) }
            </section>
        </div>
    );
};
