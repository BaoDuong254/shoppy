import type { Meta, StoryFn } from "@storybook/react-vite";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Hiển thị icon loading",
    },
    disabled: {
      control: "boolean",
      description: "Vô hiệu hóa button",
    },
    children: {
      control: "text",
      description: "Nội dung button",
      table: { type: { summary: "React.ReactNode" }, defaultValue: { summary: "" } },
    },
    className: {
      control: "text",
      description: "CSS classes để styling button",
      table: { type: { summary: "string" }, defaultValue: { summary: "" } },
    },
    onClick: {
      action: "clicked",
      description: "Callback khi click button",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Button component tái sử dụng với loading state và disabled state",
      },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (props) => <Button {...props} />;

// Primary button - màu đỏ chính của ứng dụng
export const Primary = Template.bind({});
Primary.args = {
  children: "Đăng nhập",
  className:
    "flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600 transition-colors",
};
Primary.parameters = {
  docs: {
    description: {
      story: "Button chính của ứng dụng với màu đỏ đặc trưng",
    },
  },
};

// Secondary button - outline style
export const Secondary = Template.bind({});
Secondary.args = {
  children: "Đăng ký",
  className:
    "flex w-full items-center justify-center border-2 border-red-500 py-4 px-2 text-sm uppercase text-red-500 hover:bg-red-500 hover:text-white transition-colors",
};
Secondary.parameters = {
  docs: {
    description: {
      story: "Button phụ với kiểu outline",
    },
  },
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  children: "Đang xử lý...",
  className:
    "flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600 transition-colors",
  isLoading: true,
};
Loading.parameters = {
  docs: {
    description: {
      story: "Button trong trạng thái loading với spinner",
    },
  },
};

// Disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  children: "Không khả dụng",
  className: "flex w-full items-center justify-center bg-gray-400 py-4 px-2 text-sm uppercase text-white",
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: "Button trong trạng thái disabled",
    },
  },
};

// Loading and disabled
export const LoadingDisabled = Template.bind({});
LoadingDisabled.args = {
  children: "Đang xử lý...",
  className: "flex w-full items-center justify-center bg-gray-400 py-4 px-2 text-sm uppercase text-white",
  isLoading: true,
  disabled: true,
};
LoadingDisabled.parameters = {
  docs: {
    description: {
      story: "Button vừa loading vừa disabled",
    },
  },
};

// Small button
export const Small = Template.bind({});
Small.args = {
  children: "Nhỏ",
  className:
    "flex items-center justify-center bg-red-500 py-2 px-4 text-xs uppercase text-white hover:bg-red-600 transition-colors rounded",
};
Small.parameters = {
  docs: {
    description: {
      story: "Button kích thước nhỏ",
    },
  },
};

// Large button
export const Large = Template.bind({});
Large.args = {
  children: "Lớn",
  className:
    "flex w-full items-center justify-center bg-red-500 py-6 px-8 text-lg uppercase text-white hover:bg-red-600 transition-colors rounded-lg",
};
Large.parameters = {
  docs: {
    description: {
      story: "Button kích thước lớn",
    },
  },
};

// Success button
export const Success = Template.bind({});
Success.args = {
  children: "Thành công",
  className:
    "flex w-full items-center justify-center bg-green-500 py-4 px-2 text-sm uppercase text-white hover:bg-green-600 transition-colors",
};
Success.parameters = {
  docs: {
    description: {
      story: "Button màu xanh lá cho trạng thái thành công",
    },
  },
};

// Warning button
export const Warning = Template.bind({});
Warning.args = {
  children: "Cảnh báo",
  className:
    "flex w-full items-center justify-center bg-yellow-500 py-4 px-2 text-sm uppercase text-white hover:bg-yellow-600 transition-colors",
};
Warning.parameters = {
  docs: {
    description: {
      story: "Button màu vàng cho cảnh báo",
    },
  },
};

// Danger button
export const Danger = Template.bind({});
Danger.args = {
  children: "Xóa",
  className:
    "flex w-full items-center justify-center bg-red-600 py-4 px-2 text-sm uppercase text-white hover:bg-red-700 transition-colors",
};
Danger.parameters = {
  docs: {
    description: {
      story: "Button màu đỏ đậm cho các hành động nguy hiểm",
    },
  },
};

// Interactive example với tất cả controls
export const Interactive = Template.bind({});
Interactive.args = {
  children: "Button tương tác",
  className:
    "flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600 transition-colors",
  isLoading: false,
  disabled: false,
};
Interactive.parameters = {
  docs: {
    description: {
      story: "Button có thể điều chỉnh tất cả thuộc tính thông qua controls",
    },
  },
};
