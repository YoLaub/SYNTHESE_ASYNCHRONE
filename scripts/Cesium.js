Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMzM4ODkzZi04NzEyLTRiZGYtOWRkOS1hMGVmMDdhYzAwMjgiLCJpZCI6MjcwNzkwLCJpYXQiOjE3Mzc1Njg5Mzd9.7gO_4WrWR4VJzhPFPigEzMuT9ECCRWh_NuubFF0xnM8"

/**
 * This class is an example of a custom geocoder. It provides geocoding through the OpenStreetMap Nominatim service.
 * @alias OpenStreetMapNominatimGeocoder
 * @constructor
 */
function OpenStreetMapNominatimGeocoder() { }

/**
 * The function called to geocode using this geocoder service.
 *
 * @param {string} input The query to be sent to the geocoder service
 * @returns {Promise<GeocoderService.Result[]>}
 */
OpenStreetMapNominatimGeocoder.prototype.geocode = function (input) {
    const endpoint = "https://nominatim.openstreetmap.org/search";
    const resource = new Cesium.Resource({
        url: endpoint,
        queryParameters: {
            format: "json",
            q: input,
        },
    });

    return resource.fetchJson().then(function (results) {
        let bboxDegrees;
        return results.map(function (resultObject) {
            bboxDegrees = resultObject.boundingbox;
            return {
                displayName: resultObject.display_name,
                destination: Cesium.Rectangle.fromDegrees(
                    bboxDegrees[2],
                    bboxDegrees[0],
                    bboxDegrees[3],
                    bboxDegrees[1],
                ),
            };
        });
    });
};


var buttonCesium = document.querySelector("#buttonCesium");



buttonCesium.addEventListener("click", function () {
    let citySelect = document.querySelector("#country").value;
    console.log(citySelect)
    const viewer = new Cesium.Viewer("cesiumContainer", {

        geocoder: new OpenStreetMapNominatimGeocoder(),
    });

    viewer.geocoder.viewModel.searchText = citySelect;
    viewer.geocoder.viewModel.search();
})







