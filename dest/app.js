(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var map;

var defaultLocations = require('./data')

function NeighbouthoodMapViewModel() {
    var self = this;



    this.locationQuery = ko.observable("");
    this.locationsList = defaultLocations;

    this.mapInfoWindow = new google.maps.InfoWindow();
    this.markers = [];

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
            var marker = new google.maps.Marker({
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: { lat: l.latLong[0], lng: l.latLong[1] }
            });
            // create info window
            google.maps.event.addListener(marker, 'click', (function (marker, infowindow) {
                return function () {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () { marker.setAnimation(null); }, 4000);
                    infowindow.setContent(l.address);
                    infowindow.open(map, marker);
                    setTimeout(function () { infowindow.close(); }, 4000);
                };
            })(marker, this.mapInfoWindow));

            this.markers.push(marker)

        }

    };

    this.init()
}

window.InitApp = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 12.9123302, lng: 77.6376689 }
    })
    ko.applyBindings(new NeighbouthoodMapViewModel());
}



},{"./data":2}],2:[function(require,module,exports){
module.exports = [
    {
        name: 'Art Blend Cafe',
        latLong: [12.9087497, 77.6503003],
        address: 'sector-1',
    },
    {
        name: 'Hello Delhi',
        latLong: [12.9123302, 77.6376689],
        address: 'sector-1',
    },
    {
        name: 'Mish Mash',
        latLong: [12.9120781, 77.6428719],
        address: 'sector-1',
    },
    {
        name: 'Tomatina',
        latLong: [12.9117236, 77.6449431],
        address: 'sector-1',
    },
    {
        name: 'Corner House',
        latLong: [12.9097348, 77.6500869],
        address: 'sector-1',
    }

];
},{}]},{},[1]);
