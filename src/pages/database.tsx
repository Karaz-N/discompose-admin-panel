import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Database() {
  const [image, setImage] = useState<File | null>(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    const body = new FormData();

    if (!image) return;

    body.append("file", image);

    const res = await fetch("/api/prints", {
      method: "POST",
      body,
    }).then((res) => res.json());

    console.log(res);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          accept=".csv"
          id="upload"
          {...register("upload")}
          onChange={(e) =>
            e.target.files ? setImage(e.target.files[0]) : setImage(null)
          }
          required
        />

        <button type="submit" className="p-3">
          Submit
        </button>
      </form>
    </>
  );
}
