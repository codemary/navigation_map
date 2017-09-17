var map;

var initialLocations = require('./data');

var clientId = '350C4NRLGJT02Y5S4AFOWBZSB4CUGQ4JS05QQ5QVXULBSPA4';

var clientSecret = 'UNDVTR3SAEGW2GBHD5QRUIES5XP1WKDMLLJIG05M0IGBQK5U';

var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?';


function NeighbouthoodMapViewModel() {
    var self = this;

    // set locationQuery and locationsList as observable to be bound to the view
    this.locationQuery = ko.observable('');
    this.locationsList = ko.observableArray([]);

    this.locationsDataList = [];

    // get infowindow object form google maps api
    this.mapInfoWindow = new google.maps.InfoWindow();

    this.markers = [];

    // build foursquare api params
    this.fourSquareParams = {
        categoryId: '4d4b7105d754a06374d81259',
        radius: 2000,
        ll: '12.9123302,77.6376689',
        client_id: clientId,
        client_secret: clientSecret,
        v: 20170916,
    };

    this.fourSquareUrlParams = $.param(self.fourSquareParams);

    // this function fetches venues from the foursquare venues api and updates the
    // locationsList observable. It also creates a marker for each shown venue
    this.getFoursquareData = function () {
        $.getJSON(fourSquareUrl + self.fourSquareUrlParams).done(function (data) {
            $.each(data.response.venues, function (i, venue) {
                console.log(venue);
                var address = '';
                venue.location.formattedAddress.forEach(function (el) {
                    address = address + ' ' + el;
                });

                var locationItem = {
                    name: venue.name,
                    latLong: [venue.location.lat, venue.location.lng],
                    address: address,
                };

                self.locationsDataList.push(locationItem);
                self.locationsList.push(locationItem);
                self.createMarker(locationItem);
            });
        }).fail(function () {
            // show hard coded locations if foursqaure api fails
            initialLocations.forEach(function (locationItem) {
                self.locationsDataList.push(locationItem);
                self.locationsList.push(locationItem);
                self.createMarker(locationItem);
            });

        });
    };


    // initialize the app
    this.init = function () {

        self.locationsDataList.forEach(function (item) {
            self.locationsList.push(item);
        });
        // fetch foursquare venues data
        this.getFoursquareData();

    };


    // this function is bound to the input field. The input field is bound to the locationQuery observable
    this.search = function () {

        // remove all locations from the locationsList observable
        self.locationsList.removeAll();

        // hide all markers
        self.markers.forEach(function (markerObj) {
            markerObj.marker.setVisible(false);
        });

        // filter out locations from the locationsDataList which match the query
        var filterLocations = function (locationsList, query) {
            return locationsList.filter(function (el) {
                return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        };

        var filteredLocationsList = filterLocations(self.locationsDataList, this.locationQuery());

        // push the filtered locations to locationsList observable and show the related markers
        filteredLocationsList.forEach(function (item) {
            //show markers
            self.markers.forEach(function (markerObj) {
                if (markerObj.name === item.name) {
                    markerObj.marker.setVisible(true);
                }

            });
            self.locationsList.push(item);
        });

    };

    // show marker when location list item is clicked
    this.locationItemClicked = function (item) {
        var marker;
        self.markers.forEach(function (markerObj) {
            if (markerObj.name === item.name) {
                marker = markerObj.marker;
            }
        });
        self.onMarkerClick(marker, item.name, item.address, self.mapInfoWindow)();
    };

    // handles marker click and animation. it also creates a infowindow. 
    this.onMarkerClick = function (marker, name, address, infowindow) {
        return function () {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () { marker.setAnimation(null); }, 2000);
            var htmlAddress = '<div id="iw-container">' +
                '<div class="iw-heading">' + name + '</div>' +
                '<div class="iw-body">' +
                '<p>' + address + '</p>' +
                '</div>' +
                '<img src="images/Powered-by-Foursquare-full-color-300.png" width="50%" height="50%"></img>' +
                '</div>';
            infowindow.setContent(htmlAddress);
            infowindow.open(map, marker);
            setTimeout(function () { infowindow.close(); }, 2000);
        };
    };


    // creates a marker
    this.createMarker = function (l) {
        var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: { lat: l.latLong[0], lng: l.latLong[1] }
        });
        // create info window
        google.maps.event.addListener(marker, 'click', self.onMarkerClick(marker, l.name, l.address, this.mapInfoWindow));
        // store markers by name
        self.markers.push({ 'name': l.name, 'marker': marker });
    };

    this.init();
}

// callback function for the google maps api
window.InitApp = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 12.9123302, lng: 77.6376689 }
    });
    ko.applyBindings(new NeighbouthoodMapViewModel());
};


