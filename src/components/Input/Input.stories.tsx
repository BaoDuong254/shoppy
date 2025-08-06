import type { Meta, StoryFn } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
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
    classNameEye: {
      control: "text",
      description: "CSS classes cho icon mắt (password field)",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
      description: "Loại input",
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

const Template: StoryFn<typeof Input> = (args) => {
  const { register } = useForm();

  return (
    <div className='w-80'>
      <Input register={register} {...args} />
    </div>
  );
};

const TemplateWithoutForm: StoryFn<typeof Input> = (args) => (
  <div className='w-80'>
    <Input {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: "username",
  placeholder: "Nhập tên người dùng",
  type: "text",
};

export const WithError = Template.bind({});
WithError.args = {
  name: "email",
  placeholder: "Nhập email",
  type: "email",
  errorMessage: "Email không hợp lệ",
};

export const Password = Template.bind({});
Password.args = {
  name: "password",
  placeholder: "Nhập mật khẩu",
  type: "password",
};

export const PasswordWithError = Template.bind({});
PasswordWithError.args = {
  name: "password",
  placeholder: "Nhập mật khẩu",
  type: "password",
  errorMessage: "Mật khẩu phải có ít nhất 6 ký tự",
};

export const Email = Template.bind({});
Email.args = {
  name: "email",
  placeholder: "example@email.com",
  type: "email",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "disabled",
  placeholder: "Input bị vô hiệu hóa",
  type: "text",
  disabled: true,
};

export const CustomStyles = TemplateWithoutForm.bind({});
CustomStyles.args = {
  name: "custom",
  placeholder: "Input với style tùy chỉnh",
  type: "text",
  classNameInput: "p-4 w-full outline-none border-2 border-blue-300 focus:border-blue-500 rounded-lg focus:shadow-lg",
  classNameError: "mt-2 text-blue-600 text-base font-medium",
};

export const LongErrorMessage = Template.bind({});
LongErrorMessage.args = {
  name: "longError",
  placeholder: "Input với thông báo lỗi dài",
  type: "text",
  errorMessage:
    "Đây là một thông báo lỗi rất dài để kiểm tra cách hiển thị khi nội dung lỗi có nhiều từ và có thể xuống dòng",
};
