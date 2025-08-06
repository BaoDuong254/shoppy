import type { Meta, StoryFn } from "@storybook/react-vite";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    reactRouter: {
      routePath: "/",
    },
  },
};

export default meta;

const Template: StoryFn<typeof Pagination> = (args) => (
  <div className='flex min-h-96 items-center justify-center bg-gray-50 p-4'>
    <Pagination {...args} />
  </div>
);

export const FirstPage = Template.bind({});
FirstPage.args = {
  queryConfig: { page: "1" },
  pageSize: 10,
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  queryConfig: { page: "5" },
  pageSize: 10,
};

export const LastPage = Template.bind({});
LastPage.args = {
  queryConfig: { page: "10" },
  pageSize: 10,
};

export const SmallPagination = Template.bind({});
SmallPagination.args = {
  queryConfig: { page: "2" },
  pageSize: 3,
};

export const LargePagination = Template.bind({});
LargePagination.args = {
  queryConfig: { page: "15" },
  pageSize: 50,
};

export const WithSearchParams = Template.bind({});
WithSearchParams.args = {
  queryConfig: {
    page: "3",
    category: "electronics",
    sort_by: "price",
    order: "asc",
  },
  pageSize: 8,
};

export const SinglePage = Template.bind({});
SinglePage.args = {
  queryConfig: { page: "1" },
  pageSize: 1,
};

export const TwoPages = Template.bind({});
TwoPages.args = {
  queryConfig: { page: "1" },
  pageSize: 2,
};

export const PageWithDots = Template.bind({});
PageWithDots.args = {
  queryConfig: { page: "10" },
  pageSize: 20,
};

export const Interactive = () => {
  return (
    <div className='space-y-8 p-6'>
      <h3 className='text-lg font-semibold'>Các trạng thái khác nhau của Pagination</h3>

      <div className='space-y-6'>
        <div>
          <h4 className='mb-2 font-medium'>Trang đầu tiên (1/10)</h4>
          <div className='rounded-lg border bg-white p-4'>
            <Pagination queryConfig={{ page: "1" }} pageSize={10} />
          </div>
        </div>

        <div>
          <h4 className='mb-2 font-medium'>Trang ở giữa (5/10)</h4>
          <div className='rounded-lg border bg-white p-4'>
            <Pagination queryConfig={{ page: "5" }} pageSize={10} />
          </div>
        </div>

        <div>
          <h4 className='mb-2 font-medium'>Trang cuối cùng (10/10)</h4>
          <div className='rounded-lg border bg-white p-4'>
            <Pagination queryConfig={{ page: "10" }} pageSize={10} />
          </div>
        </div>

        <div>
          <h4 className='mb-2 font-medium'>Pagination lớn với dấu ... (25/100)</h4>
          <div className='rounded-lg border bg-white p-4'>
            <Pagination queryConfig={{ page: "25" }} pageSize={100} />
          </div>
        </div>

        <div>
          <h4 className='mb-2 font-medium'>Chỉ có 1 trang</h4>
          <div className='rounded-lg border bg-white p-4'>
            <Pagination queryConfig={{ page: "1" }} pageSize={1} />
          </div>
        </div>
      </div>

      <div className='text-sm text-gray-600'>
        <p>
          <strong>Lưu ý:</strong> Component này sử dụng React Router, nên các link sẽ không hoạt động trong môi trường
          Storybook.
        </p>
      </div>
    </div>
  );
};
