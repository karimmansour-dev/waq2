import { Page } from "components/shared/Page";
import CalendarWrapper from "./calendarWrapper";
import AppFullCalendar from "./appFullCalendar";

export default function Home() {
  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-[--margin-x] pt-5 lg:pt-6">
        <AppFullCalendar>
          <CalendarWrapper />
        </AppFullCalendar>
      </div>
    </Page>
  );
}
