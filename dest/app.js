(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var map;

function NeighbouthoodMapViewModel() {
    var self = this;


    this.init = function () {
        console.log("initialize app")
    }
    this.locationQuery = ko.observable("")
    this.locationsList = [
        {
            name: 'Onesta',
            lat: '1',
            long: '2',
            address: 'sector-1',
        },
        {
            name: 'Pisco',
            lat: '1',
            long: '2',
            address: 'sector-1',
        },
        {
            name: 'Mish Mash',
            lat: '1',
            long: '2',
            address: 'sector-1',
        }
    ];



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



},{}]},{},[1]);
