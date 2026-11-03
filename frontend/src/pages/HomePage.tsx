import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} />
      <p>
        <Link className="buton" to="/events">
          Tüm etkinlikleri gör
        </Link>
      </p>
    </>
  );
}
export default HomePage;