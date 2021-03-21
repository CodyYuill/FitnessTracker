const router = require("express").Router();
const Workout = require("../models/workouts.js");
const mongojs = require("mongojs");

router.get("/exercise", (req, res)=>{
    res.sendFile("/exercise.html", { root: "public" });
});

router.get("/stats", (req, res)=>{
    res.sendFile("/stats.html", { root: "public" });
});

router.get("/api/workouts", (req, res)=>{
    Workout.find().limit(1).sort({day: -1}).then(dbResult => {
        res.send(dbResult);
    });
});

//make a new workout
router.post("/api/workouts", (req, res)=>{
    Workout.create({day: new Date()}).then(dbExercise => {
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err);
    });
});

//adding an exercise to workout at _id
router.put("/api/workouts/:id", (req, res)=>{
    Workout.updateOne({_id: mongojs.ObjectId(req.params.id)}, {$push: {exercises: req.body}})
        .then(dbExercise => {
            console.log(dbExercise);
            res.json(dbExercise);
        }).catch(err => {
            res.status(400).json(err);
        });
});
//stuff for stats
router.get("/api/workouts/range", (req, res)=>{
    Workout.find({}, (err, dbResult)=>{
        if(err) 
            res.send(err);
        else
            res.send(dbResult);
    });
});

module.exports = router;