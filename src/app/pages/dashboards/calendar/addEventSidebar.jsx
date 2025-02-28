/* eslint-disable no-unused-vars */
// Import Dependencies
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Local Imports
import { schema } from "./schema";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Radio,
  RadioGroup,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { Delta, TextEditor } from "components/shared/form/TextEditor";
import { Button, Card, Input, Switch, Textarea } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  LinkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { TitleField } from "./titleField";
import { AssignsField } from "./AssignsField";
import { RadioField } from "./radioField";
import { Combobox } from "components/shared/form/Combobox";

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
        className="hide-scrollbar relative flex h-full w-full max-w-4xl flex-col overflow-y-auto bg-white p-4 transition-opacity duration-300 dark:bg-dark-700 sm:rounded-lg sm:px-5"
      >
        <div className="w-full flex-col gap-y-3">
          <DialogTitle
            as="h3"
            className="text-lg text-gray-800 dark:text-dark-100"
          >
            add new event
          </DialogTitle>
          <AddEventSidebarForm close={handleAddEventToggle} />
        </div>
      </TransitionChild>
    </Transition>
  );
};

const AddEventSidebarForm = ({ close }) => {
  const initialState = {
    id: "",
    url: "",
    title: "",
    start: new Date(),
    end: "",
    allDay: false,
    doctor: {},
    patient: {},
    status: "confirmed",
    type: "consultation",
    content: new Delta(),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const onSubmit = (data) => {
    console.log(data);
    toast("New Post Published. Now you can add new one", {
      invert: true,
    });
    reset();
    // close();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex grow flex-col"
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
                <AssignsField onChange={onChange} value={value} name={name} />
              )}
              control={control}
              name="doctor"
            />

            <Controller
              render={({ field: { onChange, value, name } }) => (
                <AssignsField onChange={onChange} value={value} name={name} />
              )}
              control={control}
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
            <Combobox
              data={statusOptions}
              displayField="label"
              error={errors?.status?.message}
              // value={selectedPage}
              // onChange={setSelectedPage}
              placeholder="Please Select Post"
              searchFields={["value"]}
              highlight
            />

            <Combobox
              data={typeOptions}
              error={errors?.type?.message}
              displayField="label"
              // value={selectedPage}
              // onChange={setSelectedPage}
              placeholder="Please Select Post"
              searchFields={["value"]}
              highlight
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <RadioField
                  error={errors?.status?.message}
                  options={statusOptions}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <RadioField
                  error={errors?.type?.message}
                  options={statusOptions}
                  {...field}
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
        <div className="flex flex-1 gap-3">
          {/* Start Date */}
          <Controller
            render={({ field }) => (
              <DatePicker
                label="start date:"
                placeholder="Choose start date..."
                options={{
                  dateFormat: "Y-m-d",
                }}
                {...field}
              />
            )}
            control={control}
            name="start"
          />
          {/* End Date */}

          <Controller
            render={({ field }) => (
              <DatePicker
                label="end date:"
                placeholder="Choose end date..."
                options={{
                  dateFormat: "Y-m-d",
                }}
                {...field}
              />
            )}
            control={control}
            name="end"
          />

          {/* All Day */}
          <Controller
            control={control}
            error={errors?.allDay?.message}
            name="allDay"
            render={({ field }) => (
              <Switch
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
        <div className="flex-1">
          <Controller
            control={control}
            {...register("content")}
            render={({ field: { value, onChange, ...rest } }) => (
              <TextEditor
                value={value}
                label="Content"
                onChange={(val) => onChange(val)}
                placeholder="Enter your content..."
                className="mt-1.5 [&_.ql-editor]:max-h-80 [&_.ql-editor]:min-h-[12rem]"
                modules={editorModules}
                error={errors?.content?.message}
                {...rest}
              />
            )}
          />
          {/* <Textarea
            {...register("description")}
            error={errors?.description?.message}
            placeholder="Task Description"
            label="Description:"
            component={TextareaAutosize}
            maxRows={8}
            minRows={4}
          /> */}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-between">
        <Button
          onClick={() => {
            // deleteTask(data.id)
            console.log("deleteTask");
          }}
          color="error"
          className="gap-2 md:min-w-[8rem]"
        >
          <TrashIcon className="size-4.5" />
          <div className="max-md:hidden">Delete</div>
        </Button>

        <div className="flex justify-end gap-4">
          <Button onClick={close} variant="flat" className="min-w-[8rem]">
            Cancel
          </Button>
          <Button type="submit" color="primary" className="min-w-[8rem]">
            Update Task
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddEventSidebar;
