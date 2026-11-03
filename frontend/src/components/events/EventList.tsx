import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText }: EventListProps) {
  if (events.length === 0) {
    return <p id="sonuc" className="sonuc">{emptyText}</p>;
  }

  return (
    <section className="etkinlik-listesi kartlar">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;