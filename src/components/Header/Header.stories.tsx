/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./Header";
import { AppContext } from "@contexts/app.context";
import { useState } from "react";
import type { User } from "@/types/user.type";
import type { ExtendedPurchase } from "@/types/purchase.type";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    reactRouter: {
      routePath: "/",
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

// Mock purchases data
const mockPurchases: ExtendedPurchase[] = [
  {
    _id: "1",
    buy_count: 2,
    price: 150000,
    price_before_discount: 200000,
    status: -1,
    user: "user1",
    product: {
      _id: "product1",
      images: ["https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02edc388c956.jpg"],
      image: "https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02edc388c956.jpg",
      name: "Điện Thoại Di Động Samsung Galaxy A73 5G",
      price: 150000,
      price_before_discount: 200000,
      quantity: 100,
      sold: 50,
      view: 1000,
      rating: 4.5,
      category: {
        _id: "cat1",
        name: "Electronics",
      },
      description: "Smartphone cao cấp",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    },
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    checked: false,
    disabled: false,
  },
  {
    _id: "2",
    buy_count: 1,
    price: 89000,
    price_before_discount: 120000,
    status: -1,
    user: "user1",
    product: {
      _id: "product2",
      images: ["https://api-ecom.duthanhduoc.com/images/51c31071-23d3-4dfa-9ffa-6f8a9c9bf61c.jpg"],
      image: "https://api-ecom.duthanhduoc.com/images/51c31071-23d3-4dfa-9ffa-6f8a9c9bf61c.jpg",
      name: "Tai nghe Bluetooth Sony WH-1000XM4",
      price: 89000,
      price_before_discount: 120000,
      quantity: 50,
      sold: 25,
      view: 500,
      rating: 4.8,
      category: {
        _id: "cat2",
        name: "Accessories",
      },
      description: "Tai nghe chống ồn",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    },
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    checked: false,
    disabled: false,
  },
];

const Template: StoryFn<typeof Header> = (args: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(args.isAuthenticated || false);
  const [profile, setProfile] = useState<User | null>(args.profile || null);
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(args.purchases || []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

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
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export const GuestUser = Template.bind({});
GuestUser.args = {
  isAuthenticated: false,
  profile: null,
  purchases: [],
};

export const AuthenticatedUserEmptyCart = Template.bind({});
AuthenticatedUserEmptyCart.args = {
  isAuthenticated: true,
  profile: mockUser,
  purchases: [],
};

export const AuthenticatedUserWithCart = Template.bind({});
AuthenticatedUserWithCart.args = {
  isAuthenticated: true,
  profile: mockUserWithAvatar,
  purchases: mockPurchases,
};

export const UserWithManyItemsInCart = Template.bind({});
UserWithManyItemsInCart.args = {
  isAuthenticated: true,
  profile: mockUserWithAvatar,
  purchases: [
    ...mockPurchases,
    ...mockPurchases.map((purchase, index) => ({
      ...purchase,
      _id: `extra-${index}`,
      product: {
        ...purchase.product,
        _id: `product-extra-${index}`,
        name: `Sản phẩm thêm ${index + 1}`,
      },
    })),
  ],
};

const HeaderWithProps = ({
  isAuthenticated = false,
  profile = null,
  purchases = [],
}: {
  isAuthenticated?: boolean;
  profile?: User | null;
  purchases?: ExtendedPurchase[];
}) => {
  const [authState, setAuthState] = useState(isAuthenticated);
  const [profileState, setProfileState] = useState<User | null>(profile);
  const [purchaseState, setPurchaseState] = useState<ExtendedPurchase[]>(purchases);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const contextValue = {
    isAuthenticated: authState,
    setIsAuthenticated: setAuthState,
    profile: profileState,
    setProfile: setProfileState,
    extendedPurchases: purchaseState,
    setExtendedPurchases: setPurchaseState,
    reset: () => {
      setAuthState(false);
      setProfileState(null);
      setPurchaseState([]);
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export const AllComponents = () => (
  <div className='space-y-8'>
    {/* Guest user */}
    <div>
      <h3 className='mb-4 px-4 text-lg font-semibold'>Guest User (Chưa đăng nhập)</h3>
      <HeaderWithProps isAuthenticated={false} profile={null} purchases={[]} />
    </div>

    {/* Authenticated user with empty cart */}
    <div>
      <h3 className='mb-4 px-4 text-lg font-semibold'>Authenticated User - Empty Cart</h3>
      <HeaderWithProps isAuthenticated={true} profile={mockUser} purchases={[]} />
    </div>

    {/* Authenticated user with items in cart */}
    <div>
      <h3 className='mb-4 px-4 text-lg font-semibold'>Authenticated User - With Cart Items</h3>
      <HeaderWithProps isAuthenticated={true} profile={mockUserWithAvatar} purchases={mockPurchases} />
    </div>

    <div className='space-y-2 px-4 text-sm text-gray-600'>
      <p>
        <strong>Các tính năng chính:</strong>
      </p>
      <ul className='list-inside list-disc space-y-1'>
        <li>NavHeader với language selector và user menu</li>
        <li>Logo Shopee có thể click để về trang chủ</li>
        <li>Search bar với form submission</li>
        <li>Shopping cart icon với số lượng sản phẩm</li>
        <li>Cart popover hiển thị preview sản phẩm trong giỏ</li>
        <li>Responsive design cho mobile và desktop</li>
        <li>Gradient background với màu orange đặc trưng</li>
      </ul>
    </div>
  </div>
);

export const SearchFunctionality = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const contextValue = {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    profile: null,
    setProfile: () => {},
    extendedPurchases: [],
    setExtendedPurchases: () => {},
    reset: () => {},
  };

  return (
    <div className='space-y-4'>
      <h3 className='px-4 text-lg font-semibold'>Search Functionality Demo</h3>

      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={contextValue}>
          <Header />
        </AppContext.Provider>
      </QueryClientProvider>

      <div className='space-y-2 px-4 text-sm text-gray-600'>
        <p>
          <strong>Test search:</strong>
        </p>
        <ul className='list-inside list-disc space-y-1'>
          <li>Nhập từ khóa vào search box</li>
          <li>Nhấn Enter hoặc click nút search</li>
          <li>Form sẽ submit và redirect với query parameters</li>
          <li>Search hoạt động với React Hook Form</li>
        </ul>
      </div>
    </div>
  );
};

export const CartPopoverDemo = () => (
  <div className='space-y-6'>
    <h3 className='px-4 text-lg font-semibold'>Cart Popover Demo</h3>

    <div className='space-y-4'>
      <div>
        <h4 className='mb-2 px-4 font-medium'>Empty Cart</h4>
        <HeaderWithProps isAuthenticated={true} profile={mockUser} purchases={[]} />
      </div>

      <div>
        <h4 className='mb-2 px-4 font-medium'>Cart with Items</h4>
        <HeaderWithProps isAuthenticated={true} profile={mockUserWithAvatar} purchases={mockPurchases} />
      </div>

      <div>
        <h4 className='mb-2 px-4 font-medium'>Cart with Many Items</h4>
        <HeaderWithProps
          isAuthenticated={true}
          profile={mockUserWithAvatar}
          purchases={[
            ...mockPurchases,
            ...mockPurchases.map((purchase, index) => ({
              ...purchase,
              _id: `extra-${index}`,
              product: {
                ...purchase.product,
                _id: `product-extra-${index}`,
                name: `Sản phẩm thêm ${index + 1}`,
              },
            })),
          ]}
        />
      </div>
    </div>

    <div className='space-y-2 px-4 text-sm text-gray-600'>
      <p>
        <strong>Hướng dẫn:</strong>
      </p>
      <ul className='list-inside list-disc space-y-1'>
        <li>Hover vào icon giỏ hàng để xem popover</li>
        <li>Popover hiển thị tối đa 5 sản phẩm gần nhất</li>
        <li>Hiển thị hình ảnh, tên và giá sản phẩm</li>
        <li>Có link "Xem giỏ hàng" để đi đến trang cart</li>
        <li>Nếu giỏ trống sẽ hiển thị icon "no product"</li>
        <li>Badge hiển thị tổng số sản phẩm trong giỏ</li>
      </ul>
    </div>
  </div>
);

export const ResponsiveLayout = () => (
  <div className='space-y-6'>
    <h3 className='px-4 text-lg font-semibold'>Responsive Layout</h3>

    <HeaderWithProps isAuthenticated={true} profile={mockUserWithAvatar} purchases={mockPurchases} />

    <div className='space-y-2 px-4 text-sm text-gray-600'>
      <p>
        <strong>Responsive features:</strong>
      </p>
      <ul className='list-inside list-disc space-y-1'>
        <li>Grid layout: logo (2 cols), search (9 cols), cart (1 col)</li>
        <li>Container với max-width responsive</li>
        <li>Logo tự động scale theo screen size</li>
        <li>Search bar flexible width</li>
        <li>Cart icon luôn ở góc phải</li>
        <li>NavHeader responsive với language và user menu</li>
      </ul>
      <p className='mt-4'>
        <strong>Thử nghiệm:</strong> Thay đổi kích thước browser để xem layout thích ứng
      </p>
    </div>
  </div>
);
