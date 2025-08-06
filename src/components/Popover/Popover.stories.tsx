import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import Popover from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
    renderPopover: {
      table: { disable: true },
    },
    placement: {
      control: "select",
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
      description: "Vị trí hiển thị popover",
    },
    as: {
      control: "select",
      options: ["div", "span", "button"],
      description: "Element type cho trigger",
    },
    initialOpen: {
      control: "boolean",
      description: "Mở popover ban đầu",
    },
  },
};

export default meta;

const Template: StoryFn<typeof Popover> = (args) => (
  <div className='p-8'>
    <Popover {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Hover me</button>,
  renderPopover: (
    <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-lg'>
      <p>This is a popover content!</p>
    </div>
  ),
};

export const WithUserMenu = Template.bind({});
WithUserMenu.args = {
  children: (
    <div className='hover:bg-orange-600 flex cursor-pointer items-center space-x-2 rounded bg-orange px-3 py-2 text-white'>
      <div className='text-orange-500 flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold'>U</div>
      <span>user@example.com</span>
    </div>
  ),
  renderPopover: (
    <div className='min-w-48 rounded border border-gray-200 bg-white shadow-lg'>
      <a href='#' className='block px-4 py-3 text-left hover:bg-gray-100 hover:text-cyan-500'>
        Tài khoản của tôi
      </a>
      <a href='#' className='block px-4 py-3 text-left hover:bg-gray-100 hover:text-cyan-500'>
        Đơn mua
      </a>
      <button className='block w-full px-4 py-3 text-left hover:bg-gray-100 hover:text-cyan-500'>Đăng xuất</button>
    </div>
  ),
};

export const WithShoppingCart = Template.bind({});
WithShoppingCart.args = {
  children: (
    <div className='relative cursor-pointer'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-8 w-8 text-white'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
        />
      </svg>
      <span className='text-orange-500 absolute left-[17px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs'>
        3
      </span>
    </div>
  ),
  renderPopover: (
    <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
      <div className='p-2'>
        <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
        <div className='mt-5'>
          <div className='mt-2 flex py-2 hover:bg-gray-100'>
            <div className='flex-shrink-0'>
              <img src='https://via.placeholder.com/44x44' alt='Product' className='h-11 w-11 object-cover' />
            </div>
            <div className='ml-2 flex-grow overflow-hidden'>
              <div className='truncate'>Sản phẩm mẫu với tên rất dài</div>
            </div>
            <div className='ml-2 flex-shrink-0'>
              <span className='text-orange-500'>₫120.000</span>
            </div>
          </div>
          <div className='mt-2 flex py-2 hover:bg-gray-100'>
            <div className='flex-shrink-0'>
              <img src='https://via.placeholder.com/44x44' alt='Product' className='h-11 w-11 object-cover' />
            </div>
            <div className='ml-2 flex-grow overflow-hidden'>
              <div className='truncate'>Sản phẩm khác</div>
            </div>
            <div className='ml-2 flex-shrink-0'>
              <span className='text-orange-500'>₫250.000</span>
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-xs capitalize text-gray-500'>1 sản phẩm thêm vào giỏ hàng</div>
          <button className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'>
            Xem giỏ hàng
          </button>
        </div>
      </div>
    </div>
  ),
};

export const EmptyCart = Template.bind({});
EmptyCart.args = {
  children: (
    <div className='relative cursor-pointer'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-8 w-8 text-slate-800'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
        />
      </svg>
    </div>
  ),
  renderPopover: (
    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center rounded border border-gray-200 bg-white p-2 shadow-lg'>
      <img src='https://via.placeholder.com/96x96?text=No+Product' alt='no product' className='h-24 w-24' />
      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
    </div>
  ),
};

export const LanguageSelector = Template.bind({});
LanguageSelector.args = {
  children: (
    <div className='flex cursor-pointer items-center py-1 text-slate-900 hover:text-slate-800'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-5 w-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
        />
      </svg>
      <span className='mx-1'>Tiếng Việt</span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-5 w-5'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
      </svg>
    </div>
  ),
  renderPopover: (
    <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
      <div className='flex flex-col py-2 pl-3 pr-28'>
        <button className='hover:text-orange-500 px-3 py-2 text-left' type='button'>
          Tiếng Việt
        </button>
        <button className='hover:text-orange-500 mt-2 px-3 py-2 text-left' type='button'>
          English
        </button>
      </div>
    </div>
  ),
};

export const DifferentPlacements = () => (
  <div className='space-y-8 p-16'>
    <h3 className='text-center text-lg font-semibold'>Different Placement Options</h3>

    <div className='grid grid-cols-3 items-center gap-8'>
      <Popover
        placement='top-start'
        children={<button className='rounded bg-blue-500 px-4 py-2 text-white'>Top Start</button>}
        renderPopover={<div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Top Start Placement</div>}
      />

      <Popover
        placement='top'
        children={<button className='rounded bg-blue-500 px-4 py-2 text-white'>Top</button>}
        renderPopover={<div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Top Placement</div>}
      />

      <Popover
        placement='top-end'
        children={<button className='rounded bg-blue-500 px-4 py-2 text-white'>Top End</button>}
        renderPopover={<div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Top End Placement</div>}
      />

      <Popover
        placement='left'
        children={<button className='rounded bg-green-500 px-4 py-2 text-white'>Left</button>}
        renderPopover={<div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Left Placement</div>}
      />

      <div className='flex justify-center'>
        <span className='text-gray-500'>Hover buttons around</span>
      </div>

      <Popover
        placement='right'
        children={<button className='rounded bg-green-500 px-4 py-2 text-white'>Right</button>}
        renderPopover={<div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Right Placement</div>}
      />

      <Popover
        placement='bottom-start'
        children={<button className='rounded bg-red-500 px-4 py-2 text-white'>Bottom Start</button>}
        renderPopover={
          <div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Bottom Start Placement</div>
        }
      />

      <Popover
        placement='bottom'
        children={<button className='rounded bg-red-500 px-4 py-2 text-white'>Bottom</button>}
        renderPopover={<div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Bottom Placement</div>}
      />

      <Popover
        placement='bottom-end'
        children={<button className='rounded bg-red-500 px-4 py-2 text-white'>Bottom End</button>}
        renderPopover={
          <div className='rounded border border-gray-200 bg-white p-3 shadow-lg'>Bottom End Placement</div>
        }
      />
    </div>
  </div>
);

export const Interactive = () => {
  const [message, setMessage] = useState("Default message");

  return (
    <div className='space-y-4 p-8'>
      <h3 className='text-lg font-semibold'>Interactive Popover Example</h3>

      <Popover
        children={
          <button
            className='rounded-lg bg-purple-500 px-6 py-3 text-white hover:bg-purple-600'
            onMouseEnter={() => setMessage("Hovering over the trigger!")}
            onMouseLeave={() => setMessage("Default message")}
          >
            Interactive Trigger
          </button>
        }
        renderPopover={
          <div className='max-w-xs rounded-lg border border-gray-200 bg-white p-6 shadow-xl'>
            <h4 className='mb-2 text-lg font-bold'>Interactive Content</h4>
            <p className='mb-4 text-gray-600'>{message}</p>
            <div className='space-y-2'>
              <button
                className='block w-full rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600'
                onClick={() => setMessage("Button 1 clicked!")}
              >
                Action 1
              </button>
              <button
                className='block w-full rounded bg-green-500 px-3 py-2 text-white hover:bg-green-600'
                onClick={() => setMessage("Button 2 clicked!")}
              >
                Action 2
              </button>
            </div>
          </div>
        }
      />

      <p className='text-sm text-gray-600'>
        Current message: <strong>{message}</strong>
      </p>
    </div>
  );
};
