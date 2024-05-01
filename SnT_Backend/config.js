import { config } from "dotenv";
config()

const {DB_URL} = process.env
export const dbUri = DB_URL