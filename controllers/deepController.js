var synaptic = require('synaptic');
var request = require('request');
require('dotenv').config()


var getItem = function(req, res) {

	request("http://api.wunderground.com/api/" + process.env.API_KEY + "/conditions/q/CO/Denver.json", function(error, response, body){
		//console.log(body);
		var data = JSON.parse(body);
		var myTemp = parseInt(data.current_observation.temp_c);
		var tempF = parseInt(data.current_observation.temp_f);

		function convertToBinaryArray(temperature) {
		    var tempInBinary = temperature.toString(2); // Convert to binary
		 
		    // If it is more than 7 digits long, truncate
		    if(tempInBinary.length > 7)
		        return [1,1,1,1,1,1,1];
		 
		    // If it less than 7 digits long, add zeroes
		    while(tempInBinary.length < 7) { 
		        tempInBinary = "0" + tempInBinary;
		    }
		 
		    // Convert string to array
		    return tempInBinary.split("").map(function(i) {
		        return parseInt(i); }
		    );
		}

		var myDeepNetwork = new synaptic.Architect.Perceptron(
		    7, // Input layer with 7 neurons
		    3, // First hidden layer with 3 neurons
		    3, // Second hidden layer with 3 neurons
		    4 // Output layer with 4 neurons
		);

		var trainingData = [];
		 
		for(var i = 1;i < 75; i++) {
		    var input = convertToBinaryArray(i); // Input layer
		    var output = [0,0,0,0]; // Undecided state of output layer
		 
		    if(i <= 5)
		        output = [1,0,0,0]; // THICK JACKET
		    else if(i > 5 && i <= 15)
		        output = [0,1,0,0]; // SWEATER
		    else if(i > 15 && i <= 40)
		        output = [0,0,1,0]; // T-SHIRT
		    else
		        output = [0,0,0,1]; // NOTHING
		 
		    trainingData.push({
		        input: input,
		        output: output
		    });
		}

		var myTrainer = new synaptic.Trainer(myDeepNetwork); // Create trainer
		myTrainer.train(trainingData, {
		    rate: 0.1,
		    iterations: 100000,
		    shuffle: true
		}); // Train with training data

		var cTemp = convertToBinaryArray(myTemp);
		var recommendations = myDeepNetwork.activate(cTemp);
		 
		// Log neuron outputs
		console.log("THICK JACKET neuron: " + (recommendations[0] * 100) + "%");
		console.log("SWEATER neuron: " + (recommendations[1] * 100) + "%");
		console.log("T-SHIRT neuron: " + (recommendations[2] * 100) + "%");
		console.log("NOTHING neuron: " + (recommendations[3] * 100) + "%");

		var jacket = (recommendations[0] * 100);
		var sweater  = (recommendations[1] * 100);
		var tShirt = (recommendations[2] * 100);
		var nothing = (recommendations[3] * 100);
		var obj = {
			temp: tempF
		}
		if(jacket > sweater && jacket > tShirt && jacket > nothing ) {
			obj.prediction = 0;
		} else if (sweater > jacket && sweater > tShirt && sweater > nothing) {
			obj.prediction = 1;
		} else if (tShirt > jacket && tShirt > sweater && tShirt > nothing) {
			obj.prediction = 2;
		} else if(nothing > jacket && nothing > sweater && jacket > tShirt) {
			obj.prediction = 3;
		}
		res.json(obj);
	});


} 

// export controllers
module.exports.getItem = getItem;
