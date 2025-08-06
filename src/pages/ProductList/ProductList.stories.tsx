import type { StoryFn, Meta } from "@storybook/react-vite";
import ProductList from "./ProductList";
import path from "@constants/path";
import MainLayout from "@layouts/MainLayout";

export default {
  title: "pages/ProductList",
  component: ProductList,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof ProductList>;

const Template: StoryFn<typeof ProductList> = () => {
  return <ProductList />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: path.home,
  },
};

export const ProductListPage: StoryFn<typeof ProductList> = () => (
  <MainLayout>
    <ProductList />
  </MainLayout>
);

ProductListPage.parameters = {
  reactRouter: {
    routePath: path.home,
  },
};
