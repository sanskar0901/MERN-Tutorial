const router = require("express").Router();
let Task = require("../models/tasks.model");

router.route("/:id").get((req, res) => {
  const userId = req.params.id;
  Task.find({ userId })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => res.status(400).json(err));
});

router.route("/add/").post(async (req, res) => {
  const { userId, task } = req.body;

  const existingTasks = await Task.findOne({ userId });

  var updatedTasks = existingTasks.task;

  const new_task = {
    task,
    status: "not done",
  };

  updatedTasks.push(new_task);

  Task.replaceOne({ userId: userId }, { userId, task: updatedTasks })
    .then(() => {
      Task.find({ userId })
        .then((task) => {
          res.json(task);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

router.route("/edit/").post(async (req, res) => {
  const { taskId, method, userId } = req.body;

  const existingTasks = await Task.findOne({ userId });

  var updatedTasks = [];
  if (method === "delete") {
    if (existingTasks) {
      existingTasks.task.map((tas) => {
        if (
          JSON.stringify(tas._id).replace('"', "").replace('"', "") !== taskId
        ) {
          updatedTasks.push(tas);
        }
      });
    }
  } else if (method === "update") {
    if (existingTasks) {
      existingTasks.task.map((tas) => {
        if (
          JSON.stringify(tas._id).replace('"', "").replace('"', "") === taskId
        ) {
          if (t.status === "done") {
            t.status = "not done";
          } else {
            t.status = "done";
          }
          updatedTasks.push(t);
        } else {
          updatedTasks.push(t);
        }
      });
    }
  }

  Task.replaceOne({ userId: userId }, { userId, task: updatedTasks })
    .then(() => {
      Task.find({ userId })
        .then((task) => {
          res.json(task);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
