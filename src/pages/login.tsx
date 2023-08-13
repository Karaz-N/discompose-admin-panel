import React from "react";
import style from "../styles/Login.module.css";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { setCookie, getCookies } from "cookies-next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();

  return (
    <div className={style.container}>
      
      <div className={style.login}>
        <h1>discompose</h1>
        <h2>admin panel</h2>
        <form
          method="post"
          onSubmit={handleSubmit(async (data) => {
            const result = await fetch("/api/login", {
              method: "POST",
              body: JSON.stringify(data),
            });

            const jwt = (await result.json()) as { token?: string };

            console.log(jwt.token);

            if (jwt.token !== undefined) {
              sessionStorage.setItem("acc_token", jwt.token);
              push("/dashboard");
            } else {
              // redirect
              push("/login");
            }
          })}
        >
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
          />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />
          <button type="submit" value="submit">
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
