//Full screen map view
var mapId = document.getElementById('map');
function fullScreenView() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        mapId.requestFullscreen();
    }
}



//Leaflet browser print function
L.control.browserPrint({ position: 'topright' }).addTo(map);




//Leaflet measure
L.control.measure({
    primaryLengthUnit: 'kilometers',
    secondaryLengthUnit: 'meter',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: undefined
}).addTo(map);



//zoom to layer
$('.zoom-to-layer').click(function () {
    map.setView([20.5937, 78.9629], 4)
})




var markers = [
    { category: 'Toilet Open and care taker available', icon: L.icon({ iconUrl: './lib/assets/Green.png', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [1, -9] }) },
    { category: 'Toilet Open But no care taker', icon: L.icon({ iconUrl: './lib/assets/Blue.png', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [1, -9] }) },
    { category: 'Toilet Closed', icon: L.icon({ iconUrl: './lib/assets/Red.png', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [1, -9] }) },
    { category: 'ULB Boundary', icon: L.icon({ iconUrl: './lib/assets/Boundary.png', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [1, -9] }) },
    { category: 'Major Roads', icon: L.icon({ iconUrl: './lib/assets/Roads.png', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [1, -9] }) }
];

// Create a rectangle layer


// Create a legend control
var legend = L.control({ position: 'bottomright' });

// Define the legend content dynamically based on markers and rectangle
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend-container');
    div.innerHTML = '<div class="legend-heading"><strong>Legend</strong></div>';

    markers.forEach(function (marker) {
        div.innerHTML += '<p style="margin: 4px 0;"><img src="' + marker.icon.options.iconUrl + '" alt="' + marker.category + '" style="width: 24px; height: 24px;"> ' + marker.category + '</p>';
    });

    // Add rectangle legend
    // div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><rect width="24" height="16" style="fill:#FF0000;stroke:#FF0000;stroke-width:2" /></svg> Rectangle</p>';
     
    // Add Polyline to the Legend
    // div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><line x1="0" y1="12" x2="24" y2="12" style="stroke:#FF0000;stroke-width:2" /></svg> Real Line</p>';

    return div;
};


// Add legend to the map
legend.addTo(map);

// Add a button to toggle legend visibility
var toggleLegendButton = L.control({ position: 'bottomright' });

toggleLegendButton.onAdd = function (map) {
    var buttonDiv = L.DomUtil.create('div', 'toggle-legend-button');
    buttonDiv.innerHTML = '<button onclick="toggleLegend()" style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Legend</button>';
    return buttonDiv;
};

toggleLegendButton.addTo(map);

// Initially hide the legend
var legendContainer = document.querySelector('.legend-container');
legendContainer.style.display = 'none';

// Function to toggle legend visibility
function toggleLegend() {
    if (legendContainer.style.display === 'none' || legendContainer.style.display === '') {
        legendContainer.style.display = 'block';
    } else {
        legendContainer.style.display = 'none';
    }
}