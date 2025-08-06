import type { StoryFn, Meta } from "@storybook/react-vite";
import ChangePassword from "./ChangePassword";
import path from "@constants/path";
import MainLayout from "@layouts/MainLayout";
import UserSideNav from "@pages/User/components/UserSideNav";

export default {
  title: "pages/User/ChangePassword",
  component: ChangePassword,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof ChangePassword>;

const Template: StoryFn<typeof ChangePassword> = () => {
  return <ChangePassword />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: path.changePassword,
  },
};

export const ChangePasswordPage: StoryFn<typeof ChangePassword> = () => (
  <MainLayout>
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
              <div className='border-b border-b-gray-200 py-6'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
                <div className='mt-1 text-sm text-gray-700'>
                  Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                </div>
              </div>
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

ChangePasswordPage.parameters = {
  reactRouter: {
    routePath: path.changePassword,
  },
};
