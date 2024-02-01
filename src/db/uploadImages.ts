import { uploadImages } from "./parser";

uploadImages("src/db/images.csv").then(() => {
    console.log("Images uploaded");
 }).catch((err) => {
    console.log(err);
 }).finally(() => {
    console.log("Images Done!");
 });