/**
 * Created by FeikoLai on 9/6/15.
 */
var Streamer = require('bigquery-streamer');

var streamer = new Streamer({
	"bucket": "demo-bigquery", // GCE bucket name
	"project_id": "aftership-demo",
	"key": "get the JSON key from google console",
	"email": "get the payload from google console",
	"dataset_namespace": "development", // data_set_name_prefix (in bigquery, will become "development_demo-app"
	"max_row_size": 16384, // 16KB
	"redis_db": 0,
	"redis_host": "127.0.0.1",
	"redis_port": 6379,
	"redis_namespace": "logs", // RedisTransport.container FIRST part
	"send_batch_size": 100, // every 100 records, send to BQ for every 5 s, whatever come first
	"schedule_interval": 5000, // 5s
	"table_definitions": {
		"demo_app": { // RedisTransport.container 2nd part
			"v2": {
				"fields": [
					{
						"name": "name",
						"type": "STRING"
					},
					{
						"name": "hostname",
						"type": "STRING"
					},
					{
						"name": "pid",
						"type": "INTEGER"
					},
					{
						"name": "level",
						"type": "INTEGER"
					},
					{
						"name": "msg",
						"type": "STRING"
					},
					{
						"name": "time",
						"type": "TIMESTAMP"
					},
					{
						"name": "v",
						"type": "INTEGER"
					},
					{
						"name": "cargo",
						"type": "STRING"
					},
					{
						"name": "err",
						"type": "RECORD",
						"fields": [
							{
								"name": "name",
								"type": "STRING"
							},
							{
								"name": "message",
								"type": "STRING"
							},
							{
								"name": "stack",
								"type": "STRING"
							}
						]
					},
					{
						"name": "archive",
						"type": "RECORD",
						"fields": [
							{
								"name": "type",
								"type": "STRING"
							},
							{
								"name": "ref1",
								"type": "STRING"
							},
							{
								"name": "ref2",
								"type": "STRING"
							},
							{
								"name": "ref3",
								"type": "STRING"
							}
						]
					},


						// ADD CUSTOM FIELDS from here
					{
						"name": "street_address",
						"type": "STRING"
					},
					{
						"name": "city",
						"type": "STRING"
					},
					{
						"name": "zip_code",
						"type": "STRING"
					},
					{
						"name": "state",
						"type": "STRING"
					},
					{
						"name": "country",
						"type": "STRING"
					}
				],


				// VERY IMPORTANT
				"strippable_fields": [
					"msg",
					"cargo"
				],
				"ttl": 100
			}
		}
	}
});

console.log('i started');
streamer.start();

// DEBUG=* node streamer.js
