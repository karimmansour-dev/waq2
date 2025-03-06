/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { events } from "./events";
import {
  selectedEventViews,
  selectedStatuses,
  selectedTypes,
} from "constants/calendar.constant";

const date = new Date();
const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
const demo = [
  {
    id: "11",
    title: "Appointment",
    start: date,
    end: date,
    allDay: false,

    extendedProps: {
      type: "control",
      status: "confirmed",
      doctor: {
        uid: "1",
        name: "Dr. John Doe",
        avatar: "/images/200x200.png",
      },
      patient: {
        uid: "2",
        name: "Jane Smith 111",
        avatar: "/images/200x200.png",
      },
      content: "Follow-up appointment for routine checkup.",
    },
  },
  // {
  //   id: "12",
  //   title: "Appointment",
  //   start: nextDay,
  //   end: nextDay,
  //   allDay: false,

  //   extendedProps: {
  //     type: "emergency",
  //     status: "canceled",
  //     doctor: {
  //       uid: "1",
  //       name: "Dr. John Doe",
  //       avatar: "/images/200x200.png",
  //     },
  //     patient: {
  //       uid: "2",
  //       name: "Jane Smith 222",
  //       avatar: "/images/200x200.png",
  //     },
  //     content: "Follow-up appointment for routine checkup.",
  //   },
  // },
];
const useCalendarStore = create((set, get) => ({
  events: demo,
  filteredEvents: demo,
  selectedEvent: null,
  selectedEventViews,
  selectedTypes,
  selectedStatuses,
  globalFilter: "",

  // Helper function to filter events based on selected calendars and statuses
  filterEventsUsingCheckbox: (
    events,
    selectedTypes,
    selectedStatuses,
    globalFilter,
  ) => {
    return events.filter((event) => {
      // filter by selected type & status
      const matchesType = selectedTypes.includes(event.extendedProps?.type);
      const matchesStatus = selectedStatuses.includes(
        event.extendedProps?.status,
      );

      // apply global filter only if it's not empty
      let matchesGlobalFilter = true;
      if (globalFilter.trim()) {
        const lowercasedFilter = globalFilter.toLowerCase();
        const searchFields = ["title", "name"];

        matchesGlobalFilter = searchFields.some(
          (field) =>
            event[field] &&
            event[field].toLowerCase().includes(lowercasedFilter),
        );
        // matchesGlobalFilter = Object.values(event).some(
        //   (value) =>
        //     typeof value === "string" &&
        //     value.toLowerCase().includes(lowercasedFilter),
        // );
      }
      return matchesType && matchesStatus && matchesGlobalFilter;
    });
  },

  filterEvents: () => {
    set((state) => ({ filteredEvents: state.events }));
  },

  setGlobalFilter: (value) => {
    set((state) => ({
      globalFilter: value,
      events: get().filterEventsUsingCheckbox(
        state.filteredEvents,
        state.selectedTypes,
        state.selectedStatuses,
        value,
      ),
    }));
  },

  filterTypeLabel: (label) => {
    set((state) => {
      const index = state.selectedTypes.indexOf(label);
      let updatedTypes;

      if (index !== -1) {
        updatedTypes = [...state.selectedTypes];
        updatedTypes.splice(index, 1);
      } else {
        updatedTypes = [...state.selectedTypes, label];
      }

      return {
        selectedTypes: updatedTypes,
        events: get().filterEventsUsingCheckbox(
          state.filteredEvents,
          updatedTypes,
          state.selectedStatuses,
          state.globalFilter,
        ),
      };
    });
  },

  filterStatusLabel: (label) => {
    set((state) => {
      const index = state.selectedStatuses.indexOf(label);
      let updatedStatuses;

      if (index !== -1) {
        updatedStatuses = [...state.selectedStatuses];
        updatedStatuses.splice(index, 1);
      } else {
        updatedStatuses = [...state.selectedStatuses, label];
      }

      return {
        selectedStatuses: updatedStatuses,
        events: get().filterEventsUsingCheckbox(
          state.filteredEvents,
          state.selectedTypes,
          updatedStatuses,
          state.globalFilter,
        ),
      };
    });
  },

  filterEventViewLabel: (label) => {
    set((state) => {
      const index = state.selectedEventViews.indexOf(label);
      let updatedEventViews;

      if (index !== -1) {
        updatedEventViews = [...state.selectedEventViews];
        updatedEventViews.splice(index, 1);
      } else {
        updatedEventViews = [...state.selectedEventViews, label];
      }

      return {
        selectedEventViews: updatedEventViews,
      };
    });
  },

  filterAllTypeLabels: (selectAll) => {
    set((state) => {
      const updatedTypes = selectAll
        ? ["consultation", "emergency", "control", "etc"]
        : [];
      return {
        selectedTypes: updatedTypes,
        events: get().filterEventsUsingCheckbox(
          state.filteredEvents,
          updatedTypes,
          state.selectedStatuses,
          state.globalFilter,
        ),
      };
    });
  },

  // filterAllStatusLabels: (selectAll) => {
  //   set((state) => {
  //     const updatedStatuses = selectAll
  //       ? ["confirmed", "pending", "canceled", "postponed"]
  //       : [];
  //     return {
  //       selectedStatuses: updatedStatuses,
  //       events: get().filterEventsUsingCheckbox(
  //         state.filteredEvents,
  //         state.selectedTypes,
  //         updatedStatuses,
  //          state.globalFilter,
  //
  //       ),
  //     };
  //   });
  // },

  // Actions
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
