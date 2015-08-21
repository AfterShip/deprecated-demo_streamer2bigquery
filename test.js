var bunyan = require('bunyan');

var RedisTransport = require('@aftership/bunyan-redis');

var Redis = require('ioredis');
var redis = new Redis({
	port: 6379,          // Redis port
	host: '127.0.0.1'   // Redis host
});


//var redis = require('redis').createClient();


var transport = new RedisTransport({
	container: 'logs:demo_app:v1:application', //logs:general:v2:bar     logs:DataSetName(2nd_3rd):TableSuffix (4th) in BQ
	// CANNOT use "-"
	client: redis,
	db: 0 // select db here
});

transport.on('trim', function(msg){
	console.log(msg);
})

var logger = bunyan.createLogger({
	name: 'demo-application', // application name see in bigquery's field: name
	streams: [{
		type: 'raw',
		level: 'trace',
		stream: transport,
		length: 100,
		drop_factor: 0.1
	}]
});

setInterval(function () {
	logger.info('My first log message');
}, 100);

//while(true) {
//	console.log('hahha');
//	logger.info('My first log message');
//}

// redis-cli: lrange demo_log 0 -1

