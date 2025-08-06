import type { StoryFn, Meta } from "@storybook/react-vite";
import Register from "./Register";
import path from "@constants/path";
import RegisterLayout from "@layouts/RegisterLayout";

export default {
  title: "pages/Register",
  component: Register,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Register>;

const Template: StoryFn<typeof Register> = () => {
  return <Register />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: path.register,
  },
};

export const RegisterPage: StoryFn<typeof Register> = () => (
  <RegisterLayout>
    <Register />
  </RegisterLayout>
);

RegisterPage.parameters = {
  reactRouter: {
    routePath: path.register,
  },
};
