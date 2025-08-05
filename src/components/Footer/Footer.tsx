import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("home");

  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>{t("footer.copyright")}</div>
          </div>
          <div className='lg:col-span-2'>
            <div>{t("footer.country_region")}</div>
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          {t("footer.company")}
          <div className='mt-2'>{t("footer.address")}</div>
          <div className='mt-2'>{t("footer.person")}</div>
          <div className='mt-2'>{t("footer.tax_code")}</div>
          <div className='mt-2'>{t("footer.first_copyright")}</div>
        </div>
      </div>
    </footer>
  );
}
