/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputV2 from "./InputV2";

const meta: Meta<typeof InputV2> = {
  title: "Components/InputV2",
  component: InputV2,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
      description: "Loại input",
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

const Template: StoryFn<typeof InputV2> = (args) => {
  const { control } = useForm();

  return (
    <div className='w-80'>
      <InputV2 control={control} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "username",
  placeholder: "Nhập tên người dùng",
  type: "text",
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  name: "age",
  placeholder: "Nhập tuổi",
  type: "number",
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  name: "email",
  placeholder: "Nhập email",
  type: "email",
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  name: "password",
  placeholder: "Nhập mật khẩu",
  type: "password",
};

export const WithValidation = () => {
  const schema = yup.object().shape({
    username: yup.string().required("Tên người dùng là bắt buộc").min(3, "Tối thiểu 3 ký tự"),
    email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
    age: yup.number().required("Tuổi là bắt buộc").min(18, "Phải từ 18 tuổi trở lên"),
    password: yup.string().required("Mật khẩu là bắt buộc").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      age: 0,
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className='w-96 p-6'>
      <h3 className='mb-4 text-lg font-semibold'>Form với Validation</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <InputV2
          control={control}
          name='username'
          type='text'
          placeholder='Nhập tên người dùng'
          rules={{ required: true }}
        />

        <InputV2 control={control} name='email' type='email' placeholder='Nhập email' rules={{ required: true }} />

        <InputV2 control={control} name='age' type='number' placeholder='Nhập tuổi' rules={{ required: true }} />

        <InputV2
          control={control}
          name='password'
          type='password'
          placeholder='Nhập mật khẩu'
          rules={{ required: true }}
        />

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full rounded bg-blue-500 py-3 text-white hover:bg-blue-600 disabled:opacity-50'
        >
          {isSubmitting ? "Đang xử lý..." : "Gửi"}
        </button>
      </form>
    </div>
  );
};

export const CustomStyles = () => {
  const { control } = useForm();

  return (
    <div className='w-96 space-y-6 p-6'>
      <h3 className='text-lg font-semibold'>Custom Styles</h3>

      <div>
        <label className='mb-2 block text-sm font-medium'>Success Style</label>
        <InputV2
          control={control}
          name='success'
          type='text'
          placeholder='Input với style thành công'
          classNameInput='p-3 w-full outline-none border-2 border-green-300 focus:border-green-500 rounded-lg bg-green-50 focus:shadow-lg'
          classNameError='mt-2 text-green-600 text-sm'
        />
      </div>

      <div>
        <label className='mb-2 block text-sm font-medium'>Warning Style</label>
        <InputV2
          control={control}
          name='warning'
          type='text'
          placeholder='Input với style cảnh báo'
          classNameInput='p-3 w-full outline-none border-2 border-yellow-300 focus:border-yellow-500 rounded-lg bg-yellow-50 focus:shadow-lg'
          classNameError='mt-2 text-yellow-600 text-sm'
        />
      </div>

      <div>
        <label className='mb-2 block text-sm font-medium'>Error Style</label>
        <InputV2
          control={control}
          name='error'
          type='text'
          placeholder='Input với style lỗi'
          classNameInput='p-3 w-full outline-none border-2 border-red-300 focus:border-red-500 rounded-lg bg-red-50 focus:shadow-lg'
          classNameError='mt-2 text-red-600 text-sm font-medium'
        />
      </div>
    </div>
  );
};

export const NumberValidation = () => {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Số lượng là bắt buộc")
      .min(1, "Số lượng tối thiểu là 1")
      .max(999, "Số lượng tối đa là 999"),
    price: yup.number().required("Giá là bắt buộc").min(1000, "Giá tối thiểu là 1.000đ"),
  });

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: 0,
      price: 0,
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: any) => {
    console.log("Number form data:", data);
  };

  return (
    <div className='w-96 p-6'>
      <h3 className='mb-4 text-lg font-semibold'>Number Input Validation</h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='mb-2 block text-sm font-medium'>Số lượng (1-999)</label>
          <InputV2 control={control} name='quantity' type='number' placeholder='Nhập số lượng' />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium'>Giá (tối thiểu 1.000đ)</label>
          <InputV2 control={control} name='price' type='number' placeholder='Nhập giá' />
        </div>

        <div className='rounded bg-gray-50 p-3 text-sm'>
          <h4 className='mb-2 font-medium'>Giá trị hiện tại:</h4>
          <p>
            Số lượng: <strong>{watchedValues.quantity || "Chưa nhập"}</strong>
          </p>
          <p>
            Giá:{" "}
            <strong>{watchedValues.price ? `${Number(watchedValues.price).toLocaleString()}đ` : "Chưa nhập"}</strong>
          </p>
        </div>

        <button type='submit' className='w-full rounded bg-green-500 py-3 text-white hover:bg-green-600'>
          Kiểm tra
        </button>
      </form>
    </div>
  );
};

export const Interactive = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      textField: "",
      numberField: "",
      emailField: "",
    },
  });

  const onSubmit = (data: any) => {
    alert(`Dữ liệu: ${JSON.stringify(data, null, 2)}`);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className='w-96 p-6'>
      <h3 className='mb-4 text-lg font-semibold'>Interactive InputV2 Demo</h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='mb-2 block text-sm font-medium'>Text Field</label>
          <InputV2
            control={control}
            name='textField'
            type='text'
            placeholder='Nhập text bất kỳ'
            rules={{ required: "Trường này bắt buộc" }}
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium'>Number Field (chỉ số)</label>
          <InputV2
            control={control}
            name='numberField'
            type='number'
            placeholder='Chỉ có thể nhập số'
            rules={{ required: "Trường này bắt buộc" }}
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium'>Email Field</label>
          <InputV2
            control={control}
            name='emailField'
            type='email'
            placeholder='name@example.com'
            rules={{
              required: "Email bắt buộc",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email không hợp lệ",
              },
            }}
          />
        </div>

        <div className='flex space-x-2'>
          <button type='submit' className='flex-1 rounded bg-blue-500 py-2 text-white hover:bg-blue-600'>
            Submit
          </button>
          <button
            type='button'
            onClick={handleReset}
            className='flex-1 rounded bg-gray-500 py-2 text-white hover:bg-gray-600'
          >
            Reset
          </button>
        </div>
      </form>

      <div className='mt-6 space-y-1 text-sm text-gray-600'>
        <p>
          <strong>Tính năng:</strong>
        </p>
        <p>• Tích hợp react-hook-form với useController</p>
        <p>• Validation tự động hiển thị lỗi</p>
        <p>• Number input chỉ cho phép nhập số</p>
        <p>• Controlled component với local state</p>
      </div>
    </div>
  );
};
