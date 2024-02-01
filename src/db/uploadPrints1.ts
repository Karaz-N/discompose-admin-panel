import { uploadPrints } from "./parser";

uploadPrints("src/db/printed_1.csv").then(() => {
    console.log("Prints 1 uploaded");
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    console.log("Prints 1 Done!");
  });