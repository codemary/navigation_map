var map;

var defaultLocations = require('./data')

function NeighbouthoodMapViewModel() {
    var self = this;



    this.locationQuery = ko.observable("");
    this.locationsList = defaultLocations;

    this.init = function () {
        this.createMarkers()
    }


    this.search = function () {

    }


    this.locationItemClicked = function () {

    }

    this.createMarkers = function () {
        for (var i = 0; i < this.locationsList.length; i++) {
            console.log(this.locationsList[i]);
            var l = this.locationsList[i];
            new google.maps.Marker({
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: { lat: l.latLong[0], lng: l.latLong[1] }
            });

        };
    }

    this.init()
}

window.InitApp = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 12.9123302, lng: 77.6376689 }
    })
    ko.applyBindings(new NeighbouthoodMapViewModel());
}


