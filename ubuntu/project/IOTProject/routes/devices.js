var express=require("express");
var router=express.Router();
const mqtt=require("mqtt");

const client=mqtt.connect("mqtt://3.38.254.220");

router.get("/ledhello", function(req, res, next){
	res.send("LED");
});

router.get("/Switch", function(req, res, next){
	res.set("Content-Type", "text/json");
	if(req.query.flag=="led_on"){
		client.publish("Switch","led_on");
		res.send(JSON.stringify({led :"on"}));
	}else if(req.query.flag=="led_off"){
		client.publish("Switch","led_off");
		res.send(JSON.stringify({led :"off"}));
	}else if(req.query.flag=="fan_on"){
		client.publish("Switch","fan_on");
		res.send(JSON.stringify({fan :"on"}));
	}else if(req.query.flag=="fan_off"){
		client.publish("Switch","fan_off");
		res.send(JSON.stringify({fan :"off"}));
	}else if(req.query.flag=="hit_on"){
		client.publish("Switch","hit_on");
		res.send(JSON.stringify({hit :"on"}));
	}else if(req.query.flag=="hit_off"){
		client.publish("Switch","hit_off");
		res.send(JSON.stringify({hit :"off"}));
	}
});

module.exports = router;
