import { uploadPrints } from "./parser";

uploadPrints("src/db/printed_2.csv").then(() => {
    console.log("Prints 2 uploaded");
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    console.log("Prints 2 Done!");
  });