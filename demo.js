// Create the redis connection
var Redis = require('ioredis');
var redis = new Redis({
	port: 6379,          // Redis port
	host: '127.0.0.1'   // Redis host
});



// stream the data to redis by using this npm
var RedisTransport = require('@aftership/bunyan-redis');

// Setup the streamer detail
var transport = new RedisTransport({
	container: 'logs:demo_app:v2:random_address', // CANNOT use "-"
	// logs:DataSetName(2nd_3rd):TableSuffix (4th) in BQ
	client: redis,
	db: 0, // select db here
	length: 100, // max 100 records
	drop_factor: 0.25
});

transport.on('trim', function (msg) {
	console.log(msg);
});

// need bunyan to log the data
var bunyan = require('bunyan');
var logger = bunyan.createLogger({
	name: 'demo-application', // application name see in bigquery's field: name
	streams: [{
		type: 'raw',
		level: 'trace',
		stream: transport
	}]
});


// Use to generate fake random address
var faker = require('faker');
var random_address = faker.address;

var address;
var count = 1;
setInterval(function () {
	address = {};
	address.street_address = random_address.streetAddress();
	address.city = random_address.city();
	address.zip_code = random_address.zipCode();
	address.state = random_address.state();
	address.country = random_address.country();

	console.log('Address ' + count);
	console.log(address);
	logger.info(address);
	count++;
}, 1000);


// redis-cli: lrange demo_log 0 -1

// DEBUG=* node demo

//SELECT count(*) as cnt, state FROM [development_demo_app_v2.20150821_random_address]
//group by state order by cnt desc
