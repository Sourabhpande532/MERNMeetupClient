import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";

export const MeetupEvents = () => {
    const [type,setType] = useState("Both");
    const { data, loading, error } = useFetch( "https://mern-meetup-server.vercel.app/eventList" );
    const {data:modeData} = useFetch(`http://localhost:4000/events/${type}`)
    const filterList = type === "Both" ? data : modeData;
    return (
        <div>
            <section className="d-flex justify-content-between">
                <h2 className=" fw-semibold">Meetup Events</h2>
                <div className="">
                    <select onChange={ ( e ) => setType( e.target.value ) } className="form-control">
                        <option value=''>Select event type</option>
                        <option>Online</option>
                        <option>Offline</option>
                        <option>Both</option>
                    </select>
                </div>
            </section>
            <pre></pre>

            { loading && <p>Loading...</p> }
            { error && <p>Error occured</p> }

            <section className="row g-4">
                { Array.isArray( filterList ) && filterList?.map( ( each ) => (
                    <div key={ each._id } className="col-md-4">
                        <Link to={ `/details/${ each._id }` }
                            className="text-decoration-none text-dark"
                        >
                            <div className="card h-100 shadow-sm position-relative overflow-hidden">
                                <div className="position-relative">
                                    <img
                                        src={ each.thumbnail } className="card-img-top img-fluid rounded-top"
                                        alt={ each.title }
                                        style={ { height: "200px", objectFit: "cover" } }
                                    />
                                    {/* round badge */ }
                                    <span
                                        className="position-absolute top-0 start-0 translate-middle-y ms-3 mt-3 px-3 py-1 rounded-pill text-dark fw-semibold shadow"
                                        style={ {
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(6px)",
                                            border: "1px solid rgba(0,0,0,0.1)",
                                            zIndex: 2,
                                            fontSize: "0.85rem",
                                        } }
                                    >
                                        { each.type }
                                    </span>

                                </div>
                                {/* img-batch section */ }
                                <div className="card-body">
                                    <small className="text-muted d-block mb-1">{ each.startAt }</small>
                                    <p className="fw-semibold mb-1">{ each.title }</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ) ) }

            </section>
        </div>
    )
}