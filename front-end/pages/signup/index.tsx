import Head from "next/head"
import UserSignupForm from "../../components/users/UserSignupForm"
import Header from "../../components/header"

const Signup: React.FC = () => {
    return (
    <>
    <Head>
        <title>User Registration</title>
    </Head>
    <Header/>
    <section  className="p-6 min-h-screen flex flex-col items-center">
        <UserSignupForm/>
    </section>
    </>
    )
}
export default Signup;