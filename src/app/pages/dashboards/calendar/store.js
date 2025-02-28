import create from "zustand";
import { events } from "./events";

const useCalendarStore = create((set, get) => ({
  events: events,
  filteredEvents: events,
  selectedEvent: null,
  selectedCalendars: ["consultation", "emergency", "control", "etc"],

  // Helper function to filter events based on selected calendars
  filterEventsUsingCheckbox: (events, selectedCalendars) => { 
    return events.filter((event) =>
      selectedCalendars.includes(event.extendedProps?.calendar),
    );
  },

  // Actions
  filterEvents: () => {
    set((state) => ({ filteredEvents: state.events }));
  },

  filterCalendarLabel: (label) => {
    set((state) => {
      const index = state.selectedCalendars.indexOf(label);
      let updatedCalendars;

      if (index !== -1) {
        updatedCalendars = [...state.selectedCalendars];
        updatedCalendars.splice(index, 1);
      } else {
        updatedCalendars = [...state.selectedCalendars, label];
      }

      return {
        selectedCalendars: updatedCalendars,
        events: get().filterEventsUsingCheckbox(
          state.filteredEvents,
          updatedCalendars,
        ),
      };
    });
  },

  filterAllCalendarLabels: (selectAll) => {
    set((state) => {
      const updatedCalendars = selectAll
        ? ["consultation", "emergency", "control", "etc"]
        : [];
      return {
        selectedCalendars: updatedCalendars,
        events: get().filterEventsUsingCheckbox(
          state.filteredEvents,
          updatedCalendars,
        ),
      };
    });
  },

  addEvent: (newEvent) => {
    set((state) => {
      const eventId =
        parseInt(state.events[state.events.length - 1]?.id ?? "") + 1;
      const eventWithId = { ...newEvent, id: `${eventId}` };
      return { events: [...state.events, eventWithId] };
    });
  },

  updateEvent: (updatedEvent) => {
    set((state) => ({
      events: state.events.map((event) => {
        if (updatedEvent._def && event.id === updatedEvent._def.publicId) {
          return {
            id: event.id,
            url: updatedEvent._def.url,
            title: updatedEvent._def.title,
            allDay: updatedEvent._def.allDay,
            end: updatedEvent._instance.range.end,
            start: updatedEvent._instance.range.start,
            extendedProps: updatedEvent._def.extendedProps,
          };
        } else if (event.id === updatedEvent.id) {
          return updatedEvent;
        } else {
          return event;
        }
      }),
    }));
  },

  deleteEvent: (eventId) => {
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    }));
  },

  selectEvent: (event) => {
    set({ selectedEvent: event });
  },
}));

export default useCalendarStore;
