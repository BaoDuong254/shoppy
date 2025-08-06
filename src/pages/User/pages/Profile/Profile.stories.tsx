import type { StoryFn, Meta } from "@storybook/react-vite";
import Profile from "./Profile";
import path from "@constants/path";
import MainLayout from "@layouts/MainLayout";
import UserSideNav from "@pages/User/components/UserSideNav";

export default {
  title: "pages/User/Profile",
  component: Profile,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Profile>;

const Template: StoryFn<typeof Profile> = () => {
  return <Profile />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: path.profile,
  },
};

export const ProfilePage: StoryFn<typeof Profile> = () => (
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
                <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
                <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
              </div>
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

ProfilePage.parameters = {
  reactRouter: {
    routePath: path.profile,
  },
};
