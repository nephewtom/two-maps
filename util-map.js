(function() {
    console.log("Start...");

    function myMap(data) {
        null == myMap.defl && (myMap.defl = {
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });
        //console.log("data before:", data);
        data = $.extend({}, myMap.defl, data);
        //console.log("data after:", data);
        this.map = new google.maps.Map(data.tag.get(0), data);
        return this
    }

    myMap.defl = null;
    myMap.prototype.changeZoom = function(a) {
        google.maps.event.addListener(this.map, "zoom_changed", a)
    };
    myMap.prototype.setZoom = function(a) {
        this.map.setZoom(a)
    };
    myMap.prototype.getZoom = function() {
        return this.map.getZoom()
    };

    function geoCallback(results, status, map) {
        status == google.maps.GeocoderStatus.OK ? (map.setCenter(results[0].geometry.location), new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        })) : alert("Error: " + status)
    };
    myMap.prototype.textbox = function(tag) {
        console.log("texbox execution:", tag[0].value);
        var coder = new google.maps.Geocoder;
        var thisMap = this.map;
        tag.change(function() {
            var address = $(this).val();
            console.log("tag:", tag.selector, "changed to:", address);
            coder.geocode({
                    address: address
            }, function(results, status) {
                geoCallback(results, status, thisMap); 
            })
        })};
    
    "undefined" === typeof console && (console = {
        log: function() {}
    });
    
    var map1, map2;
    var loc1 = [39.0155, -0.1716];
    var loc2 = [25.7877, -80.1281];

    function start() {
        console.log("Ready")
        function equalizeZoom(a, b) {
            console.log("equalizeZoom")
            a.changeZoom(function() {
                b.getZoom() != a.getZoom() && b.setZoom(a.getZoom())
            })
        }
        map1 = new myMap({
            tag: $("#map1"),
            center: new google.maps.LatLng(loc1[0], loc1[1]),
            zoom: 16
        });
        map2 = new myMap({
            tag: $("#map2"),
            center: new google.maps.LatLng(loc2[0], loc2[1]),
            loc: loc2,
            zoom: 16
        });
        equalizeZoom(map1, map2);
        equalizeZoom(map2, map1);
        console.log("in1:", $("#in1")[0].value);        
        console.log("in2:", $("#in2")[0].value);        
        console.log("in2:", $("#in2").val());        
        map1.textbox($("#in1"));
        map2.textbox($("#in2"));
    }
    
    // Specify a function to execute when the DOM is fully loaded.
    $().ready(start);
    console.log("reached end of last brace")
})();
