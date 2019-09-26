const {
    Action,
    Event,
    Property,
    SingleThing,
    Thing,
    Value,
    WebThingServer
} = require("webthing");

const uuidv4 = require("uuid/v4");
const sensor = require("ds18x20");
const config = require('./config');

class TemperatureSensor extends Thing {
    constructor () {
        super (
            config.app.urn,
            config.app.name,
            ["TemperatureSensor"],
            "A web thing to sense temperature from one or more DS18B20 sensors"
        );
        
        for (var i = 0; i < sensors.length; i++) {
            this["temp" + i] = new Value(0.0);
            
            this.addProperty(
                new Property(
                    this,
                    "temp" + i,
                    this["temp" + i],
                    {
                        "@type": "TemperatureProperty",
                        title: sensors[i].title,
                        type: "number",
                        description: "The current temperature of " + sensors[i].title + " in degrees celsius",
                        unit: "degree celsius",
                        readOnly: true,
                    }));
        }
        
        setInterval(() => {
            const temps = this.getTemps();
            for (var i = 0; i < sensors.length; i++) {
                this[sensors[i].property].notifyOfExternalUpdate(temps[sensors[i].id]);
            }
        }, config.app.refresh);
    }
    
    getTemps() {
        return sensor.getAll();
    }
}

function runServer() {
    const temperatureSensor = new TemperatureSensor();
    
    console.log("Starting Temperature Thing on port %s", config.app.port);
    
    const server = new WebThingServer(new SingleThing(temperatureSensor), config.app.port);
    
    process.on("SIGINT", () => {
        server.stop().then(() => process.exit()).catch(() => process.exit());
    });
    
    server.start().catch(console.error);
}

runServer();
