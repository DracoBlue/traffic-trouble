var sys = require("sys");
var fs = require("fs");


StreetService = function() {
    var self = this;
}

StreetService.getInstance = function() {
    if (typeof StreetService.instance === "undefined")
    {
        StreetService.instance = new StreetService();
    }

    return StreetService.instance;
}

StreetService.prototype.retrieveData = function(callback) {
    var self = this;

    if (typeof this.data === "undefined")
    {
        fs.readFile(config.street_to_coordinates_path, function(err, data) {
            self.data = {};
            var data = data.toString().split("\n");
            var data_length = data.length;
            for (var i = 0; i < data_length; i++)
            {
                var line = data[i].split("\t");
                var street_name = line[0].trim();
                self.data[street_name] = {
                    longitude: line[1],
                    latitude: line[2]
                };
            }
            callback(self.data);
        });
    }       
    else
    {
        callback(this.data);
    }
}

StreetService.prototype.getLocationByStreet = function(street_name, callback) {
    this.retrieveData(function(data) {
        if (typeof data[street_name] === "undefined")
        {
            callback();
            return ;
        }
        callback(data[street_name]);
    });
};

exports.StreetService = StreetService;
