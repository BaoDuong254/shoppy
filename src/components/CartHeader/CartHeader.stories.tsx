/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react-vite";
import CartHeader from "./CartHeader";
import { AppContext } from "@contexts/app.context";
import { useState } from "react";
import type { User } from "@/types/user.type";
import type { ExtendedPurchase } from "@/types/purchase.type";

const meta: Meta<typeof CartHeader> = {
  title: "Components/CartHeader",
  component: CartHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    reactRouter: {
      routePath: "/cart",
    },
  },
};

export default meta;

// Mock user data
const mockUser: User = {
  _id: "1",
  roles: ["User"],
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: undefined,
  address: "123 Main St",
  phone: "555-0123",
  date_of_birth: undefined,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

const mockUserWithAvatar: User = {
  ...mockUser,
  name: "Jane Smith",
  email: "jane.smith@example.com",
  avatar: "https://api-ecom.duthanhduoc.com/images/839676bf-5124-454b-b3a0-6aa0e9656367.jpg",
};

// Template that overrides the global context with story-specific values
const Template: StoryFn<typeof CartHeader> = (args: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(args.isAuthenticated || false);
  const [profile, setProfile] = useState<User | null>(args.profile || null);
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([]);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    profile,
    setProfile,
    extendedPurchases,
    setExtendedPurchases,
    reset: () => {
      setIsAuthenticated(false);
      setProfile(null);
      setExtendedPurchases([]);
    },
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <AppContext.Provider value={contextValue}>
        <CartHeader />
      </AppContext.Provider>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isAuthenticated: false,
  profile: null,
};

export const AuthenticatedUser = Template.bind({});
AuthenticatedUser.args = {
  isAuthenticated: true,
  profile: mockUser,
};

export const AuthenticatedUserWithAvatar = Template.bind({});
AuthenticatedUserWithAvatar.args = {
  isAuthenticated: true,
  profile: mockUserWithAvatar,
};
AuthenticatedUserWithAvatar.storyName = "Authenticated User with Avatar";

export const GuestUser = Template.bind({});
GuestUser.args = {
  isAuthenticated: false,
  profile: null,
};
GuestUser.storyName = "Guest User (Not Authenticated)";

// Story for different user scenarios
const longNameUser: User = {
  ...mockUser,
  name: "John Alexander Smith-Johnson",
  email: "john.alexander.smith.johnson@verylongdomainexample.com",
};

export const LongUserName = Template.bind({});
LongUserName.args = {
  isAuthenticated: true,
  profile: longNameUser,
};
LongUserName.storyName = "User with Long Name and Email";
