import fs from "fs/promises";
import Papa, { ParseResult } from "papaparse";

export async function readCSV(filePath: string): Promise<object[]> {
    const file = await fs.readFile(filePath, "utf-8");

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results: ParseResult<object>) => resolve(results.data),
            error: (err: Error) => reject(err)
        });
    });
}
