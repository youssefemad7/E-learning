import { useState } from "react";
import { CourseLayout } from "../Component/coursecalendar2/course-layout";
import { PageHeader } from "../Component/coursecalendar1/Pageheader";
import { EventForm } from "../Component/coursecalendar1/Eventform";

interface EventFormData {
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  notification: string;
  email: string;
  description: string;
}

const DEFAULT_FORM: EventFormData = {
  eventName: "Adobe XD Auto - Animate : Your Guide to Creating",
  startDate: "September 24, 2017 07:59 am",
  endDate: "September 24, 2017 07:59 am",
  location: "2118 Thornridge Cir, Syracuse, Connecticut 35624",
  notification: "30 mins",
  email: "jessica.hansome@example.com",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export default function CourseCalendar1() {
  const [formData, setFormData] = useState<EventFormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Event saved:", formData);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData(DEFAULT_FORM);
  };

  return (
    <CourseLayout>
      <div className="max-w-8xl w-full">
        <PageHeader
          title="Create New Event"
          description="Fill in the details below to schedule and publish your course event."
        />

        <EventForm
          formData={formData}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </CourseLayout>
  );
}
