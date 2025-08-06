import type { StoryFn, Meta } from "@storybook/react-vite";
import AsideFilter from "./AsideFilter";
import type { QueryConfig } from "@hooks/useQueryConfig";

const mockCategories = [
  { _id: "60afafe76ef5b902180aacb5", name: "Áo thun" },
  { _id: "60afafe76ef5b902180aacb6", name: "Áo khoác" },
  { _id: "60afafe76ef5b902180aacb7", name: "Quần jean" },
  { _id: "60afafe76ef5b902180aacb8", name: "Giày dép" },
  { _id: "60afafe76ef5b902180aacb9", name: "Phụ kiện" },
];

const defaultQueryConfig: QueryConfig = {
  page: "1",
  limit: "20",
  sort_by: "createdAt",
  order: "desc",
};

export default {
  title: "pages/ProductList/components/AsideFilter",
  component: AsideFilter,
  tags: ["autodocs"],
  argTypes: {
    queryConfig: {
      control: "object",
      description: "Query configuration object for filtering",
    },
    categories: {
      control: "object",
      description: "Array of product categories",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Filter sidebar component for ProductList page with category selection, price range and rating filters",
      },
    },
  },
} as Meta<typeof AsideFilter>;

const Template: StoryFn<typeof AsideFilter> = (args) => (
  <div className='w-64 bg-white p-4'>
    <AsideFilter {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  queryConfig: defaultQueryConfig,
  categories: mockCategories,
};

export const WithCategorySelected = Template.bind({});
WithCategorySelected.args = {
  queryConfig: { ...defaultQueryConfig, category: "60afafe76ef5b902180aacb5" },
  categories: mockCategories,
};

export const WithPriceFilter = Template.bind({});
WithPriceFilter.args = {
  queryConfig: { ...defaultQueryConfig, price_min: "100000", price_max: "500000" },
  categories: mockCategories,
};

export const WithRatingFilter = Template.bind({});
WithRatingFilter.args = {
  queryConfig: { ...defaultQueryConfig, rating_filter: "4" },
  categories: mockCategories,
};

export const WithAllFilters = Template.bind({});
WithAllFilters.args = {
  queryConfig: {
    ...defaultQueryConfig,
    category: "60afafe76ef5b902180aacb6",
    price_min: "200000",
    price_max: "1000000",
    rating_filter: "3",
  },
  categories: mockCategories,
};

export const EmptyCategories = Template.bind({});
EmptyCategories.args = {
  queryConfig: defaultQueryConfig,
  categories: [],
};
