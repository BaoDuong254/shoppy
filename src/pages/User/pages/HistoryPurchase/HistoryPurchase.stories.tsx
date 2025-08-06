import type { StoryFn, Meta } from "@storybook/react-vite";
import HistoryPurchase from "./HistoryPurchase";
import path from "@constants/path";
import MainLayout from "@layouts/MainLayout";
import UserSideNav from "@pages/User/components/UserSideNav";

export default {
  title: "pages/User/HistoryPurchase",
  component: HistoryPurchase,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof HistoryPurchase>;

const Template: StoryFn<typeof HistoryPurchase> = () => {
  return <HistoryPurchase />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: path.historyPurchase,
  },
};

export const HistoryPurchasePage: StoryFn<typeof HistoryPurchase> = () => (
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
                <h1 className='text-lg font-medium capitalize text-gray-900'>Lịch sử mua hàng</h1>
              </div>
              <HistoryPurchase />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

HistoryPurchasePage.parameters = {
  reactRouter: {
    routePath: path.historyPurchase,
  },
};
