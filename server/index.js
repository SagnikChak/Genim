import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get('/', async (req, res) => {
    res.send("Hello from AI!!");
})

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
<<<<<<< HEAD
        app.listen(process.env.PORT, 'localhost', () => console.log("Server has started on port http://localhost:8080"));
=======
        app.listen(process.env.PORT, '0.0.0.0', () => console.log("Server has started on port http://localhost:8080"));
>>>>>>> b1523eda77e32b04070fba54065ba2fafb21530c
    } catch (error) {
        console.log(error);
    }
}

startServer();
