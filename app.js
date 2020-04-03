const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/motobikeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    console.log('reached database')
  })
  .catch((error) => {
    console.log(`the error is ...${error}`)
  })



const motorbikeSchema = new mongoose.Schema({
	manufacturer: String,
	model: String,
	manufacturingYears: String,
	rrp: Number,
	horsepower: Number,
	drivetrain: String
})

const Motorbike = mongoose.model("Motorbike", motorbikeSchema);

app.post('/motorbikes', function (req, res) {
	const newMotorbike = new Motorbike({
		manufacturer: req.body.manufacturer,
		model: req.body.model,
		manufacturingYears: req.body.manufacturingYears,
		rrp: req.body.rrp,
		horsepower: req.body.horsepower,
		drivetrain: req.body.drivetrain

	})
	newMotorbike.save(function (err) {
		if (!err) {
			res.send("Successfully added a new article.");
		} else {
			res.send(err);
		}
	});
})

app.get('/motorbikes', function (req, res) {
	Motorbike.find(function (err, foundMotorbike) {
		if (!err) {
			res.send(foundMotorbike);
		} else {
			res.send(err);
		}
	});
})

app.get('/motorbikes/:motorbikeId', function (req, res) {
	Motorbike.findOne({
		title: req.params.MotorbikeId
	}, function (
		err,
		foundMotorbike
	) {
		if (foundMotorbike) {
			res.send(foundMotorbike);
		} else {
			res.send("No motorbike was found using that ID");
		}
	});
})

app.put('motorbike/:motorbikeId', function (req, res) {
	Article.update({
			motorbike: req.params.MotorbikeId
		}, {
			manufacturer: req.body.manufacturer,
			model: req.body.model,
			manufacturingYears: req.body.manufacturingYears,
			rrp: req.body.rrp,
			horsepower: req.body.horsepower,
			drivetrain: req.body.drivetrain
		}, {
			overwrite: true
		},
		function (err) {
			if (!err) {
				res.send("Successfully updated the selected article.");
			}
		}
	);
})

app.delete('/motorbikes/:motorbikeId', function (req, res) {
	Motorbike.deleteOne({
		motorbike: req.params.MotorbikeId
	}, function (err) {
		if (!err) {
			res.send("Successfully deleted the corresponding motorbike.");
		} else {
			res.send(err);
		}
	});
});




app.listen(3000, function () {
	console.log("Server started on port 3000");
});