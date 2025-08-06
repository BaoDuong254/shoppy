import CartHeader from "@components/CartHeader";
import Footer from "@components/Footer";
import { memo } from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

function CartLayoutInner({ children }: Props) {
  console.log("CartLayout");
  return (
    <div>
      <CartHeader />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
}

const CartLayout = memo(CartLayoutInner);

export default CartLayout;
