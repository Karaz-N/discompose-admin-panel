import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { LayoutStore } from "../../Store/store";

export default function Database() {
  const [image, setImage] = useState<File | null>(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (path: string) => {
    const body = new FormData();

    if (!image) return;

    body.append("file", image);

    const res = await fetch(path, {
      method: "POST",
      body,
    }).then((res) => res.json());

    console.log(res);
  };

  // const setShowLayoutAdmin = LayoutStore((state) => state.setShow);

  // useEffect(() => {
  //     setShowLayoutAdmin(false);
  // }, [])

  return (
    <>
      <form onSubmit={handleSubmit(() => onSubmit("/api/prints"))}>
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
    </>
  );
}
