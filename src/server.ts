import express, { json } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import customerRouts from "./routes/Customer";
import discountRouts from "./routes/Discount";
import priceRoutes from "./routes/Price";
import calculate from "./routes/Calculator";

// Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";

const router = express();
const specs = swaggerJsDoc(options);
router.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

mongoose.set("strictQuery", false);

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        Logging.info("Connected");
        StartServer();
    })
    .catch((error) => {
        Logging.error("Unable to connect");
        Logging.error(error);
    });

//u slucaj da nesto pukne pri pocetku da se nista ne poziva
const StartServer = () => {
    router.use((req, res, next) => {
        //logovi za requesta
        Logging.info(`Req : [${req.method}]  Url: [${req.url}]  IP: [${req.socket.remoteAddress}]`);

        //logovi za response
        res.on("finish", () => {
            Logging.info(`Req : [${req.method}]  Url: [${req.url}]  IP: [${req.socket.remoteAddress}]  Status: [${res.statusCode}]`);
        });

        //omogucava ne zaustavljanje poziva
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        //mogu requests doci od bilokuda se dodati jos i IP za privatnosti
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        //dopusta koji su hederi dozvoljeni u projektu
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }

        next();
    });

    //Rute
    router.use("/customers", customerRouts);
    router.use("/discount", discountRouts);
    router.use("/price", priceRoutes);
    router.use("/cal", calculate);

    //provjera
    router.get("/ping", (req, res, next) => {
        res.status(200).json({ message: "ping" });
    });

    //error handling
    router.use((req, res, next) => {
        const error = new Error("not found");
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
