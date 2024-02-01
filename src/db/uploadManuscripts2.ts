import { uploadManuscripts } from "./parser";

uploadManuscripts("src/db/manuscripts_2.csv").then(() => {
    console.log("Manuscripts 2 uploaded");
 }).catch((err) => {
    console.log(err);
 }).finally(() => {
    console.log("Manuscripts 2 Done!");
 });