var sys = require("sys");
var fs = require("fs");

config = {
    street_to_coordinates_path: process.argv[2]
};

var StreetService = require("./lib/StreetService").StreetService;

StreetService.getInstance().getLocationByStreet("GABRIEL-MAX-STR. / GRÜNBERGER STR.", function(location) {
    console.log(sys.inspect(location));
});
