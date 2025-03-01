import { Page } from "components/shared/Page";
import CalendarWrapper from "./calendarWrapper";

export default function Home() {
  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-[--margin-x] pt-5 lg:pt-6">
        <CalendarWrapper />
      </div>
    </Page>
  );
}
