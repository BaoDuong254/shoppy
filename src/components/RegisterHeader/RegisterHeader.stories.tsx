import type { Meta, StoryFn } from "@storybook/react-vite";
import RegisterHeader from "./RegisterHeader";

const meta: Meta<typeof RegisterHeader> = {
  title: "Components/RegisterHeader",
  component: RegisterHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    reactRouter: {
      routePath: "/register",
    },
  },
};

export default meta;

const Template: StoryFn<typeof RegisterHeader> = () => <RegisterHeader />;

export const Default = Template.bind({});

export const OnRegisterPage = () => <RegisterHeader />;

export const OnLoginPage = () => <RegisterHeader />;

export const WithContent = () => (
  <div>
    <RegisterHeader />
    <div className='container mx-auto p-6'>
      <div className='rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-2xl font-bold'>Đăng ký tài khoản</h2>
        <form className='space-y-4'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Tên người dùng</label>
            <input
              type='text'
              className='focus:border-orange-500 w-full rounded-sm border border-gray-300 p-3 focus:outline-none'
              placeholder='Nhập tên người dùng'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              className='focus:border-orange-500 w-full rounded-sm border border-gray-300 p-3 focus:outline-none'
              placeholder='Nhập email'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Mật khẩu</label>
            <input
              type='password'
              className='focus:border-orange-500 w-full rounded-sm border border-gray-300 p-3 focus:outline-none'
              placeholder='Nhập mật khẩu'
            />
          </div>
          <button
            type='submit'
            className='hover:bg-orange-600 w-full rounded-sm bg-orange py-3 text-white transition-colors'
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  </div>
);

export const Responsive = () => (
  <div>
    <RegisterHeader />
    <div className='p-4'>
      <div className='rounded-lg bg-blue-50 p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Kiểm tra responsive</h3>
        <p className='mb-4 text-gray-700'>
          Thay đổi kích thước trình duyệt để xem header thích ứng với các kích thước màn hình khác nhau.
        </p>
        <ul className='space-y-2 text-sm text-gray-600'>
          <li>• Logo có thể thay đổi kích thước từ h-8 đến lg:h-11</li>
          <li>• Text thay đổi từ text-xl đến lg:text-2xl</li>
          <li>• Layout responsive với container</li>
          <li>• Hiển thị "Đăng ký" hoặc "Đăng nhập" tùy theo route</li>
        </ul>
      </div>
    </div>
  </div>
);

export const DifferentRoutes = () => (
  <div className='space-y-8'>
    <div>
      <h3 className='mb-4 px-4 text-lg font-semibold'>Register Page Header</h3>
      <RegisterHeader />
    </div>

    <div className='border-t pt-8'>
      <h3 className='mb-4 px-4 text-lg font-semibold'>Login Page Header</h3>
      <RegisterHeader />
    </div>

    <div className='border-t pt-8'>
      <h3 className='mb-4 px-4 text-lg font-semibold'>Other Page (fallback to login)</h3>
      <RegisterHeader />
    </div>

    <div className='space-y-2 px-4 text-sm text-gray-600'>
      <p>
        <strong>Lưu ý:</strong>
      </p>
      <p>• Header tự động hiển thị "Đăng ký" khi ở route /register</p>
      <p>• Hiển thị "Đăng nhập" cho tất cả các route khác</p>
      <p>• Logo luôn link về trang chủ "/"</p>
      <p>• Sử dụng i18n để hỗ trợ đa ngôn ngữ</p>
    </div>
  </div>
);
