import { client } from "../db";
import type { Manuscript, Event } from "../db";
import Papa, { ParseResult } from "papaparse";

const parseData: () => Promise<Manuscript[]> = async () => {

    function preview_csv(e : any){
        if(!e.target.files.length){
            alert("Please choose a csv file ... ")
            return
        }
        const file = e.target.files[0];

        Papa.parse(file, {
            header: true,
            complete: function(results: ParseResult<Record<Manuscript, unknown>>[]) {
                if (results && results.length > 0) {
                  console.log(typeof(results))
                    console.log(results)
                }
            }
        });
    }

    


    return(data)
}