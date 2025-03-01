// Import Dependencies
import {
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Card } from "components/ui";

// ----------------------------------------------------------------------

export function Statistics() {
  const statistics = [
    {
      value: "$67.6k",
      label: "Consultation",
      color: "primary",
      icon: CurrencyDollarIcon,
    },
    {
      value: "618",
      label: "Control",
      color: "secondary",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      value: "46k",
      label: "Emergency",
      color: "warning",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      value: "8.8k",
      label: "Other",
      color: "warning",
      icon: ClipboardDocumentCheckIcon,
    },

    {
      value: "7.6k",
      label: "Completed",
      color: "secondary",
      icon: CheckBadgeIcon,
    },
    {
      value: "143",
      label: "Pending",
      color: "warning",
      icon: ExclamationTriangleIcon,
    },
  ];

  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-2">
        {statistics.map((stat, index) => (
          <Card key={index} className="p-3 lg:p-4">
            <div className="flex justify-between gap-1">
              <p className="text-xl font-semibold text-gray-800 dark:text-dark-100">
                {stat.value}
              </p>
              <stat.icon
                className={`this:${stat.color} size-5 text-this dark:text-this-light`}
              />
            </div>
            <p className="mt-1 text-xs+">{stat.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
