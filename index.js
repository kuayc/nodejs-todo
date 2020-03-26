const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let task = ["find a job", "attend college"];
let complete = ["finish high school", "apply college"];

app.post("/addtask", function(req, res) {
  let newTask = req.body.newtask;
  task.unshift(newTask);
  res.redirect("/");
});

app.post("/removetask", function(req, res) {
  let completeTask = req.body.check;
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

app.get("/", function(req, res) {
  res.render("index", { task: task, complete: complete });
});

app.listen(3000, function() {
  console.log("skynet port 3000");
});
