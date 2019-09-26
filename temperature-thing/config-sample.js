const config = {
    // the first sensor listed seems to be the summary data point
    app: {
        urn: "urn:dev:ops:temperature-thing-0001",
        name: "Temperature Sensor (DS18B20)",
        port: 8888,
        refresh: 1000,
        sensors: [
            {
                "id": "28-000000000000",
                "title": "Sensor1",
                "property": "temp0"
            },
            {
                "id": "28-000000000000",
                "title": "Sensor2",
                "property": "temp1"
            },
            {
                "id": "28-000000000000",
                "title": "Sensor3",
                "property": "temp2"
            }
        ]
    }
};

module.exports = config;
