import { promises as fs } from "fs";
import path from "path";

export const main = async () => {
    const data = await fs.readFile(
        path.resolve(__dirname, "..", "input"),
        "utf8"
    );

    const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;

    const matches = data.match(regex);

    let run = true;

    let total = 0;

    const dataArray = matches?.forEach((item) => {
        switch (item) {
            case "do()":
                run = true;
                break;
            case "don't()":
                run = false;
                break;
            default:
                if (run === false) break;
                const vals = item
                    .replace("mul(", "")
                    .replace(")", "")
                    .split(",")
                    .map((item) => parseInt(item));
                total += vals[0] * vals[1];
        }
    });

    console.log(total);
};
