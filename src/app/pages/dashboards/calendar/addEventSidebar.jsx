/* eslint-disable no-unused-vars */
// Import Dependencies
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

// Local Imports
import { schema } from "./schema";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Label,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { Delta, TextEditor } from "components/shared/form/TextEditor";
import { Button, Card, Input, InputErrorMsg, Switch, Tag } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  LinkIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { TitleField } from "./titleField";
import { AssignsField } from "./AssignsField";
import { RadioField } from "./radioField";
import { Combobox } from "components/shared/form/Combobox";
import SimpleBar from "simplebar-react";
import useCalendarStore from "./store";
import { ConfirmModal } from "components/shared/ConfirmModal";
import { useDisclosure } from "hooks";
import {
  allowSaturday,
  allowSunday,
  closingTime,
  minuteIncrement,
  openingTime,
  statusOptions,
  dayPartsOptions,
  typeOptions,
} from "constants/calendar.constant";
import { calculateStartAndEndTimes } from "utils/calculateStartAndEndTimes";
import { adjustFlatpickrMinutes } from "utils/adjustFlatpickrMinutes";
import { TimeRadioField } from "./timeRadioField";
import generateTimeSlots from "utils/generateTimeSlots";

// ----------------------------------------------------------------------

const editorModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }, "image"],
    ["clean"], // remove formatting button
  ],
  clipboard: {
    matchVisual: false,
  },
};

const AddEventSidebar = ({ addEventOpen, handleAddEventToggle }) => {
  return (
    <Transition
      appear
      show={addEventOpen}
      as={Dialog}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
      onClose={handleAddEventToggle}
    >
      <TransitionChild
        as="div"
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40"
      />

      <TransitionChild
        as={DialogPanel}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="relative flex h-full w-full max-w-4xl flex-col overflow-y-auto bg-white p-4 transition-opacity duration-300 dark:bg-dark-700 sm:rounded-lg sm:px-5"
      >
        <SimpleBar className="h-full">
          <div className="w-full flex-col gap-y-3">
            <DialogTitle
              as="h3"
              className="text-lg text-gray-800 dark:text-dark-100"
            >
              add new event
            </DialogTitle>

            <AddEventSidebarForm close={handleAddEventToggle} />
          </div>
        </SimpleBar>
      </TransitionChild>
    </Transition>
  );
};

const AddEventSidebarForm = ({ close }) => {
  const { selectedEvent, addEvent, updateEvent, filterEvents, deleteEvent } =
    useCalendarStore();

  const { extendedProps, ...rest } = selectedEvent || {};

  //Confirm Modal
  const [isOpen, { open, close: Mclose }] = useDisclosure();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const state = error ? "error" : success ? "success" : "pending";
  const [pendingData, setPendingData] = useState(null);

  const messages = {
    pending: {
      Icon:
        pendingData === "canceled"
          ? XCircleIcon
          : pendingData
            ? TrashIcon
            : ExclamationTriangleIcon,
      title: "Are you sure?",
      description:
        pendingData === "canceled"
          ? "Are you sure you want to change the status to canceled?"
          : "Are you sure you want to delete this record? Once deleted, it cannot be restored.",
      actionText: pendingData === "canceled" ? "Change Status" : "Delete",
    },
    success: {
      title: pendingData === "canceled" ? "Status Changed" : "Record Deleted",
    },
    error: {
      description:
        "Ensure internet is on and retry. Contact support if issue remains.",
    },
  };

  const { start, end } = calculateStartAndEndTimes(new Date(), minuteIncrement);
  const timeSlotsOptions = generateTimeSlots(
    new Date(),
    openingTime,
    closingTime,
    minuteIncrement,
    allowSaturday,
    allowSunday,
  );

  const initialState = {
    url: "",
    title: "",
    start,
    end,
    allDay: false,
    doctor: null,
    // {
    //   uid: "1",
    //   name: "John Doe",
    //   avatar: null,
    // },
    patient: null,
    // {
    //   uid: "1",
    //   name: "John Doe",
    //   avatar: null,
    // },
    timeSlot: "2025-03-05T17:00:00.000Z",
    oldOrder: 20,
    order: 22,
    dayPart: "afternoon",
    status: extendedProps?.status || "confirmed",
    type: extendedProps?.type || "control",
    content: new Delta(),
    ...rest,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    values,
    getValues,
    setFocus,
    watch,
    setValue,
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: initialState,
    mode: "onChange", //onTouched
    resolver: (values, context, options) => {
      console.log("values: ", values);

      // console.log("allDay");
      // console.log(values.allDay);

      // you can return the schema based on context.
      // for my use case, I can depend on formValues
      // const isSomeCondition = values.someValue === someValue;
      const createResolver = yupResolver(schema);
      return createResolver(values, context, options);
    },
  });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const onSubmit = (data) => {
    console.log("data");
    console.log(data);

    toast("New Event Published. Now you can add new one", {
      invert: true,
    });

    if (!selectedEvent) {
      addEvent(data);
    } else {
      updateEvent(data, { id: initialState.id });
    }

    filterEvents();

    //reset();
    close();
  };

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      console.log("watch: ", value);
    });
    return () => unsubscribe();
  }, [watch]);

  const handleDeleteButtonClick = (id) => {
    setPendingData(id);
    open();
  };

  const handleStatusChange =
    (onChange) =>
    ({ value }) => {
      if (value === "canceled") {
        setPendingData("canceled");
        open();
      } else {
        onChange(value);
      }
    };

  const handleConfirm = () => {
    setConfirmLoading(true);
    new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(); //Math.random() > 0.5 ? resolve() : reject();
      }, 5000),
    )
      .then(() => {
        setConfirmLoading(false);
        setError(false);
        setSuccess(true);

        if (pendingData === "canceled") {
          setValue("status", "canceled");
        } else {
          deleteEvent(pendingData);
          filterEvents();
        }
      })
      .catch(() => {
        setConfirmLoading(false);
        setSuccess(false);
        setError(true);
      })
      .finally(() => {
        // setConfirmLoading(false);
        // setSuccess(false);
        // setError(false);
      });
  };

  console.log("errors: ", errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex grow flex-col gap-y-3"
      >
        <div className="flex gap-3">
          <div className="pt-1">
            <CheckCircleIcon className="size-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <TitleField
                register={register}
                error={errors?.title?.message}
                listName={"..."}
              />
              <Button onClick={close} className="px-3 py-1.5 text-xs">
                ESC
              </Button>
            </div>
          </div>
        </div>

        {/* Full Nam */}
        <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <InformationCircleIcon className="size-6" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
              <Controller
                control={control}
                name="doctor"
                render={({ field: { onChange, value, name } }) => (
                  <AssignsField
                    onChange={onChange}
                    value={value}
                    name={name}
                    error={errors?.doctor?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="patient"
                render={({ field: { onChange, value, name } }) => (
                  <AssignsField
                    onChange={onChange}
                    value={value}
                    name={name}
                    error={errors?.patient?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Combobox */}
        {/* <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <InformationCircleIcon className="size-6" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Combobox
                      onChange={handleStatusChange(onChange)}
                      value={statusOptions.find((opt) => opt.value === value)}
                      data={statusOptions}
                      displayField="label"
                      error={errors?.status?.message}
                      placeholder="Please Select Post"
                      searchFields={["value"]}
                      highlight
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => (
                  <Combobox
                    onChange={({ value }) => onChange(value)}
                    value={typeOptions.find((opt) => opt.value === value)}
                    data={typeOptions}
                    error={errors?.type?.message}
                    displayField="label"
                    placeholder="Please Select Post"
                    searchFields={["value"]}
                    highlight
                  />
                )}
              />
            </div>
          </div>
        </div> */}

        {/* RadioGroup */}
        <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <InformationCircleIcon className="size-6" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-3">
                <label>Status: </label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value, name } }) => (
                    <RadioField
                      options={statusOptions}
                      onChange={(val) =>
                        handleStatusChange(onChange)({ value: val })
                      }
                      value={value}
                      name={name}
                    />
                  )}
                />
                <InputErrorMsg when={errors?.status?.message}>
                  {errors?.status?.message}
                </InputErrorMsg>
              </div>

              <div className="flex flex-col gap-y-3">
                <label>type: </label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field: { onChange, value, name } }) => (
                    <RadioField
                      options={typeOptions}
                      onChange={onChange}
                      value={value}
                      name={name}
                    />
                  )}
                />

                <InputErrorMsg when={errors?.type?.message}>
                  {errors?.type?.message}
                </InputErrorMsg>
              </div>
            </div>
          </div>
        </div>

        {/* date */}
        <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <LinkIcon className="size-6" />
          </div>
          <div className="flex flex-1 items-center justify-around">
            {/* Start Date */}

            <div className="flex flex-col gap-y-3">
              <Controller
                control={control}
                name="start"
                render={({ field: { onChange, value, name } }) => (
                  <DatePicker
                    label="start date:"
                    placeholder="Choose start date..."
                    name={name}
                    value={new Date(value)}
                    onChange={(_, dateStr) => onChange(dateStr)}
                    // options={{
                    //   dateFormat: "Y-m-d",
                    // }}
                  />
                )}
              />
              <InputErrorMsg when={errors?.start?.message}>
                {errors?.start?.message}
              </InputErrorMsg>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-y-3">
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <DatePicker
                    label="end date:"
                    placeholder="Choose end date..."
                    name={name}
                    value={new Date(value)}
                    onChange={(_, dateStr, instance) => {
                      // adjustFlatpickrMinutes(_, dateStr, instance);
                      onChange(dateStr);
                    }}
                    options={{
                      dateFormat: "Y-m-d H:i",
                      enableTime: true,
                      // noCalendar: true,
                      minuteIncrement,
                    }}
                  />
                )}
                control={control}
                name="end"
              />

              <InputErrorMsg when={errors?.end?.message}>
                {errors?.end?.message}
              </InputErrorMsg>
            </div>
          </div>
        </div>

        {/* All Day */}
        <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <LinkIcon className="size-6" />
          </div>
          <div className="flex-1">
            <Controller
              control={control}
              error={errors?.allDay?.message}
              name="allDay"
              render={({ field }) => (
                <Switch
                  classNames={{ label: "flex flex-col" }}
                  {...field}
                  label="All Day"
                  error={errors?.allDay?.message}
                />
              )}
            />
          </div>
        </div>

        {/* timeSlot */}
        {!watch("allDay") && (
          <div className="mt-5 flex gap-3">
            <div className="pt-0.5">
              <LinkIcon className="size-6" />
            </div>
            <div className="flex-1">
              <Controller
                control={control}
                name="timeSlot"
                render={({ field: { onChange, value, name } }) => (
                  <TimeRadioField
                    error={errors?.status?.timeSlot}
                    options={timeSlotsOptions}
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
              />
            </div>
          </div>
        )}

        {/* day Part and order */}
        {watch("allDay") && (
          <>
            <div className="mt-5 flex gap-3">
              <div className="pt-0.5">
                <LinkIcon className="size-6" />
              </div>
              <div className="flex-1">
                <label>day Part :</label>
                <Controller
                  control={control}
                  name="dayPart"
                  render={({ field: { onChange, value, name } }) => (
                    <RadioField
                      options={dayPartsOptions}
                      onChange={onChange}
                      value={value}
                      name={name}
                    />
                  )}
                />

                <InputErrorMsg when={errors?.dayPart?.message}>
                  {errors?.end?.message}
                </InputErrorMsg>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <div className="pt-0.5">
                <LinkIcon className="size-6" />
              </div>
              <div className="flex-1">
                <div className="flex h-14 items-center justify-between space-x-3 py-3 rtl:space-x-reverse">
                  <h2 className="truncate font-medium tracking-wide text-gray-800 dark:text-dark-100 lg:text-base">
                    {"Order"}
                  </h2>
                </div>

                <div className="max-w-2xl">
                  The order component is used to separate long sets of data so
                  that it is easier for a user to consume information. Depending
                  on the length provided, the pagination component will
                  automatically scale.
                  <div className="inline-flex space-x-2 pl-2">
                    <div className="inline-flex">
                      <Tag
                        href="#"
                        className="ltr:rounded-r-none rtl:rounded-l-none"
                      >
                        already
                      </Tag>
                      <Tag
                        href="#"
                        color="primary"
                        className="ltr:rounded-l-none rtl:rounded-r-none"
                      >
                        {getValues("order")}
                      </Tag>
                    </div>

                    <div className="flex flex-col">
                      <Input
                        className="w-full"
                        type="number"
                        {...register("order", { valueAsNumber: true })}
                        error={errors?.order?.message}
                        classNames={{
                          root: "flex flex-row items-center gap-x-4",
                        }}
                        placeholder="Enter order"
                      />
                      <input
                        type="hidden"
                        {...register("oldOrder", { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Content */}
        <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <DocumentTextIcon className="size-6" />
          </div>
          <div className="flex-1 flex-col pr-5">
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <TextEditor
                  // value={value}
                  label="Content"
                  onChange={(val) => onChange(val)}
                  component={TextareaAutosize}
                  minRows={4}
                  maxRows={12}
                  placeholder="Enter your content..."
                  modules={editorModules}
                  error={errors?.content?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-between">
          {initialState?.id && (
            <Button
              onClick={() => handleDeleteButtonClick(initialState.id)}
              color="error"
              className="gap-2 md:min-w-[8rem]"
            >
              <TrashIcon className="size-4.5" />
              <div className="max-md:hidden">Delete</div>
            </Button>
          )}

          <div className="flex justify-end gap-4">
            <Button onClick={close} variant="flat" className="min-w-[8rem]">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              className="min-w-[8rem]"
              disabled={!isValid}
            >
              {initialState?.id ? "Update Evant" : "add"}
            </Button>
          </div>
        </div>
      </form>
      <ConfirmModal
        show={isOpen}
        onClose={() => {
          setPendingData(null);
          Mclose();
          setSuccess(false);
          setError(false);
        }}
        messages={messages}
        onOk={handleConfirm}
        confirmLoading={confirmLoading}
        state={state}
      />
    </>
  );
};

export default AddEventSidebar;
