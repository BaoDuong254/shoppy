import type { Meta, StoryFn } from "@storybook/react-vite";
import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<typeof Footer> = () => <Footer />;

export const Default = Template.bind({});

export const WithContent = () => (
  <div>
    <div className='flex min-h-96 items-center justify-center bg-white'>
      <p className='text-gray-600'>Nội dung trang web ở đây...</p>
    </div>
    <Footer />
  </div>
);

export const MultipleFooters = () => (
  <div className='space-y-8'>
    <Footer />
    <div className='h-px bg-gray-300' />
    <Footer />
  </div>
);

export const WithDarkTheme = () => (
  <div className='min-h-screen bg-gray-900'>
    <div className='flex min-h-96 items-center justify-center'>
      <p className='text-white'>Nội dung với nền tối...</p>
    </div>
    <Footer />
  </div>
);

export const Responsive = () => (
  <div>
    <div className='bg-blue-50 p-6'>
      <h2 className='mb-4 text-xl font-bold'>Kiểm tra responsive</h2>
      <p className='text-gray-700'>
        Thay đổi kích thước trình duyệt để xem footer thích ứng với các kích thước màn hình khác nhau.
      </p>
      <ul className='mt-4 space-y-2 text-sm text-gray-600'>
        <li>• Mobile: 1 cột</li>
        <li>• Desktop: 3 cột với tỷ lệ 1:2</li>
        <li>• Nội dung được căn giữa ở màn hình nhỏ</li>
      </ul>
    </div>
    <Footer />
  </div>
);
