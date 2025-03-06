/* eslint-disable no-unused-vars */
// Import Dependencies

import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

// Local Imports

import Calendar from "./calendar";
import { useDidUpdate, useDisclosure } from "hooks";
import SidebarLeft from "./SidebarLeft";
import AddEventSidebar from "./addEventSidebar";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { Statistics } from "./Statistics";
import { CalendarHeader } from "./calendarHeader";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import AppFullCalendar from "./appFullCalendar";
import SimpleBar from "simplebar-react";

const CalendarWrapper = () => {
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
    <FullScreen handle={handle} onChange={handleFullScreen} className="w-full">
      <div className="flex flex-col">
        <CalendarHeader
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />

        <div className="mb-[200px] flex w-full flex-1 gap-x-1">
          <SidebarLeft
            mdAbove={mdAndUp}
            calendarApi={calendarApi}
            // calendarsColor={calendarsColor}
            leftSidebarOpen={isExpanded}
            handleLeftSidebarToggle={toggle}
            handleAddEventToggle={handleAddEventToggle}
          />

          <AppFullCalendar className="border-2 border-primary-300 p-1">
            <Calendar
              calendarApi={calendarApi}
              setCalendarApi={setCalendarApi}
              // calendarsColor={calendarsColor}
              leftSidebarOpen={isExpanded}
              handleLeftSidebarToggle={toggle}
              handleAddEventToggle={handleAddEventToggle}
            />
          </AppFullCalendar>
        </div>

        {/* <Statistics />
        <br />
        <br />
        <br />
        <br /> */}

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
