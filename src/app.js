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

function InitApp() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 12.9716, lng: 77.5946 }
    })
    ko.applyBindings(new NeighbouthoodMapViewModel());
}



