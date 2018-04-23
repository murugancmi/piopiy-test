var express    = require('express'),       
    app        = express(),                 
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname+'/public'))

var router = express.Router(); 

app.post('/did',function(req,res){
	console.log(req.body)
	var dialplan=
		 {ivr:
		 	{
		 		welcome:{
                       play:{
                       	url:"http://159.65.158.35:8585/welcome.wav"
                       }
		 		},
		 		invalid:{
		 			play:{
		 				url:"http://159.65.158.35:8585/invalid.wav"
		 			}
		 		},
		 		max:1,
		 		min:1,
		 		retry:2,
		 		if:{
		 			1:{
		 				replay:true
		 			},
		 			2:{
                        queue:{
                        	record:true,
                        	ringback:'http://159.65.158.35:8585/welcome.wav',
                        	call:[9894396168,9789853021]
                        }
		 			},
		 			3:{
		 				http:{
		 					method:'POST',
		 					url:'http://159.65.158.35:8585/option'
		 				}
		 			}
		 		}
		 	}
		}


	
	
	res.send(dialplan)
})


app.post('/option',function(req,res){
	console.log('its here')
	console.log(req.body)
	var ivr={
		ivr:{
			welcome:{
				play:{
					url:'http://159.65.158.35:8585/schoolwelcome.wav'
				}
			},
			invalid:{
				play:{
					url:'http://159.65.158.35:8585/invalid.wav'
				}
			},
			retry:3,
			if:{
				1:{
					http:{
						method:'POST',
						url:'http://192.168.1.3:8585/hangup'
					}
				}
			}
		}
	}
	res.send(ivr)
})

app.post('/hangup',function(req,res){
	console.log(req.body)
	console.log('error hangup')
	var hangup={
		hangup:true
	}
	res.send(hangup)
})



app.listen(8585)

