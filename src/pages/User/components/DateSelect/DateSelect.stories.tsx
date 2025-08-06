import type { StoryFn, Meta } from "@storybook/react-vite";
import DateSelect from "./DateSelect";
import { useState } from "react";

export default {
  title: "pages/User/components/DateSelect",
  component: DateSelect,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "date",
      description: "Selected date value",
    },
    onChange: {
      action: "dateChanged",
      description: "Callback when date changes",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Date selector component with separate dropdowns for day, month, and year",
      },
    },
  },
} as Meta<typeof DateSelect>;

const Template: StoryFn<typeof DateSelect> = (args) => (
  <div className='w-full max-w-2xl bg-white p-6'>
    <DateSelect {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  value: undefined,
};

export const WithPresetDate = Template.bind({});
WithPresetDate.args = {
  value: new Date(1990, 5, 15), // June 15, 1990
};

export const WithCurrentDate = Template.bind({});
WithCurrentDate.args = {
  value: new Date(),
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  value: undefined,
  errorMessage: "Vui lòng chọn ngày sinh hợp lệ",
};

export const Interactive: StoryFn<typeof DateSelect> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(1995, 2, 20));

  return (
    <div className='w-full max-w-2xl bg-white p-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold'>Chọn ngày sinh</h3>
        {selectedDate && (
          <p className='mt-2 text-sm text-gray-600'>Ngày đã chọn: {selectedDate.toLocaleDateString("vi-VN")}</p>
        )}
      </div>
      <DateSelect value={selectedDate} onChange={(date) => setSelectedDate(date)} />
    </div>
  );
};

export const WithValidation: StoryFn<typeof DateSelect> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [error, setError] = useState<string>("");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const now = new Date();
    if (date > now) {
      setError("Ngày sinh không thể ở tương lai");
    } else if (now.getFullYear() - date.getFullYear() < 13) {
      setError("Bạn phải ít nhất 13 tuổi");
    } else {
      setError("");
    }
  };

  return (
    <div className='w-full max-w-2xl bg-white p-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold'>Chọn ngày sinh (có validation)</h3>
        {selectedDate && !error && (
          <p className='mt-2 text-sm text-green-600'>
            Hợp lệ - Tuổi: {new Date().getFullYear() - selectedDate.getFullYear()}
          </p>
        )}
      </div>
      <DateSelect value={selectedDate} onChange={handleDateChange} errorMessage={error} />
    </div>
  );
};
