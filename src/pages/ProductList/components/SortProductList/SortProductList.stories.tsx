import type { StoryFn, Meta } from "@storybook/react-vite";
import SortProductList from "./SortProductList";
import type { QueryConfig } from "@hooks/useQueryConfig";

const defaultQueryConfig: QueryConfig = {
  page: "1",
  limit: "20",
  sort_by: "createdAt",
  order: "desc",
};

export default {
  title: "pages/ProductList/components/SortProductList",
  component: SortProductList,
  tags: ["autodocs"],
  argTypes: {
    queryConfig: {
      control: "object",
      description: "Query configuration object for sorting",
    },
    pageSize: {
      control: "number",
      description: "Number of items per page",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Product sorting and filtering component with various sort options and pagination info",
      },
    },
  },
} as Meta<typeof SortProductList>;

const Template: StoryFn<typeof SortProductList> = (args) => (
  <div className='bg-gray-300/40 p-3'>
    <SortProductList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  queryConfig: defaultQueryConfig,
  pageSize: 20,
};

export const SortByPrice = Template.bind({});
SortByPrice.args = {
  queryConfig: { ...defaultQueryConfig, sort_by: "price", order: "asc" },
  pageSize: 20,
};

export const SortByPriceDesc = Template.bind({});
SortByPriceDesc.args = {
  queryConfig: { ...defaultQueryConfig, sort_by: "price", order: "desc" },
  pageSize: 20,
};

export const SortByView = Template.bind({});
SortByView.args = {
  queryConfig: { ...defaultQueryConfig, sort_by: "view" },
  pageSize: 20,
};

export const SortBySold = Template.bind({});
SortBySold.args = {
  queryConfig: { ...defaultQueryConfig, sort_by: "sold" },
  pageSize: 20,
};

export const DifferentPage = Template.bind({});
DifferentPage.args = {
  queryConfig: { ...defaultQueryConfig, page: "3" },
  pageSize: 20,
};

export const SmallPageSize = Template.bind({});
SmallPageSize.args = {
  queryConfig: defaultQueryConfig,
  pageSize: 10,
};

export const LargePageSize = Template.bind({});
LargePageSize.args = {
  queryConfig: defaultQueryConfig,
  pageSize: 50,
};
