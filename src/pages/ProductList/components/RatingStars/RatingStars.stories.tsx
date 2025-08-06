import type { StoryFn, Meta } from "@storybook/react-vite";
import RatingStars from "./RatingStars";
import type { QueryConfig } from "@hooks/useQueryConfig";

const defaultQueryConfig: QueryConfig = {
  page: "1",
  limit: "20",
  sort_by: "createdAt",
  order: "desc",
};

export default {
  title: "pages/ProductList/components/RatingStars",
  component: RatingStars,
  tags: ["autodocs"],
  argTypes: {
    queryConfig: {
      control: "object",
      description: "Query configuration object",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Rating filter component allowing users to filter products by star rating",
      },
    },
  },
} as Meta<typeof RatingStars>;

const Template: StoryFn<typeof RatingStars> = (args) => (
  <div className='w-48 bg-white p-4'>
    <h3 className='mb-2 text-sm font-semibold'>Đánh giá</h3>
    <RatingStars {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  queryConfig: defaultQueryConfig,
};

export const WithRatingFilter = Template.bind({});
WithRatingFilter.args = {
  queryConfig: { ...defaultQueryConfig, rating_filter: "4" },
};
