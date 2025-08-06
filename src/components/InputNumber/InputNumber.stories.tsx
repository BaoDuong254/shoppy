import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import InputNumber from "./InputNumber";

const meta: Meta<typeof InputNumber> = {
  title: "Components/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    errorMessage: {
      control: "text",
      description: "Thông báo lỗi hiển thị dưới input",
    },
    classNameInput: {
      control: "text",
      description: "CSS classes cho input",
    },
    classNameError: {
      control: "text",
      description: "CSS classes cho thông báo lỗi",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Trạng thái vô hiệu hóa",
    },
  },
};

export default meta;

const Template: StoryFn<typeof InputNumber> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className='w-80'>
      <InputNumber {...args} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

const TemplateControlled: StoryFn<typeof InputNumber> = (args) => (
  <div className='w-80'>
    <InputNumber {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Nhập số",
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: "Nhập số lượng",
  errorMessage: "Số lượng không hợp lệ",
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  placeholder: "Nhập số",
  value: "123",
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Không thể nhập",
  disabled: true,
  value: "999",
};

export const CustomStyles = TemplateControlled.bind({});
CustomStyles.args = {
  placeholder: "Input số với style tùy chỉnh",
  classNameInput:
    "p-4 w-full outline-none border-2 border-green-300 focus:border-green-500 rounded-lg focus:shadow-lg text-center",
  classNameError: "mt-2 text-green-600 text-base font-medium",
};

export const WithLongError = Template.bind({});
WithLongError.args = {
  placeholder: "Nhập số",
  errorMessage: "Số lượng phải là số nguyên dương và không được vượt quá 999 sản phẩm trong giỏ hàng",
};

export const Interactive = () => {
  const [value, setValue] = useState<string>("42");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue && Number(newValue) > 100) {
      setError("Số không được lớn hơn 100");
    } else {
      setError("");
    }
  };

  return (
    <div className='w-80 p-4'>
      <h3 className='mb-4 text-lg font-semibold'>Input số với validation</h3>
      <InputNumber placeholder='Nhập số (tối đa 100)' value={value} onChange={handleChange} errorMessage={error} />
      <p className='mt-2 text-sm text-gray-600'>
        Giá trị hiện tại: <strong>{value || "Chưa nhập"}</strong>
      </p>
    </div>
  );
};
