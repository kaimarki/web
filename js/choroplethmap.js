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
        valueProperty: 'TOWERS',
        scale: ['#ffffcc', '#a1dab4','#41b6c4','#2c7fb8','#253494'],
        steps: 5,
        mode: 'q', // q for quantile, e for equidistant
        style: {
            color: '#6b6b6b',
            weight: 2,
            fillOpacity: 0.6,
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup('Towers: ' + feature.properties.TOWERS+'<p>Name:'+feature.properties.NIMI)
        },
        
    }).addTo(map)
}

