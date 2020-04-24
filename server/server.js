const express = require("express");
const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const TaskSchema = model(
  "tasks",
  new Schema({
    day: String,
    title: String,
  })
);

const uri = "mongodb://127.0.0.1:27017/mean_calendar";

app.post("/addNewTask", (req, res) => {
  TaskSchema.create(req.body);
  return res.end();
});

app.get("/getTasks/:day", async (req, res) => {
  const { day } = req.params;
  const tasks = await TaskSchema.find({ day: day });
  res.send(tasks);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TaskSchema.findByIdAndDelete({ _id: id }, (err, data) => {
    if (err) throw err;
    return res.end();
  });
});
const start = () => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  app.listen(3000, () => {
    console.log("Server has been running");
  });
};

start();
