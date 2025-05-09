import { useEffect, useState } from "react";
import { User } from "../../types";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Header from "../../components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserService from "../../services/UserService";

const Account: React.FC = () => {
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();
  const [areYouSure, setAreYouSure] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  useEffect(() => {
    setloggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

  const handleDelete = async () => {
    const username = loggedInUser?.username;
    const user = { username, password };

    if (password.trim() !== "") {
      const response = await UserService.deleteUser(
        loggedInUser?.username,
        user
      );
      if (response.status === 200) {
        localStorage.removeItem("loggedInUser");
        setloggedInUser(null);
        window.location.href = "/login";
      } else {
        console.error("Failed to delete user");
      }
    } else {
      alert("Please enter your password to confirm deletion.");
    }
  };

  const handleChangePassword = async () => {
    const username = loggedInUser?.username;
    const user = { username, password };
    if (password.trim() !== "") {
      const response = await UserService.changePassword(
        loggedInUser?.username,
        user,
        newPassword
      );
      if (response.status === 200) {
        alert("Password changed successfully.");
        setConfirmPassword(false);
      } else {
        console.error("Failed to change password");
      }
    } else {
      alert("Please enter your password to confirm change.");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold m-1">{t("account.title")}</h1>
        <p className="font-semibold text-s">{t("account.p")} </p>
        <div className="bg-[#e2dbd3] p-6 rounded-lg shadow-md w-96">
          <p className="text-gray-700 mb-2">
            {t("account.username")}: {loggedInUser?.username}
          </p>
          <p className="text-gray-700 mb-2">
            {t("account.role")}: {loggedInUser?.role}
          </p>
        </div>
        {areYouSure && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            style={{ zIndex: 9999 }}
          >
            <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
              <h3 className="font-semibold">Are you sure?</h3>
              <p>Do you really want to delete your account?</p>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded p-2 mt-4 w-full"
              />
              <div className="flex flex-row p-2 m-2 justify-evenly">
                <button
                  className="rounded bg-[#b1a27b] hover:bg-[#9d8e68] text-[#000000] mt-2"
                  onClick={() => {
                    setAreYouSure(false);
                    handleDelete();
                    setPassword("");
                  }}
                >
                  Yes
                </button>
                <button
                  className="rounded bg-[#b1a27b] hover:bg-[#9d8e68] text-[#000000] mt-2"
                  onClick={() => {
                    setAreYouSure(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {confirmPassword && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            style={{ zIndex: 9999 }}
          >
            <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
              <h3 className="font-semibold">Confirm change of password</h3>
              <p>Confirm by entering your old password?</p>
              <input
                type="password"
                placeholder="Enter your old password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded p-2  mb-2 w-full"
              />
              <p>New password: </p>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              />
              <div className="flex flex-row p-2 m-2 justify-evenly">
                <button
                  className="rounded bg-[#b1a27b] hover:bg-[#9d8e68] text-[#000000] mt-2"
                  onClick={() => {
                    setConfirmPassword(false);
                    handleChangePassword();
                    setNewPassword("");
                    setPassword("");
                  }}
                >
                  Change
                </button>
                <button
                  className="rounded bg-red-400 hover:bg-red-500 text-[#000000] mt-2"
                  onClick={() => {
                    setConfirmPassword(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            className="bg-red-400 text-white m-2 rounded"
            onClick={() => {
              setAreYouSure(true);
            }}
          >
            Delete account
          </button>
          <button
            className="bg-blue-600 text-white m-2 rounded"
            onClick={() => {
              setConfirmPassword(true);
            }}
          >
            Change Password
          </button>
        </div>
      </div>
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

export default Account;
