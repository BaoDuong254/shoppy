import type { Meta, StoryFn } from "@storybook/react-vite";
import RegisterLayout from "./RegisterLayout";
import Register from "@pages/Register";
import Login from "@pages/Login";

export default {
  title: "Layouts/RegisterLayout",
  component: RegisterLayout,
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
} as Meta<typeof RegisterLayout>;

const Template: StoryFn<typeof RegisterLayout> = (props) => <RegisterLayout {...props} />;

export const Default = Template.bind({});

export const WithRegisterPage = Template.bind({});
WithRegisterPage.args = {
  children: <Register />,
};

export const WithLoginPage = Template.bind({});
WithLoginPage.args = {
  children: <Login />,
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  children: (
    <div className='bg-orange-50 min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md'>
          <div className='bg-orange-500 px-6 py-4'>
            <h1 className='text-2xl font-bold text-white'>Welcome to Shoppy</h1>
          </div>
          <div className='p-6'>
            <p className='mb-6 text-gray-600'>
              This is an example of custom authentication content within the RegisterLayout component. The layout
              includes the RegisterHeader at the top and Footer at the bottom.
            </p>
            <div className='space-y-4'>
              <div className='rounded-lg border border-gray-200 p-4'>
                <h3 className='mb-2 font-semibold text-gray-900'>Create Account</h3>
                <p className='text-sm text-gray-600'>
                  Sign up for a new account to start shopping and enjoy exclusive offers.
                </p>
              </div>
              <div className='rounded-lg border border-gray-200 p-4'>
                <h3 className='mb-2 font-semibold text-gray-900'>Sign In</h3>
                <p className='text-sm text-gray-600'>
                  Already have an account? Sign in to access your orders and wishlist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
