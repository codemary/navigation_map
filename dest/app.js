(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{"./data":2}],2:[function(require,module,exports){
module.exports = [
    {
        name: 'Lou Han',
        lat: '12.905169',
        long: '77.650525',
        address: 'sector-1',
    },
    {
        name: 'Punjabi Tdka',
        lat: '12.905169',
        long: '77.650525',
        address: 'sector-1',
    },
    {
        name: 'Mish Mash',
        lat: '12.905169',
        long: '77.650525',
        address: 'sector-1',
    },
    {
        name: 'Mughal Treat',
        lat: '12.905169',
        long: '77.650525',
        address: 'sector-1',
    }
];
},{}]},{},[1]);
