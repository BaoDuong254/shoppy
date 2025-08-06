import Footer from "@components/Footer";
import Header from "@components/Header";
import { memo } from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

function MainLayoutInner({ children }: Props) {
  console.log("MainLayout");
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
}

const MainLayout = memo(MainLayoutInner);

export default MainLayout;
