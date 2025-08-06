import type { Meta, StoryFn } from "@storybook/react-vite";
import Loading from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<typeof Loading> = () => <Loading />;

export const Default = Template.bind({});

export const WithCustomBackground = () => (
  <div className='min-h-screen bg-gray-100'>
    <Loading />
  </div>
);

export const WithDarkBackground = () => (
  <div className='min-h-screen bg-gray-900'>
    <Loading />
  </div>
);

export const CenteredInContainer = () => (
  <div className='h-96 rounded-lg border border-gray-200 bg-white'>
    <div className='flex h-full items-center justify-center'>
      <div
        className='h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  </div>
);

export const SmallSize = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div
      className='h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  </div>
);

export const LargeSize = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div
      className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  </div>
);

export const ColoredSpinner = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div
      className='h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  </div>
);
