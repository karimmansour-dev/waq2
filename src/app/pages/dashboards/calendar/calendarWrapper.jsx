// Import Dependencies

import { useCallback, useEffect, useState } from "react";
// Local Imports

import Calendar from "./calendar";
import { useDidUpdate, useDisclosure } from "hooks";
import SidebarLeft from "./SidebarLeft";
import AddEventSidebar from "./addEventSidebar";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { Statistics } from "./Statistics";
import { CalendarHeader } from "./calendarHeader";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const CalendarWrapper = () => {
  // const calendarsColor = {
  //   consultation: "primary",
  //   control: "secondary",
  //   emergency: "warning",
  //   other: "info",
  // };

  // States
  const [calendarApi, setCalendarApi] = useState(null);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const { mdAndUp, mdAndDown, name } = useBreakpointsContext();

  const [isExpanded, { toggle, close, open }] = useDisclosure(true); //mdAndUp
  const handleAddEventToggle = () => setAddEventOpen(!addEventOpen);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Close Sidebar when Breakpoint changed
  useDidUpdate(() => {
    mdAndDown && close();
    mdAndUp && open();
  }, [name]);

  const handle = useFullScreenHandle();

  useEffect(() => {
    isFullScreen && handle.enter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen]);

  const handleFullScreen = useCallback(
    (state, h) => {
      if (h === handle && !state) setIsFullScreen(false);
    },
    [handle],
  );

  return (
    <FullScreen handle={handle} onChange={handleFullScreen}>
      <div className="flex flex-col">
        <CalendarHeader
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 my-[200px]">
          <SidebarLeft
            mdAbove={mdAndUp}
            calendarApi={calendarApi}
            // calendarsColor={calendarsColor}
            leftSidebarOpen={isExpanded}
            handleLeftSidebarToggle={toggle}
            handleAddEventToggle={handleAddEventToggle}
          />

          <Calendar
            calendarApi={calendarApi}
            setCalendarApi={setCalendarApi}
            // calendarsColor={calendarsColor}
            leftSidebarOpen={isExpanded}
            handleLeftSidebarToggle={toggle}
            handleAddEventToggle={handleAddEventToggle}
          />
        </div>
        <Statistics />

        <AddEventSidebar
          calendarApi={calendarApi}
          addEventOpen={addEventOpen}
          handleAddEventToggle={handleAddEventToggle}
        />
      </div>
    </FullScreen>
  );
};

export default CalendarWrapper;
