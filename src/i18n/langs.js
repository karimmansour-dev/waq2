export const locales = {
  en: {
    label: "English",
    dayjs: () => import("dayjs/locale/en"),
    flatpickr: null,
    fullcalendar: null,
    i18n: () => import("./locales/en/translations.json"),
    flag: "united-kingdom",
  },
  ar: {
    label: "Arabic",
    dayjs: () => import("dayjs/locale/ar"),
    flatpickr: () =>
      import("flatpickr/dist/l10n/ar").then((module) => module.Arabic),
    fullcalendar: () => import("@fullcalendar/core/locales/ar"),
    i18n: () => import("./locales/ar/translations.json"),
    flag: "saudi",
  },
};
