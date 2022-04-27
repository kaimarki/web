let map = L.map('map').setView([58.373523, 26.716045], 12)
const osm =
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'OpenStreetMap contributors',
    })
osm.addTo(map)

// default map settings
function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12)
}

addGeoJson('geojson/tartu_city_districts_edu.geojson')


// add geoJSON layer
async function addGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    L.choropleth(data, {
        valueProperty: 'OBJECTID',
        scale: ['#fafa6e','#2A4858'],
        steps: 5,
        mode: 'e', // q for quantile, e for equidistant
        style: {
            color: '#b2b2b2',
            weight: 2,
            fillOpacity: 0.6,
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup('Towers: ' + feature.properties.TOWERS)
        },
    }).addTo(map)
}
