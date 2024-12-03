import { promises as fs } from "fs";
import path from "path";

export const main = async () => {
    const data = await fs.readFile(
        path.resolve(__dirname, "..", "input"),
        "utf8"
    );

    const regex = /mul\(\d+,\d+\)/g;

    const matches = data.match(regex);

    const dataArray = matches?.map((item) =>
        item
            .replace("mul(", "")
            .replace(")", "")
            .split(",")
            .map((item) => parseInt(item))
    );
    let total = 0;
    dataArray?.forEach((item) => (total += item[0] * item[1]));

    console.log(total);
};
