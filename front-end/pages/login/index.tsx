import Head from "next/head";
import Header from "../../components/header";
import UserLoginFrom from "../../components/users/UserLoginForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("login.title")}</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 min-h-screen flex flex-col items-center">
          <UserLoginFrom />

        </section>
      </main>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Login;
