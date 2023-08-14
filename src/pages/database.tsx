import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "../styles/Admin.module.css";

const TOKEN = "AAAAB3NzaC1yc2EAAAADAQABAAABAQDAS2qxT/1alrcQACD4alH6DB3s+Ar13yj77s/TWDnxJhFXxDyr5R1757jeCf6f4d+FFA0sufo7ovUeSd7sijHiLfDJOrCEWGMBtQRUHH8O6+fPgrgXekDwr5F/5OwokzBOIOWjpVxjXUaX3YiS/7csjEL9vGXyFMRtdPQ5ly1jUkhYL8MqUFZLLRU+KMdz5W6mmoFVFQwZmBTxwA37ZEmHdJZV4xD2gGw2tWQbi1uwJF5ZUyO3Ha/Rz4Oi5REz27CGVwjoHUQvmpqQO+sVsOJz2KAsz0WYW4Jelc7SVBQiZtC5A7sMGJFZJkZe1htt2I4cUnI6x+u67Xa5TRuI/lHL";

export default function Database() {
	const { push } = useRouter();
	const [image, setImage] = useState<File | null>(null);
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		if (!sessionStorage.getItem("acc_token")) {
			push("/login");
		}
	});

	const onSubmit = async (path: string) => {
		const body = new FormData();

		if (!image) return;

		body.append("file", image);
		body.append("token", TOKEN);

		const res = await fetch(path, {
			method: "POST",
			body,
		});

		if (res.status !== 200) {
			// Redirect to login
		}

		const data = await res.json();

		// console.log(data);
	};

	return (
		<main className={style.databaseContainer}>
			<h1>what type of document do you want to upload?</h1>
			<section className={style.formContainer}>
				<form onSubmit={handleSubmit(() => onSubmit("/api/prints"))}>
					<h1>Prints</h1>
					<input
						type="file"
						accept=".csv"
						id="upload1"
						{...register("upload1")}
						onChange={(e) =>
							e.target.files ? setImage(e.target.files[0]) : setImage(null)
						}
						required
					/>

					<button type="submit" className="p-3">
						Submit
					</button>
				</form>

				<form onSubmit={handleSubmit(() => onSubmit("/api/images"))}>
					<h1>Images</h1>
					<input
						type="file"
						accept=".csv"
						id="upload2"
						{...register("upload2")}
						onChange={(e) =>
							e.target.files ? setImage(e.target.files[0]) : setImage(null)
						}
						required
					/>

					<button type="submit" className="p-3">
						Submit
					</button>
				</form>

				<form onSubmit={handleSubmit(() => onSubmit("/api/manuscripts"))}>
					<h1>Manuscripts</h1>
					<input
						type="file"
						accept=".csv"
						id="upload3"
						{...register("upload3")}
						onChange={(e) =>
							e.target.files ? setImage(e.target.files[0]) : setImage(null)
						}
						required
					/>

					<button type="submit" className="p-3">
						Submit
					</button>
				</form>
			</section>
		</main>
	);
}
