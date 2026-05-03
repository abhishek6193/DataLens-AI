import fs from "fs/promises";
import Papa, { ParseResult } from "papaparse";

// Read a CSV file and return its contents as an array of objects
export async function readCSV(filePath: string): Promise<object[]> {
    try {
        const file = await fs.readFile(filePath, "utf-8"); // read the local file contents as a string

        return new Promise((resolve, reject) => {
            // Use PapaParse to parse the CSV string into an array of objects
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results: ParseResult<object>) => resolve(results.data),
                error: (err: Error) => reject(err)
            });
        });
    } catch (error) {
        console.error(`Error reading CSV file at ${filePath}: ${error}`);
        throw error;
    }
}
