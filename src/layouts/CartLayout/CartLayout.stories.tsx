import type { Meta, StoryFn } from "@storybook/react-vite";
import CartLayout from "./CartLayout";
import Cart from "@pages/Cart";

export default {
  title: "Layouts/CartLayout",
  component: CartLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: {
      description: "Body của layout",
      table: { type: { summary: "React.ReactNode" } },
    },
  },
} as Meta<typeof CartLayout>;

const Template: StoryFn<typeof CartLayout> = (props) => <CartLayout {...props} />;

export const Default = Template.bind({});

export const WithCartPage = Template.bind({});
WithCartPage.args = {
  children: <Cart />,
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  children: (
    <div className='container mx-auto px-4 py-8'>
      <div className='rounded-lg bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-2xl font-bold text-gray-900'>Cart Layout Content</h1>
        <p className='mb-6 text-gray-600'>
          This is an example of custom content within the CartLayout component. The layout includes the CartHeader at
          the top and Footer at the bottom.
        </p>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='bg-orange-50 border-orange-200 rounded-lg border p-4'>
            <h3 className='text-orange-900 mb-2 font-semibold'>Shopping Cart</h3>
            <p className='text-orange-700 text-sm'>
              Your cart items will be displayed here with options to modify quantities and proceed to checkout.
            </p>
          </div>
          <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
            <h3 className='mb-2 font-semibold text-blue-900'>Order Summary</h3>
            <p className='text-sm text-blue-700'>
              View your order total, shipping information, and apply discount codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};
