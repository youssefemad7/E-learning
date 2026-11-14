import { Button } from "../ui/button";

interface EventFormActionsProps {
  isSubmitting: boolean;
  submitSuccess: boolean;
  onCancel?: () => void;
}

export function EventFormActions({
  isSubmitting,
  submitSuccess,
  onCancel,
}: EventFormActionsProps) {
  const label = isSubmitting
    ? "Saving..."
    : submitSuccess
      ? "Saved!"
      : "Save Now";

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
      {onCancel && (
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="w-full sm:w-auto text-gray-500 hover:text-gray-700 px-8"
        >
          Cancel
        </Button>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || submitSuccess}
        className={`w-full sm:w-auto px-12 py-3 rounded-full font-medium transition-all duration-200 shadow-sm
          ${
            submitSuccess
              ? "bg-green-500 hover:bg-green-500 text-white"
              : "bg-[#3bb3bd] hover:bg-[#2d9ca6] active:scale-95 text-white"
          }
          disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {submitSuccess && (
          <svg
            className="w-4 h-4 mr-1.5 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {label}
      </Button>
    </div>
  );
}
