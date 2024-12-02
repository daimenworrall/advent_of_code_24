import { promises as fs } from "fs";
import path from "path";

export const main = async () => {
    const data = await fs.readFile(
        path.resolve(__dirname, "..", "input"),
        "utf8"
    );
    const lines = data.split("\n");

    let col1: any[] = [];
    let col2: any[] = [];

    lines.map((line: string) => {
        const lineData = line.split("   ");

        col1.push(parseInt(lineData[0]));
        col2.push(parseInt(lineData[1]));
    });

    col1.sort(function (a: number, b: number) {
        return a - b;
    });
    col2.sort(function (a: number, b: number) {
        return a - b;
    });

    let difference: any[] = [];

    for (let i = 0; i < col1.length; i++) {
        difference.push(Math.abs(col1[i] - col2[i]));
    }

    let sum: number = 0;

    difference.map((item) => (sum += item));

    console.log(sum);
};
