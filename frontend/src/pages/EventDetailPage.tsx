import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";

function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2>{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}
export default EventDetailPage;