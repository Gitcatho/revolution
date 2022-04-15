const mongoose=require("mongoose");
const SensordateSchema=mongoose.Schema({
	Temp : {
		type : String,
		required : true
	},
	Humi : {
		type : String,
		required : true
	},
	CDS : {
		type : String,
		required : true
	},
	soil : {
		type : String,
		required : true
	},
	created_at : {
		type : Date,
		default : Date.now }
	});
	module.exports = mongoose.model('value',SensordateSchema);

