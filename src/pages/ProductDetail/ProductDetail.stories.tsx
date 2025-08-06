import type { StoryFn, Meta } from "@storybook/react-vite";
import ProductDetail from "./ProductDetail";
import MainLayout from "@layouts/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock product data
const mockProduct = {
  _id: "60afb1c56ef5b902180aacba",
  images: [
    "https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02ecc7366cff.jpg",
    "https://api-ecom.duthanhduoc.com/images/6c4f6bde-6242-40fd-be52-d06033636e04.jpg",
    "https://api-ecom.duthanhduoc.com/images/1385ed69-6843-4edb-9dd3-3146977a5825.jpg",
  ],
  price: 5990000,
  rating: 5,
  price_before_discount: 6990000,
  quantity: 138,
  sold: 1200,
  view: 1947,
  name: "Điện Thoại Apple iPhone 15 Pro Max 1TB - Natural Titanium",
  description:
    "<p>iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action Button, and the most powerful iPhone camera system ever.</p><p>Titanium. So strong. So light. So Pro.</p>",
  category: {
    _id: "60afafe76ef5b902180aacb5",
    name: "Điện thoại",
  },
  image: "https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02ecc7366cff.jpg",
  createdAt: "2021-05-27T14:55:33.851Z",
  updatedAt: "2024-12-07T13:58:28.611Z",
};

const mockProducts = [
  mockProduct,
  {
    ...mockProduct,
    _id: "60afb1c56ef5b902180aacbb",
    name: "iPhone 14 Pro Max",
    price: 4990000,
    price_before_discount: 5990000,
  },
];

// Create a mock QueryClient for Storybook
const createMockQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  // Pre-populate with mock data
  queryClient.setQueryData(["product", "60afb1c56ef5b902180aacba"], {
    data: { data: mockProduct },
  });

  queryClient.setQueryData(["products", { limit: "20", page: "1", category: "60afafe76ef5b902180aacb5" }], {
    data: {
      data: {
        products: mockProducts,
        pagination: { page: 1, limit: 20, page_size: 2 },
      },
    },
  });

  return queryClient;
};

export default {
  title: "pages/ProductDetail",
  component: ProductDetail,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const queryClient = createMockQueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} as Meta<typeof ProductDetail>;

const Template: StoryFn<typeof ProductDetail> = () => {
  return <ProductDetail />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  reactRouter: {
    routePath: "/:nameId",
    routeParams: { nameId: "iphone-15-pro-max-1tb-natural-titanium-i-60afb1c56ef5b902180aacba" },
  },
};

export const ProductDetailPage: StoryFn<typeof ProductDetail> = () => (
  <MainLayout>
    <ProductDetail />
  </MainLayout>
);

ProductDetailPage.parameters = {
  reactRouter: {
    routePath: "/:nameId",
    routeParams: { nameId: "iphone-15-pro-max-1tb-natural-titanium-i-60afb1c56ef5b902180aacba" },
  },
};

export const LoadingState: StoryFn<typeof ProductDetail> = () => {
  return (
    <MainLayout>
      <div className='container py-16'>
        <div className='grid grid-cols-12 gap-9'>
          <div className='col-span-5'>
            <div className='aspect-square animate-pulse bg-gray-200'></div>
          </div>
          <div className='col-span-7'>
            <div className='animate-pulse space-y-4'>
              <div className='h-8 w-3/4 rounded bg-gray-200'></div>
              <div className='h-4 w-1/2 rounded bg-gray-200'></div>
              <div className='h-6 w-1/3 rounded bg-gray-200'></div>
              <div className='h-20 rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const ErrorState: StoryFn<typeof ProductDetail> = () => {
  return (
    <MainLayout>
      <div className='container py-16'>
        <div className='text-center'>
          <h2 className='mb-4 text-2xl font-semibold text-gray-900'>Không tìm thấy sản phẩm</h2>
          <p className='mb-8 text-gray-600'>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <button className='rounded bg-orange px-6 py-2 text-white hover:bg-orange/80'>Quay lại trang chủ</button>
        </div>
      </div>
    </MainLayout>
  );
};
