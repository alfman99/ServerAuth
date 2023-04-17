import path from "path";
import JSONdb from "simple-json-db";

export default new JSONdb(path.resolve() + "/db/db.json");