import express from "express";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import Pusher from "pusher";
import Cors from "cors";

import chatRoutes from "./routes/chats.js";

//app configuration
const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const pusher = new Pusher({
  appId: "1505860",
  key: "9ca08a600333f628f6b7",
  secret: "19944c9039ed79333609",
  cluster: "ap2",
  useTLS: true,
});

//middleware

app.use(express.json());
app.use(Cors());

app.use("/chats", chatRoutes);
//DB configuration

const connection_url =
  "mongodb+srv://admin:whatsappmern123@cluster0.bus1msl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url, {});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("a change occurred", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.user,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//listen

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
