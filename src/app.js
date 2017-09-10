var map;

var defaultLocations = require('./data')

function NeighbouthoodMapViewModel() {
    var self = this;


    this.init = function () {
        console.log("initialize app")
    }
    this.locationQuery = ko.observable("");
    this.locationsList = defaultLocations;

    this.search = function () {

    }


    this.locationItemClicked = function () {

    }

    this.init()
}

window.InitApp = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 12.9716, lng: 77.5946 }
    })
    ko.applyBindings(new NeighbouthoodMapViewModel());
}


