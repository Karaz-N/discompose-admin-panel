import { uploadManuscripts } from "./parser";

uploadManuscripts("src/db/manuscripts_1.csv").then(() => {
    console.log("Manuscripts 1 uploaded");
 }).catch((err) => {
    console.log(err);
 }).finally(() => {
    console.log("Manuscripts 1 Done!");
 });