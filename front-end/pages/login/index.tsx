import Head from "next/head";
import Header from "../../components/header";
import UserLoginFrom from "../../components/users/UserLoginForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserTableHome from "../../components/users/UserTableHome";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const data = [
    { username: "admin", password: "admin123", role: "Admin" },
    {
      username: "ode_m",
      password: "ode123",
      role: "User",
    },
    {
      username: "lotte_g",
      password: "lotte123",
      role: "User",
    },
    {
      username: "guest",
      password: "guest132",
      role: "Guest",
    },
  ];
  return (
    <>
      <Head>
        <title>{t("login.title")}</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 min-h-screen flex flex-col items-center">
          <UserLoginFrom />
          <div className="mt-6">
          {data && <UserTableHome users={data} />}
          </div>
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
