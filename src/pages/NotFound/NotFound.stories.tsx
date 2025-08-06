import type { StoryFn, Meta } from "@storybook/react-vite";
import NotFound from "./NotFound";

export default {
  title: "pages/NotFound",
  component: NotFound,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof NotFound>;

const Template: StoryFn<typeof NotFound> = () => {
  return <NotFound />;
};

export const Primary = Template.bind({});

export const NotFoundPage: StoryFn<typeof NotFound> = () => <NotFound />;

NotFoundPage.parameters = {
  docs: {
    description: {
      story: "404 Error page displayed when user navigates to non-existent routes",
    },
  },
};
