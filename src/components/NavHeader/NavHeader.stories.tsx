/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react-vite";
import NavHeader from "./NavHeader";
import { AppContext } from "@contexts/app.context";
import { useState } from "react";
import type { User } from "@/types/user.type";
import type { ExtendedPurchase } from "@/types/purchase.type";

const meta: Meta<typeof NavHeader> = {
  title: "Components/NavHeader",
  component: NavHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    reactRouter: {
      routePath: "/",
    },
    backgrounds: {
      default: "orange",
      values: [
        { name: "orange", value: "#f53d2d" },
        { name: "white", value: "#ffffff" },
      ],
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

const Template: StoryFn<typeof NavHeader> = (args: any) => {
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
    <div className='bg-orange p-4 text-white'>
      <AppContext.Provider value={contextValue}>
        <NavHeader />
      </AppContext.Provider>
    </div>
  );
};

export const GuestUser = Template.bind({});
GuestUser.args = {
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

export const LongEmailUser = Template.bind({});
LongEmailUser.args = {
  isAuthenticated: true,
  profile: {
    ...mockUser,
    email: "very.long.email.address@example.com",
  },
};

export const AllStates = () => (
  <div className='space-y-8 bg-gray-100 p-6'>
    <div>
      <h3 className='mb-4 text-lg font-semibold text-gray-800'>Guest User (Not Authenticated)</h3>
      <div className='rounded bg-orange p-4 text-white'>
        <AppContext.Provider
          value={{
            isAuthenticated: false,
            setIsAuthenticated: () => {},
            profile: null,
            setProfile: () => {},
            extendedPurchases: [],
            setExtendedPurchases: () => {},
            reset: () => {},
          }}
        >
          <NavHeader />
        </AppContext.Provider>
      </div>
    </div>

    <div>
      <h3 className='mb-4 text-lg font-semibold text-gray-800'>Authenticated User Without Avatar</h3>
      <div className='rounded bg-orange p-4 text-white'>
        <AppContext.Provider
          value={{
            isAuthenticated: true,
            setIsAuthenticated: () => {},
            profile: mockUser,
            setProfile: () => {},
            extendedPurchases: [],
            setExtendedPurchases: () => {},
            reset: () => {},
          }}
        >
          <NavHeader />
        </AppContext.Provider>
      </div>
    </div>

    <div>
      <h3 className='mb-4 text-lg font-semibold text-gray-800'>Authenticated User With Avatar</h3>
      <div className='rounded bg-orange p-4 text-white'>
        <AppContext.Provider
          value={{
            isAuthenticated: true,
            setIsAuthenticated: () => {},
            profile: mockUserWithAvatar,
            setProfile: () => {},
            extendedPurchases: [],
            setExtendedPurchases: () => {},
            reset: () => {},
          }}
        >
          <NavHeader />
        </AppContext.Provider>
      </div>
    </div>

    <div className='mt-6 space-y-2 text-sm text-gray-600'>
      <p>
        <strong>Tính năng chính:</strong>
      </p>
      <ul className='list-inside list-disc space-y-1'>
        <li>Chuyển đổi ngôn ngữ (Tiếng Việt / English)</li>
        <li>Menu user với avatar và email khi đã đăng nhập</li>
        <li>Link Đăng ký / Đăng nhập khi chưa authenticate</li>
        <li>Dropdown menu với các option: Tài khoản, Đơn mua, Đăng xuất</li>
        <li>Hover effects và responsive design</li>
      </ul>
    </div>
  </div>
);

export const LanguageSelector = () => (
  <div className='space-y-4 p-6'>
    <h3 className='text-lg font-semibold text-gray-800'>Language Selector Component</h3>
    <div className='rounded bg-orange p-4 text-white'>
      <AppContext.Provider
        value={{
          isAuthenticated: false,
          setIsAuthenticated: () => {},
          profile: null,
          setProfile: () => {},
          extendedPurchases: [],
          setExtendedPurchases: () => {},
          reset: () => {},
        }}
      >
        <NavHeader />
      </AppContext.Provider>
    </div>
    <div className='text-sm text-gray-600'>
      <p>
        <strong>Hướng dẫn:</strong> Hover vào phần chọn ngôn ngữ để xem dropdown menu
      </p>
    </div>
  </div>
);

export const UserMenu = () => (
  <div className='space-y-4 p-6'>
    <h3 className='text-lg font-semibold text-gray-800'>User Menu Component</h3>
    <div className='rounded bg-orange p-4 text-white'>
      <AppContext.Provider
        value={{
          isAuthenticated: true,
          setIsAuthenticated: () => {},
          profile: mockUserWithAvatar,
          setProfile: () => {},
          extendedPurchases: [],
          setExtendedPurchases: () => {},
          reset: () => {},
        }}
      >
        <NavHeader />
      </AppContext.Provider>
    </div>
    <div className='text-sm text-gray-600'>
      <p>
        <strong>Hướng dẫn:</strong> Hover vào phần user (avatar + email) để xem dropdown menu
      </p>
    </div>
  </div>
);

export const ResponsiveTest = () => (
  <div className='space-y-6'>
    <h3 className='text-lg font-semibold text-gray-800'>Responsive Design Test</h3>

    <div className='rounded bg-orange p-4 text-white'>
      <AppContext.Provider
        value={{
          isAuthenticated: true,
          setIsAuthenticated: () => {},
          profile: mockUserWithAvatar,
          setProfile: () => {},
          extendedPurchases: [],
          setExtendedPurchases: () => {},
          reset: () => {},
        }}
      >
        <NavHeader />
      </AppContext.Provider>
    </div>

    <div className='space-y-2 text-sm text-gray-600'>
      <p>
        <strong>Test responsive:</strong>
      </p>
      <ul className='list-inside list-disc space-y-1'>
        <li>Thay đổi kích thước browser để kiểm tra layout</li>
        <li>Trên mobile, các element có thể stack vertically</li>
        <li>Hover effects work trên desktop</li>
        <li>Touch-friendly trên mobile devices</li>
      </ul>
    </div>
  </div>
);
