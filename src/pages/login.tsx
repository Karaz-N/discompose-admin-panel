import React from "react";
import style from "../styles/Login.module.css";

export default function Login() {
	return (
		<div className={style.container}>
			<div className={style.sideImg}>Ciao</div>
			<div className={style.login}>
				<h2>Login</h2>
				<form>
					<input type="text" placeholder="Username" />
					<input type="password" placeholder="Password" />
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}
