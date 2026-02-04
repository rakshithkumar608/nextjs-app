import  connectDB  from "./db";
import { Board, Column } from "./models";


const DEFAULT_COLUMNS = [
    {
      name: "Wishlist",
      order: 0,  
    },
    { name: "Applied", order: 1},
    { name: "Interviewing", order: 2},
    { name: "Offer", order: 3},
    { name: "Rejected", order: 4},
]


export async function initializeUserBoard(userId: string) {
    try {
        await connectDB();

        // Check if the user already has a board
    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

    if (existingBoard) {
        return existingBoard;
    }

    // Create a Board
    const board = await Board.create({
        name: "Job Hunt",
        userId,
        columns: []    
    });

    // Create default columns
    const columns = await Promise.all(
        DEFAULT_COLUMNS.map((col) => Column.create({
            name: col.name,
            order: col.order,
            boardId: board._id,
            jobApplications: [],
        }))
    );

    // update the board with the new columns IDs
    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;

    } catch (err) {
        throw err;
    }
}