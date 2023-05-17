import { app } from "./app";
import { AppDataSource } from "./database";

AppDataSource.initialize();

app.listen(process.env.PORT || 3000, () => console.log("Running in port 3333"));
