import React from "react";
import style from "../styles/Login.module.css";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { setCookie, getCookies } from "cookies-next";

export default function Login() {
  const { register, handleSubmit } = useForm();

  return (
    <div className={style.container}>
      <div className={style.sideImg}>Ciao</div>
      <div className={style.login}>
        <h2>Login</h2>
        <form
          method="post"
          onSubmit={handleSubmit(async (data) => {
            alert(JSON.stringify(data));
            console.log(data);
            const result = await fetch("/api/login", {
              method: "POST",
              body: JSON.stringify(data),
            });

            const jwt = (await result.json()) as { token?: string };

            console.log(jwt.token);

            if (jwt.token !== undefined) {
              setCookie("_session", jwt.token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60,
              });

              console.log(getCookies());
            } else {
              // redirect
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
