import { EventFormFields } from "./Eventformfields";
import { EventFormActions } from "./Eventformactions";

interface EventFormData {
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  notification: string;
  email: string;
  description: string;
}

interface EventFormProps {
  formData: EventFormData;
  isSubmitting: boolean;
  submitSuccess: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export function EventForm({
  formData,
  isSubmitting,
  submitSuccess,
  onChange,
  onSubmit,
  onCancel,
}: EventFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-white rounded-xl border border-gray-100 p-5 md:p-8 shadow-sm space-y-6"
    >
      <EventFormFields formData={formData} onChange={onChange} />
      <EventFormActions
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        onCancel={onCancel}
      />
    </form>
  );
}
