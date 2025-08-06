import type { Meta, StoryFn } from "@storybook/react-vite";
import MainLayout from "./MainLayout";
import ProductDetail from "@pages/ProductDetail";

export default {
  title: "Layouts/MainLayout",
  component: MainLayout,
  argTypes: {
    children: {
      description: "Body của layout",
      table: { type: { summary: "React.ReactNode" } },
    },
  },
} as Meta<typeof MainLayout>;

const Template: StoryFn<typeof MainLayout> = (props) => <MainLayout {...props} />;

export const Primary = Template.bind({});
export const PageProductDetail = Template.bind({});

PageProductDetail.args = {
  children: <ProductDetail />,
};

PageProductDetail.parameters = {
  reactRouter: {
    routePath: "/:nameId",
    routeParams: { nameId: "Điện-thoại-OPPO-A12-3GB32GB--Hàng-chính-hãng-i-60afb2426ef5b902180aacb9" },
  },
};
