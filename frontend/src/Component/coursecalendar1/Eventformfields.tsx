import React from "react";

interface EventFormData {
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  notification: string;
  email: string;
  description: string;
}

interface EventFormFieldsProps {
  formData: EventFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb3bd]/50 focus:border-[#3bb3bd] text-gray-700 text-sm transition-all duration-150 bg-white placeholder:text-gray-400";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const notificationOptions = ["15 mins", "30 mins", "1 hour", "2 hours"];

export function EventFormFields({ formData, onChange }: EventFormFieldsProps) {
  return (
    <div className="space-y-5">
      {/* Event Name */}
      <div>
        <label className={labelClass}>Event Name</label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={onChange}
          placeholder="Enter event name"
          className={inputClass}
        />
      </div>

      {/* Start Date / End Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start Date / Time</label>
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            placeholder="e.g. September 24, 2024 07:59 am"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>End Date / Time</label>
          <input
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            placeholder="e.g. September 24, 2024 09:00 am"
            className={inputClass}
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className={labelClass}>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
          placeholder="Enter event location"
          className={inputClass}
        />
      </div>

      {/* Notification / Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Notification</label>
          <div className="relative">
            <select
              name="notification"
              value={formData.notification}
              onChange={onChange}
              className={`${inputClass} appearance-none pr-10 cursor-pointer`}
            >
              {notificationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Event Description */}
      <div>
        <label className={labelClass}>Event Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={5}
          placeholder="Describe your event..."
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>
    </div>
  );
}
