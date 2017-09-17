var map;

var initialLocations = require('./data')

var clientId = '350C4NRLGJT02Y5S4AFOWBZSB4CUGQ4JS05QQ5QVXULBSPA4';

var clientSecret = 'UNDVTR3SAEGW2GBHD5QRUIES5XP1WKDMLLJIG05M0IGBQK5U';

var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?'


function NeighbouthoodMapViewModel() {
    var self = this;

    this.locationQuery = ko.observable("");
    this.locationsList = ko.observableArray([]);
    this.defaultLocations = [];


    this.mapInfoWindow = new google.maps.InfoWindow();
    this.markers = [];
    this.fourSquareParams = {
        categoryId: '4d4b7105d754a06374d81259',
        radius: 2000,
        ll: '12.9123302,77.6376689',
        client_id: clientId,
        client_secret: clientSecret,
        v: 20170916,
    };

    this.fourSquareUrlParams = $.param(self.fourSquareParams);

    this.getFoursquareData = function () {
        $.getJSON(fourSquareUrl + self.fourSquareUrlParams).done(function (data) {
            $.each(data.response.venues, function (i, venue) {
                // console.log(venue);
                var locationItem = {
                    name: venue.name,
                    latLong: [venue.location.lat, venue.location.lng],
                    address: venue.location.address,
                }

                self.defaultLocations.push(locationItem);
                self.locationsList.push(locationItem);
                self.createMarker(locationItem)
            });
        }).fail(function () {
            // show hard coded locations if foursqaure api fails
            console.log("error")
            initialLocations.forEach(function (locationItem) {
                self.defaultLocations.push(locationItem);
                self.locationsList.push(locationItem);
                self.createMarker(locationItem)
            });

        });
    };

    this.init = function () {

        self.defaultLocations.forEach(function (item) {
            self.locationsList.push(item);
        });
        this.getFoursquareData();

    }



    this.search = function () {
        //console.log(this.locationQuery().toLowerCase())

        self.locationsList.removeAll()

        // hide all markers
        self.markers.forEach(function (markerObj) {
            markerObj.marker.setVisible(false);
        });

        var filterLocations = function (locationsList, query) {
            return locationsList.filter(function (el) {
                // console.log("name", el.name)
                return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
            })
        }

        var filteredLocationsList = filterLocations(self.defaultLocations, this.locationQuery())

        // console.log(filteredLocationsList)

        filteredLocationsList.forEach(function (item) {
            //show markers
            self.markers.forEach(function (markerObj) {
                if (markerObj.name === item.name) {
                    markerObj.marker.setVisible(true)
                }

            });
            self.locationsList.push(item);
        });

    }

    this.locationItemClicked = function (item) {
        var marker;
        self.markers.forEach(function (markerObj) {
            if (markerObj.name === item.name) {
                marker = markerObj.marker
            }
        });
        self.onMarkerClick(marker, item.name, item.address, self.mapInfoWindow)()
    }

    this.onMarkerClick = function (marker, name, address, infowindow) {
        return function () {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () { marker.setAnimation(null); }, 4000);
            var htmlAddress = '<div class="card">' +
                '<div class="card-body">' +
                '<p>' + name + '</p>' +
                '<p>' + address + '</p>' +
                '</div>' +
                '</div>'
            infowindow.setContent(htmlAddress);
            infowindow.open(map, marker);
            setTimeout(function () { infowindow.close(); }, 4000);
        };
    }


    this.createMarker = function (l) {
        var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: { lat: l.latLong[0], lng: l.latLong[1] }
        });
        // create info window
        google.maps.event.addListener(marker, 'click', self.onMarkerClick(marker, l.name, l.address, this.mapInfoWindow));

        self.markers.push({ "name": l.name, "marker": marker })
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


