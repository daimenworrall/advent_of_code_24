import { promises as fs } from "fs";
import path from "path";

export const main = async () => {
    const data = await fs.readFile(
        path.resolve(__dirname, "..", "input"),
        "utf8"
    );

    type Direction = { dx: number; dy: number };

    const directions: Direction[] = [
        { dx: 1, dy: 0 }, // horizontal right
        { dx: -1, dy: 0 }, // horizontal left
        { dx: 0, dy: 1 }, // vertical down
        { dx: 0, dy: -1 }, // vertical up
        { dx: 1, dy: 1 }, // diagonal down-right
        { dx: -1, dy: -1 }, // diagonal up-left
        { dx: 1, dy: -1 }, // diagonal down-left
        { dx: -1, dy: 1 }, // diagonal up-right
    ];

    function wordSearch(
        grid: string[],
        word: string
    ): { x: number; y: number; direction: Direction }[] {
        const rows = grid.length;
        const cols = grid[0].length;
        const wordLen = word.length;
        const matches: { x: number; y: number; direction: Direction }[] = [];

        function isInBounds(x: number, y: number): boolean {
            return x >= 0 && x < cols && y >= 0 && y < rows;
        }

        function checkDirection(
            x: number,
            y: number,
            direction: Direction
        ): boolean {
            for (let i = 0; i < wordLen; i++) {
                const nx = x + i * direction.dx;
                const ny = y + i * direction.dy;
                if (!isInBounds(nx, ny) || grid[ny][nx] !== word[i]) {
                    return false;
                }
            }
            return true;
        }

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                for (const direction of directions) {
                    if (checkDirection(x, y, direction)) {
                        matches.push({ x, y, direction });
                    }
                }
            }
        }

        return matches;
    }

    const grid = data.split("\n");
    const word = "XMAS";

    const results = wordSearch(grid, word);

    console.log(results.length);
};
