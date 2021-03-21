const router = require("express").Router();
const Workout = require("../models/workouts.js");

router.get("/exercise", (req, res)=>{
    res.sendFile("/exercise.html", { root: "public" });
});

//adding an exercise
router.put("/api/workouts/:id", ({ body }, res)=>{
    Workout.create(body).then(dbExercise => {
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;