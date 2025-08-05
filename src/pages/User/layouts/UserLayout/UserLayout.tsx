import UserSideNav from "@pages/User/components/UserSideNav";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  const { t } = useTranslation("profile");
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <Helmet>
        <title>{t("MyAccount")} | Shoppy</title>
        <meta name='description' content='User dashboard for managing account settings and preferences.' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
