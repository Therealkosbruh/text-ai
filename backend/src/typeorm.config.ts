import { DataSource } from "typeorm";
import CONNECTION from "./dbconnection";

//@ts-ignore
const AppDataSource = new DataSource({
    ...CONNECTION,
    entities: ["*/**/*.entity.ts"],
    migrations: ["src/migrations/*.ts"]
});

AppDataSource.initialize()
             .then(()=>{
                console.log("Datasource is initialized!");
             })
             .catch((error)=>{
                console.error("Error during Data Source initialization", error);
             })
export default AppDataSource;