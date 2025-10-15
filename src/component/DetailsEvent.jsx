import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

export const DetailsEvent = ({ search }) => {
  const { eventId } = useParams();

  // ✅ Determine correct API URL
  let apiUrl = "";
  if (search && search.trim() !== "") {
    apiUrl = `https://mern-meetup-server.vercel.app/events/title/${search}`;
  } else if (eventId) {
    apiUrl = `https://mern-meetup-server.vercel.app/events/details/${eventId}`;
  } else {
    apiUrl = "https://mern-meetup-server.vercel.app/eventList";
  }

  const { data, loading, error } = useFetch(apiUrl);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-4">Database error</p>;

  // ✅ Normalize data shape
  const event = Array.isArray(data) ? data[0] : data;

  if (!event) return <p className="text-center mt-4 text-danger">No event found.</p>;

  return (
    <div className="container bg-color py-4">
      <section className="row g-4 mt-3">
        <div className="col-lg-8">
          <h2 className="display-6 fw-semibold mb-2">{event.title}</h2>
          <p className="text-muted mb-1">Hosted By:</p>
          <h6 className="fw-bold mb-3">{event.organizer}</h6>

          <div className="mb-4 position-relative">
            <img
              src={event.thumbnail || "https://placehold.co/600x350"}
              alt={event.title}
              className="img-fluid rounded shadow-sm w-100"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
            <span
              className="badge bg-info text-dark position-absolute top-0 start-0 m-3"
              style={{ borderRadius: "50px", padding: "8px 15px", zIndex: 10 }}
            >
              {event.type || "General"}
            </span>
          </div>

          <h3 className="fw-semibold mt-3 mb-2">Details</h3>
          <p className="text-secondary py-3" style={{ maxWidth: "85%" }}>
            {event.description}
          </p>

          <h3 className="fw-bold">Additional Information:</h3>
          <p>
            <strong>Dress Code:</strong> {event.dressCode || "Casual"}
          </p>
          <p>
            <strong>Age Restrictions:</strong> {event.ageRestrication || "All ages"}
          </p>

          <h3 className="mt-4">
            <strong>Event Tags:</strong>
          </h3>
          {event.tags?.length ? (
            event.tags.map((tag, i) => (
              <button key={i} className="btn btn-danger m-1 py-1 px-3">
                {tag}
              </button>
            ))
          ) : (
            <p className="text-muted">No tags available</p>
          )}
        </div>

        {/* ===== Right: Venue + Speakers ===== */}
        <div className="col-lg-4">
          <div className="card shadow-lg p-4">
            ⌚
            <small className="text-secondary d-block">
              {event.startAt} - {event.endAt}
            </small>
            🔍
            <small className="text-secondary d-block">
              {event.venue?.name || "Online"}
            </small>
            <small className="text-secondary d-block">
              {event.venue
                ? `${event.venue.address}, ${event.venue.city}, ${event.venue.country}`
                : "No venue info"}
            </small>
            <p className="fw-bold mt-3">₹ {event.price || "Free"}</p>
          </div>

          <h3 className="mt-4">
            <strong>Speakers: ({event.speakers?.length || 0})</strong>
          </h3>
          <div className="row g-3">
            {event.speakers?.length ? (
              event.speakers.map((sp, idx) => (
                <div key={idx} className="col-md-6 text-center">
                  <div className="card h-100 shadow-sm">
                    <div className="py-2">
                      <img
                        src={sp.imgUrl || "https://placehold.co/150"}
                        alt={sp.name}
                        className="rounded-circle img-fluid"
                        style={{ width: "120px", height: "120px" }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="fw-bold">{sp.name}</h5>
                      <p>{sp.role}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No speakers available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
