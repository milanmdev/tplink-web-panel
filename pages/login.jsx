import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { positions, types, useAlert } from "react-alert";

export default function Login() {
  let router = useRouter();
  let alert = useAlert();
  let [isProcessingUser, setIsProcessingUser] = useState(false);

  useEffect(() => {
    let UsernameData = localStorage.getItem("username");
    let PasswordData = localStorage.getItem("password");
    if (UsernameData && PasswordData) {
      checkPass();
    }
    async function checkPass() {
      let checkCredentials = await fetch(
        window.location.origin + "/api/check_credentials",
        {
          method: "POST",
          body: JSON.stringify({
            username: UsernameData,
            password: PasswordData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => await res.json())
        .catch((e) => undefined);
      console.log(checkCredentials);

      if (checkCredentials && checkCredentials.valid) return router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processUser = async (event) => {
    event.preventDefault();
    setIsProcessingUser(true);

    try {
      let username = event.target.username.value;
      let password = event.target.password.value;

      let checkCredentials = await fetch(
        window.location.origin + "/api/check_credentials",
        {
          method: "POST",
          body: JSON.stringify({
            username: event.target.username.value,
            password: event.target.password.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => await res.json())
        .catch((e) => undefined);
      console.log(checkCredentials);

      if (!checkCredentials || !checkCredentials.valid) {
        alert.error("Invalid username or password");
        setIsProcessingUser(false);
        return;
      } else {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      alert.error(
        "An error has occured while processing your request. Please try again later."
      );
    } finally {
      setIsProcessingUser(false);
    }
  };

  return (
    <>
      <div className="m-auto w-full max-w-md">
        <form
          className="bg-gray-700 shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={processUser}
        >
          <div className="text-white text-4xl flex justify-center border-b-2 py-4 pb-6 mb-4">
            TP-Link Web Panel
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-lg font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              name="username"
              type="username"
              required
              autoFocus
              placeholder="johndoe"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="password1234"
              name="password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              type="submit"
            >
              {isProcessingUser ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
