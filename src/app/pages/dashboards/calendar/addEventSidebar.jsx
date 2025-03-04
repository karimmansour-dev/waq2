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
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { Delta, TextEditor } from "components/shared/form/TextEditor";
import { Button, Card, Input, InputErrorMsg, Switch } from "components/ui";
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

const statusOptions = [
  { value: "confirmed", label: "Confirmed", color: "success" },
  { value: "pending", label: "Pending", color: "info" },
  { value: "canceled", label: "Canceled", color: "warning" },
  { value: "postponed", label: "Postponed", color: "error" },
];

const typeOptions = [
  { value: "consultation", label: "Consultation", color: "primary" },
  { value: "control", label: "Control", color: "secondary" },
  { value: "emergency", label: "Emergency", color: "warning" },
  { value: "etc", label: "Other", color: "info" },
];

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

  const minuteIncrement = 15;

  const now = new Date(); // Get current time

  let currentMinutes = now.getMinutes();
  let nextInterval =
    Math.ceil(currentMinutes / minuteIncrement) * minuteIncrement;

  // Handle case where nextInterval is 60 (roll over to next hour)
  if (nextInterval === 60) {
    now.setHours(now.getHours() + 1);
    nextInterval = 0;
  }

  const start = new Date();
  start.setMinutes(nextInterval, 0, 0);
  const end = new Date(start.getTime() + minuteIncrement * 60 * 1000);

  const initialState = {
    id: "11",
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
    setFocus,
    watch,
    setValue,
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: initialState,
    mode: "onTouched", //onChange
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
      console.log(value);
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

  console.log(errors);

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
                render={({ field: { onChange, value, name } }) => (
                  <AssignsField
                    onChange={onChange}
                    value={value}
                    name={name}
                    error={errors?.status?.message}
                  />
                )}
                control={control}
                name="doctor"
              />

              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <AssignsField
                    onChange={onChange}
                    value={value}
                    name={name}
                    error={errors?.status?.message}
                  />
                )}
                control={control}
                {...register("patient")}
                name="patient"
              />
            </div>
          </div>
        </div>

        {/* Combobox */}
        <div className="mt-5 flex gap-3">
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
        </div>

        {/* RadioGroup */}
        <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <InformationCircleIcon className="size-6" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, value, name } }) => (
                  <RadioField
                    error={errors?.status?.message}
                    options={statusOptions}
                    onChange={(val) =>
                      handleStatusChange(onChange)({ value: val })
                    }
                    value={value}
                    name={name}
                  />
                )}
              />

              <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value, name } }) => (
                  <RadioField
                    error={errors?.type?.message}
                    options={typeOptions}
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
              />
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
              {" "}
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <DatePicker
                    label="start date:"
                    placeholder="Choose start date..."
                    name={name}
                    value={new Date(value)}
                    onChange={(_, dateStr) => onChange(dateStr)}
                    options={{
                      dateFormat: "Y-m-d H:i",
                      enableTime: true,
                    }}
                  />
                )}
                control={control}
                name="start"
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
                    onChange={(_, dateStr) => onChange(dateStr)}
                    options={{
                      dateFormat: "Y-m-d H:i",
                      enableTime: true,
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

            {/* All Day */}
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

        {/* URL */}
        <div className="mt-5 flex gap-3">
          <div className="pt-0.5">
            <LinkIcon className="size-6" />
          </div>
          <div className="flex-1">
            <Input
              {...register("url")}
              label="URL"
              error={errors?.url?.message}
              placeholder="Enter URL"
            />
          </div>
        </div>

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
              Update Evant
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
