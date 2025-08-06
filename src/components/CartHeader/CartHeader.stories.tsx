import type { Meta, StoryFn } from "@storybook/react-vite";
import CartHeader from "./CartHeader";

const meta: Meta<typeof CartHeader> = {
  title: "Components/CartHeader",
  component: CartHeader,
  tags: ["autodocs"],
};
export default meta;

const Template: StoryFn<typeof CartHeader> = () => <CartHeader />;

export const Primary = Template.bind({});
