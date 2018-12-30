var express = require('express')
var fs = require('fs')
var app = express()
var Web3 = require("web3")
var bodyParser = require('body-parser');
var web3 = new Web3()
var ballot
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"))
fs.readFile('./build/contracts/ClassBallot.json', 'utf-8', function (err, data) {
	if (err) {
		console.log('文件读取失败');
	} else {

		var abi = JSON.parse(data)["abi"]
		var address = JSON.parse(data).networks["5777"].address;
		ballot = web3.eth.contract(abi).at(address)
		host = web3.eth.accounts[0]
		console.log(host)
		console.log(web3.eth.accounts[1])
		console.log(web3.eth.accounts[2])
		console.log(web3.eth.accounts[3])
		console.log(web3.eth.accounts[4])
		console.log(web3.eth.accounts[5])
		console.log(web3.eth.accounts[6])
		console.log(web3.eth.accounts[7])
		console.log(web3.eth.accounts[8])
		console.log(web3.eth.accounts[9])

		app.use(express.static(__dirname + '/app'));
		app.use(bodyParser.urlencoded({ extended: false }))
		app.use(bodyParser.json())


		app.get('/', function (req, res) {

			res.sendFile(__dirname + '/app/vote.html');

		})
		app.post("/", function (req, res) {
			var address = req.body.address;
			res.send({ address: host });

		})

		app.get('/host', function (req, res) {
			res.sendFile(__dirname + '/app/host.html')

		})


		app.post("/host/addCandidate", function (req, res) {
			var name = req.body.name;
			var speak = req.body.speak;
			ballot.addCandidate.sendTransaction(name, speak, { from: host, gas: 872197 }, function (err, result) {
				if (err) {
					console.log(err)
					res.send({ flag: "false" });
				}
				else {
					res.send({ flag: "true" });
				}
			})
			// var event = ballot.transfer(function (error, result) {
			// 	console.log("Event are as following:-------");

			// 	for (let key in result) {
			// 		//console.log(key + " : " + result[key]);
			// 		if (key == "args") {
			// 			console.log(JSON.stringify(result[key]))
			// 		}
			// 	}
			// 	console.log("Event ending-------");
			// });


		})

		app.post("/host/giveRight", function (req, res) {
			var addr = req.body.address;
			console.log(addr);
			ballot.giveRightToVote.sendTransaction(addr, { from: host, gas: 100000 }, function (err, result) {
				if (err) {
					console.log(err)
					res.send({ flag: "false" });
				}
				else {
					res.send({ flag: "true" });
				}
			})

		})

		app.get("/host/winner", function (req, res) {
			var winner
			ballot.winningCandidate.sendTransaction({ from: host, gas: 8000000 })
			var winnum = ballot.getWinNum.call()
			if (winnum > 1) {
				ballot.winnersVote.sendTransaction({ from: host, gas: 8000000 })
			}
			winner = ballot.getWinner.call()

			res.send({ win: winner });

		})

		app.get("/host/reset", function (req, res) {

			ballot.reset.sendTransaction({ from: host, gas: 8000000 })

			res.send({ flag: "true" });

		})



		app.get("/winner", function (req, res) {

			var winner = ballot.getWinner.call()

			res.send({ win: winner });

		})

		app.get("/candidate", function (req, res) {
			var candidates = new Array()
			var nums = ballot.getNum.call()
			for (var i = 0; i < nums; i++) {
				candidates[i] = ballot.getCandidate.call(parseInt(i))
			}
			res.send({ candidates: candidates, num: nums });

		})

		app.post("/vote/vote", function (req, res) {
			var index = req.body.index;
			var address = req.body.address;
			ballot.vote.sendTransaction(parseInt(index), { from: address, gas: 100000 }, function (err, result) {
				if (err) {
					console.log(err)
					console.log("vote2")
					res.send({ flag: "false" });
				}
				else {
					console.log("vote1")
					res.send({ flag: "true" });
				}
			})

		})





		var server = app.listen(8080, function () {
			var host = server.address().address
			var port = server.address().port
			console.log("应用实例，访问地址为 http://%s:%s", host, port)
		})

	}
})