
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: loc.geometry.coordinates, // starting position [lng, lat]
    zoom: 12 // starting zoom
});
const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(loc.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset:25})
.setHTML(`<h5>${loc.location}</h5><p>Exact Location!</p>`)
.setMaxWidth("300px"))
.addTo(map);
