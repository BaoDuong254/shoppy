import type { StoryFn, Meta } from "@storybook/react-vite";
import UserLayout from "./UserLayout";

export default {
  title: "pages/User/layouts/UserLayout",
  component: UserLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Layout chính cho các trang user, bao gồm side navigation và content area. Layout này sử dụng React Router Outlet để render nội dung động.",
      },
    },
  },
} as Meta<typeof UserLayout>;

const Template: StoryFn = () => <UserLayout />;

// Default story
export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story:
        "Layout mặc định hiển thị cấu trúc chính với side navigation và content area. Outlet sẽ render nội dung tương ứng với route hiện tại.",
    },
  },
};
