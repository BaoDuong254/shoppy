import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import QuantityController from "./QuantityController";

const meta: Meta<typeof QuantityController> = {
  title: "Components/QuantityController",
  component: QuantityController,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    max: {
      control: { type: "number", min: 1 },
      description: "Giá trị tối đa",
    },
    value: {
      control: { type: "number", min: 1 },
      description: "Giá trị hiện tại",
    },
    disabled: {
      control: "boolean",
      description: "Trạng thái vô hiệu hóa",
    },
    classNameWrapper: {
      control: "text",
      description: "CSS classes cho wrapper",
    },
  },
};

export default meta;

const Template: StoryFn<typeof QuantityController> = (args) => {
  const [value, setValue] = useState<number>(Number(args.value) || 1);

  return (
    <div className='p-4'>
      <QuantityController
        {...args}
        value={value}
        onIncrease={(newValue) => setValue(newValue)}
        onDecrease={(newValue) => setValue(newValue)}
        onType={(newValue) => setValue(newValue)}
        onFocusOut={(newValue) => setValue(newValue)}
      />
      <p className='mt-4 text-sm text-gray-600'>
        Giá trị hiện tại: <strong>{value}</strong>
      </p>
    </div>
  );
};

const TemplateControlled: StoryFn<typeof QuantityController> = (args) => (
  <div className='p-4'>
    <QuantityController {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  value: 1,
};

export const WithMaxValue = Template.bind({});
WithMaxValue.args = {
  value: 5,
  max: 10,
};

export const AtMaxValue = Template.bind({});
AtMaxValue.args = {
  value: 10,
  max: 10,
};

export const LargeValue = Template.bind({});
LargeValue.args = {
  value: 99,
  max: 999,
};

export const Disabled = TemplateControlled.bind({});
Disabled.args = {
  value: 3,
  disabled: true,
};

export const WithError = Template.bind({});
WithError.args = {
  value: 1,
  max: 5,
  errorMessage: "Số lượng không được vượt quá 5",
};

export const CustomWrapper = Template.bind({});
CustomWrapper.args = {
  value: 2,
  classNameWrapper: "ml-0 p-2 border border-gray-300 rounded-lg bg-gray-50",
};

export const Interactive = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const maxQuantity = 50;

  const handleIncrease = (value: number) => {
    setQuantity(value);
    if (value === maxQuantity) {
      setMessage(`Đã đạt số lượng tối đa: ${maxQuantity}`);
    } else {
      setMessage("");
    }
  };

  const handleDecrease = (value: number) => {
    setQuantity(value);
    if (value === 1) {
      setMessage("Số lượng tối thiểu là 1");
    } else {
      setMessage("");
    }
  };

  const handleType = (value: number) => {
    setQuantity(value);
    setMessage("");
  };

  return (
    <div className='space-y-4 p-6'>
      <h3 className='text-lg font-semibold'>Điều khiển số lượng sản phẩm</h3>

      <div className='flex items-center space-x-4'>
        <span>Số lượng:</span>
        <QuantityController
          value={quantity}
          max={maxQuantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onType={handleType}
          classNameWrapper='ml-0'
        />
      </div>

      <div className='space-y-2 text-sm'>
        <p>
          Số lượng hiện tại: <strong>{quantity}</strong>
        </p>
        <p>
          Số lượng tối đa: <strong>{maxQuantity}</strong>
        </p>
        {message && <p className='text-orange-600 font-medium'>{message}</p>}
      </div>

      <div className='text-xs text-gray-500'>
        <p>• Nhấn nút + để tăng số lượng</p>
        <p>• Nhấn nút - để giảm số lượng</p>
        <p>• Có thể nhập trực tiếp vào ô input</p>
        <p>• Số lượng tối thiểu là 1, tối đa là {maxQuantity}</p>
      </div>
    </div>
  );
};

export const MultipleControllers = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    product1: 1,
    product2: 3,
    product3: 5,
  });

  const updateQuantity = (productId: string, newValue: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newValue,
    }));
  };

  return (
    <div className='space-y-6 p-6'>
      <h3 className='text-lg font-semibold'>Nhiều điều khiển số lượng</h3>

      {Object.entries(quantities).map(([productId, quantity], index) => (
        <div key={productId} className='flex items-center justify-between rounded-lg border border-gray-200 p-4'>
          <span className='font-medium'>Sản phẩm {index + 1}</span>
          <QuantityController
            value={quantity}
            max={20}
            onIncrease={(value) => updateQuantity(productId, value)}
            onDecrease={(value) => updateQuantity(productId, value)}
            onType={(value) => updateQuantity(productId, value)}
            classNameWrapper='ml-0'
          />
        </div>
      ))}

      <div className='mt-4 rounded-lg bg-gray-50 p-4'>
        <h4 className='mb-2 font-medium'>Tổng kết:</h4>
        <p>
          Tổng số lượng: <strong>{Object.values(quantities).reduce((sum, qty) => sum + qty, 0)}</strong>
        </p>
      </div>
    </div>
  );
};
