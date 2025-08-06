import type { Meta, StoryFn } from "@storybook/react-vite";
import ProductRating from "./ProductRating";

const meta: Meta<typeof ProductRating> = {
  title: "Components/ProductRating",
  component: ProductRating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    rating: {
      control: { type: "range", min: 0, max: 5, step: 0.1 },
      description: "Điểm rating từ 0 đến 5",
    },
    activeClassname: {
      control: "text",
      description: "CSS classes cho sao được kích hoạt",
    },
    nonActiveClassname: {
      control: "text",
      description: "CSS classes cho sao không được kích hoạt",
    },
  },
};

export default meta;

const Template: StoryFn<typeof ProductRating> = (args) => (
  <div className='p-4'>
    <ProductRating {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  rating: 4.5,
};

export const FullStars = Template.bind({});
FullStars.args = {
  rating: 5,
};

export const NoStars = Template.bind({});
NoStars.args = {
  rating: 0,
};

export const OneAndHalfStars = Template.bind({});
OneAndHalfStars.args = {
  rating: 1.5,
};

export const ThreeStars = Template.bind({});
ThreeStars.args = {
  rating: 3,
};

export const FourPointSevenStars = Template.bind({});
FourPointSevenStars.args = {
  rating: 4.7,
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  rating: 4.2,
  activeClassname: "h-6 w-6 fill-yellow-400 text-yellow-400",
  nonActiveClassname: "h-6 w-6 fill-current text-gray-300",
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  rating: 3.8,
  activeClassname: "h-2 w-2 fill-yellow-300 text-yellow-300",
  nonActiveClassname: "h-2 w-2 fill-current text-gray-300",
};

export const RedStars = Template.bind({});
RedStars.args = {
  rating: 4,
  activeClassname: "h-4 w-4 fill-red-500 text-red-500",
  nonActiveClassname: "h-4 w-4 fill-current text-gray-300",
};

export const BlueStars = Template.bind({});
BlueStars.args = {
  rating: 3.3,
  activeClassname: "h-4 w-4 fill-blue-500 text-blue-500",
  nonActiveClassname: "h-4 w-4 fill-current text-gray-200",
};

export const AllRatingValues = () => (
  <div className='space-y-4 p-4'>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>0.0</span>
      <ProductRating rating={0} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>0.5</span>
      <ProductRating rating={0.5} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>1.0</span>
      <ProductRating rating={1} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>1.5</span>
      <ProductRating rating={1.5} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>2.0</span>
      <ProductRating rating={2} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>2.5</span>
      <ProductRating rating={2.5} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>3.0</span>
      <ProductRating rating={3} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>3.5</span>
      <ProductRating rating={3.5} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>4.0</span>
      <ProductRating rating={4} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>4.5</span>
      <ProductRating rating={4.5} />
    </div>
    <div className='flex items-center space-x-4'>
      <span className='w-12'>5.0</span>
      <ProductRating rating={5} />
    </div>
  </div>
);
