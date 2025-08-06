import type { StoryFn, Meta } from "@storybook/react-vite";
import Product from "./Product";
import type { Product as ProductType } from "@/types/product.type";

const mockProduct: ProductType = {
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
    "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action Button, and the most powerful iPhone camera system ever.",
  category: {
    _id: "60afafe76ef5b902180aacb5",
    name: "Điện thoại",
  },
  image: "https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02ecc7366cff.jpg",
  createdAt: "2021-05-27T14:55:33.851Z",
  updatedAt: "2024-12-07T13:58:28.611Z",
};

const mockCheapProduct: ProductType = {
  ...mockProduct,
  _id: "60afb1c56ef5b902180aacbb",
  name: "Áo thun cổ tròn basic nam nữ",
  price: 79000,
  price_before_discount: 120000,
  rating: 3.5,
  sold: 45,
  image: "https://api-ecom.duthanhduoc.com/images/sample-shirt.jpg",
};

const mockHighRatedProduct: ProductType = {
  ...mockProduct,
  _id: "60afb1c56ef5b902180aacbc",
  name: "MacBook Pro 16 inch M3 Max",
  price: 89990000,
  price_before_discount: 95000000,
  rating: 4.8,
  sold: 89,
  image: "https://api-ecom.duthanhduoc.com/images/sample-macbook.jpg",
};

export default {
  title: "pages/ProductList/components/Product",
  component: Product,
  tags: ["autodocs"],
  argTypes: {
    product: {
      control: "object",
      description: "Product data object",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Product card component that displays product information with image, name, price, rating and sales data",
      },
    },
  },
} as Meta<typeof Product>;

const Template: StoryFn<typeof Product> = (args) => (
  <div className='w-64'>
    <Product {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  product: mockProduct,
};

export const CheapProduct = Template.bind({});
CheapProduct.args = {
  product: mockCheapProduct,
};

export const HighRatedProduct = Template.bind({});
HighRatedProduct.args = {
  product: mockHighRatedProduct,
};

export const LongName = Template.bind({});
LongName.args = {
  product: {
    ...mockProduct,
    name: "Điện Thoại Apple iPhone 15 Pro Max 1TB - Natural Titanium - Chính hãng Apple Việt Nam - Bảo hành 12 tháng - Hỗ trợ trả góp 0% lãi suất",
  },
};

export const NoDiscount = Template.bind({});
NoDiscount.args = {
  product: {
    ...mockProduct,
    price_before_discount: mockProduct.price,
  },
};

export const LowRating = Template.bind({});
LowRating.args = {
  product: {
    ...mockProduct,
    rating: 2.1,
  },
};

export const HighSales = Template.bind({});
HighSales.args = {
  product: {
    ...mockProduct,
    sold: 15600,
  },
};

export const GridLayout: StoryFn<typeof Product> = () => (
  <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
    <Product product={mockProduct} />
    <Product product={mockCheapProduct} />
    <Product product={mockHighRatedProduct} />
    <Product product={{ ...mockProduct, _id: "4", name: "Sản phẩm 4" }} />
    <Product product={{ ...mockCheapProduct, _id: "5", name: "Sản phẩm 5" }} />
  </div>
);
