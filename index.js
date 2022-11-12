import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import chatRoutes from "./routes/chats.js";

//app configuration
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//middleware

app.use(express.json());

app.use("/chats", chatRoutes);
//DB configuration
const port = process.env.PORT || 5000;

const connection_url =
  "mongodb+srv://admin:whatsappmern123@cluster0.bus1msl.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connection_url)
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// app.get("/messages/sync", (req, res) => {
//   Messages.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.post("/messages/new", (req, res) => {
//   const dbMessage = req.body;
//   Messages.create(dbMessage, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(`new message created: \n ${data}`);
//     }
//   });
// });

//listen

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
