import { Link } from "react-router-dom";
import useFetch from "../useFetch";


const formatDate = (dateString) => {
  if (!dateString) return "Date not available";
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    weekday: "short",   // Thu
    month: "short",     // Jul
    day: "numeric",     // 13
    year: "numeric",    // 2025
    hour: "2-digit",    // 7
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short", // IST
  });
};

export const MeetupEvents = ( { search, type, setType } ) => {
    // choose URL based on input 
    // ✅ Choose URL based on search and type
    let apiUrl = "https://mern-meetup-server.vercel.app/eventList";

    if ( search && search.trim() !== "" ) {
        // Search by title first
        apiUrl = `https://mern-meetup-server.vercel.app/events/title/${ search }` || `https://mern-meetup-server.vercel.app/events/tag/${ search }`;
    } else if ( type === "Online" || type === "Offline" ) {
        // Filter by event type
        apiUrl = `https://mern-meetup-server.vercel.app/events/${ type }`;
    } else if ( type === "Both" || type === "" ) {
        // Show all events

        apiUrl = "https://mern-meetup-server.vercel.app/eventList";
    }
    const { data, loading, error } = useFetch( apiUrl );

    return (
        <div>
            <section className="d-flex justify-content-between">
                <h2 className=" fw-semibold">Meetup Events</h2>
                <div className="">
                    <select
                        // value={ type }
                        onChange={ ( e ) => setType( e.target.value ) } className="form-control">
                        <option value="">Select event type</option>
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
                { Array.isArray( data ) && data.map( ( each ) => (
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
                                    <small className="text-muted d-block mb-1">{formatDate(each.startAt)}</small>
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