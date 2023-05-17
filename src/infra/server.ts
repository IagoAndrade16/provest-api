import { app } from "./app";
import { AppDataSource } from "./database";

AppDataSource.initialize();

app.listen(process.env.PORT, () => console.log("Running in port 3333"));
