const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://3.38.254.220");
const sensor=require("./models/Sensordate");
const express = require("express");
const app = express();
const http = require("http");
const mongoose=require("mongoose");
const devicesRouter=require("./routes/devices");
const bodyParser=require("body-parser");
require('dotenv/config');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("/devices", devicesRouter);

client.on("connect", ()=>{
	console.log("mqtt connect");
	client.subscribe("Sensor");
});

client.on("message", async(topic, message)=>{  
	var obj=JSON.parse(message);
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var today = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	obj.created_at=new Date(Date.UTC(year, month, today, hours, minutes, seconds));
	console.log(obj);
	const Sensor = new sensor({
		Humi : obj.Humi,
		Temp : obj.Temp,
		CDS : obj.CDS,
		soil : obj.soil,
		created_at : obj.created_at
	});
	try{
		const savesensor= await Sensor.save();
		console.log("insert OK");
	}catch(err){
		console.log({message : err});
	}
});
app.set("port", "3000");
var server=http.createServer(app);

var io = require("socket.io")(server);
io.on("connection",(socket)=>{
	socket.on("socket_evt_mqtt",function (data){
		sensor.find({}).sort({_id : -1}).limit(1).then(data=>{
			//console.log(JSON.stringify(data[0]));
			socket.emit("socket_evt_mqtt",JSON.stringify(data[0]));
		});
	});
});
server.listen(3000, (err)=>{
	if(err){
	return console.log(err);
	}else{
	console.log("server ready");

	mongoose.connect(process.env.MONGODB_URL,
		{useNewUrlParser: true,useUnifiedTopology:true },
		()=> console.log('connected to DB!')
		);
	}
});	
