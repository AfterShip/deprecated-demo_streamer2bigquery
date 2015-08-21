/**
 * Created by FeikoLai on 9/6/15.
 */
var Streamer = require('bigquery-streamer');

var streamer = new Streamer({
	"bucket": "demo-bigquery", // GCE bucket name
	"project_id": "aftership-demo",
	"key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDG86/Lre6mtzIm\nVYep7vHCBfP/7Tt+W3xVeFPf6ldwbRthLXDpPaiby1sSkuo/Hu5jWpQ/vZ/wM32O\ncnY34IVj40q+KjdwZnOv/dZHnN/rEGLNGLwYj1hUTOqS+I7B9HwMhciG8cY021Ly\nJQclSur3IZX3h0g7d+YtbJjmqaLYfmSgQ0+6RFnwV/7tK3MC9YXF2XoMuMFCuMds\nxXnxfOl6EGJwk29SCIyNHDJtiOQoYXXuWcjRULly79ovyh+/xNG5OeKfkeOrBV5I\nVALqmAdwNBRScL8IwF8HeuXd9JEVkk4/DGdsyDmSVxgiyvrlXz+atmAql0Ay4lXg\n5/L55ySXAgMBAAECggEBAJkwPaYZEO8xk93McZ85KtF4f/4Jjoumqb+t3PdGm3kn\nqbNTp+MP5OnA1SkiElfz2x6JOikyOxpaq0ypeblgmZTmCEEQhIt5d46FZx7Q/eEj\nRtAhQYOvrBWM+/mahWF2fKWvxU2SkElWrzFfrXbbjrwnEi/77HRNx+AmBD1nVMpY\ne7UttEEH8nvq3naqLcp5jTth37ZR/Kzbnz3gPsnd6wwbbXPuVTc2s35R+tMWoWZy\n+N/ksd1flCKkMj8k9OKoia1cWKx9LI747y25Cngu/B+Y2YTTfQpSXuevy9isSqdY\nE1qFClIuEM+mRXI+Ug9pKt17Yb9I9VoxW80o8/1j3FECgYEA7+nsj5a/uOVI/ZVT\n/k+puwFKMesfP1u4zC1QbboNqhUNy3+OO1cmGT2qX7108qbFOqWhMnMaCaDlhVtF\nfy0P0YuRhZx8xkFEPQUorBHdIodvCRd+BFRhtlz9EE/yBuKB/Z/2Ny7ZiDni7ti3\nxZDbirkBoZUJP50lWhJUU6wkRbMCgYEA1Eqo4yZT28fQA/FkRfk8zCIAQ8w9o2QN\nCgX7N+VEQ3P0AGULNCzTKAzof3Pko5up+Rh/hBWJ8wxjxrRwjsx+Ky29HLs3pbzD\ncUhSjbN+/9MFd4XXuH5f2ZITe8xzARhVtjPhISNbfwBT/fuIuxRQHIrnU9JtuU06\nwa0r3v1xu40CgYEArEn5MES5+jXubO1IHGFpKnqKpb6L+hwMYdRI5gOuvG3SMkmw\nAr1bBtVZ/Nc5nOhWyv8W+/vcvv1k1pftGJ9rtLfeEW2HzXghYRDLXIaXn6xS+Nx+\nCu3uHeA5e/VtgbQ4VcMCNi7W2RV4+r13e9HDV6P0n+0/bweTQ1PWayA8DDECgYEA\nsTQ0748BttZ+Y5wuuF4Iitji4bTtyqJsY+6EOa8toSR8C4xMotu70pWbyS/DLXJ1\nmlEBuA6GnRO9gZMC1aAKvR4r2nzIQZdkiP32swOewgqyaIeXfxA2EBXoH5GUediH\nS1TY2mF6MXPjqIE7K/YTvQ+Rcx2Wq3O01RApK7ThJ80CgYBQsyVNa+SHZqcXKJqD\nqAa+/He19t3Ingf6ckaqechqyEGo27FO8Kils5N4w69dmnj8zlY0ihFr0nQxhuVe\nsj4UQqvZSzJ4jc06hYNv67yBnCxjmVMhhprl/U7/lFG71XGKbHEwWfCJZ8cVCuWV\nsdMfyia0g3xeQTz1F/ibhnwqXg\u003d\u003d\n-----END PRIVATE KEY-----\n",
	"email": "333050490961-m406snj2fjq26oumuqmvna7emnmujrrq@developer.gserviceaccount.com",
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
