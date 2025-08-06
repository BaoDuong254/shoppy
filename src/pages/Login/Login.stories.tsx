import type { StoryFn, Meta } from "@storybook/react-vite";
import Login from "./Login";
import path from "@constants/path";
import RegisterLayout from "@layouts/RegisterLayout";

export default {
  title: "pages/Login",
  component: Login,
} as Meta<typeof Login>;

const Template: StoryFn<typeof Login> = () => {
  return <Login />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: path.login,
  },
};

export const LoginPage: StoryFn<typeof Login> = () => (
  <RegisterLayout>
    <Login />
  </RegisterLayout>
);

LoginPage.parameters = {
  reactRouter: {
    routePath: path.login,
  },
};
