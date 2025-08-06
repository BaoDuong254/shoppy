import type { StoryFn, Meta } from "@storybook/react-vite";
import UserSideNav from "./UserSideNav";

export default {
  title: "pages/User/components/UserSideNav",
  component: UserSideNav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "User side navigation component with profile info and navigation links",
      },
    },
  },
} as Meta<typeof UserSideNav>;

const Template: StoryFn<typeof UserSideNav> = () => (
  <div className='w-64 bg-white p-4'>
    <UserSideNav />
  </div>
);

export const Default = Template.bind({});

export const ProfileActive: StoryFn<typeof UserSideNav> = () => (
  <div className='w-64 bg-white p-4'>
    <UserSideNav />
  </div>
);

ProfileActive.parameters = {
  reactRouter: {
    routePath: "/user/profile",
  },
};

export const ChangePasswordActive: StoryFn<typeof UserSideNav> = () => (
  <div className='w-64 bg-white p-4'>
    <UserSideNav />
  </div>
);

ChangePasswordActive.parameters = {
  reactRouter: {
    routePath: "/user/password",
  },
};

export const HistoryPurchaseActive: StoryFn<typeof UserSideNav> = () => (
  <div className='w-64 bg-white p-4'>
    <UserSideNav />
  </div>
);

HistoryPurchaseActive.parameters = {
  reactRouter: {
    routePath: "/user/purchase",
  },
};
