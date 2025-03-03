import { create } from "zustand";
import { events } from "./events";

const useCalendarStore = create((set, get) => ({
  events: events,
  filteredEvents: events,
  selectedEvent: null,
  selectedTypes: ["consultation", "emergency", "control", "etc"],
  selectedStatuses: ["confirmed", "pending", "canceled", "postponed"],
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
