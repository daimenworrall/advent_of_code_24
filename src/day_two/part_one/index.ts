import { promises as fs } from "fs";
import path from "path";

export const main = async () => {
    const file = await fs.readFile(
        path.resolve(__dirname, "..", "input"),
        "utf8"
    );
    const lines = file.split("\n");
    const data = lines.map((row) =>
        row.split(" ").map((item) => parseInt(item))
    );

    let totalSafe = 0;

    data.forEach((row) => {
        let safe = true;
        let direction = null;

        for (let i = 1; i < row.length; i++) {
            const diff = row[i] - row[i - 1];

            if (diff === 0) {
                safe = false;
                break;
            }

            if (Math.abs(diff) > 3) {
                safe = false;
                break;
            }

            const currentDirection = diff > 0 ? "increasing" : "decreasing";
            if (direction === null) {
                direction = currentDirection;
            } else if (direction !== currentDirection) {
                safe = false;
                break;
            }
        }

        if (safe) {
            totalSafe++;
        }
    });

    console.log(totalSafe);
};
