import type { StoryFn, Meta } from "@storybook/react-vite";
import Cart from "./Cart";
import path from "@constants/path";
import CartLayout from "@layouts/CartLayout";

export default {
  title: "pages/Cart",
  component: Cart,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Cart>;

const Template: StoryFn<typeof Cart> = () => {
  return <Cart />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: path.cart,
  },
};

export const CartPage: StoryFn<typeof Cart> = () => (
  <CartLayout>
    <Cart />
  </CartLayout>
);

CartPage.parameters = {
  reactRouter: {
    routePath: path.cart,
  },
};
