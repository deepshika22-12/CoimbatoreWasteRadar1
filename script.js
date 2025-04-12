// Initialize bin statuses
let binStatuses = {
    bin1: 'low', bin2: 'medium', bin3: 'high', bin4: 'medium', bin5: 'low',
    bin6: 'high', bin7: 'low', bin8: 'medium', bin9: 'high', bin10: 'medium',
    bin11: 'low', bin12: 'high', bin13: 'medium', bin14: 'low', bin15: 'high'
};

// Initialize bin names and locations
const bins = [
    { id: 'bin1', name: 'RS Puram', lat: 11.0016, lon: 76.9670 },
    { id: 'bin2', name: 'Gandhipuram', lat: 11.0077, lon: 76.9774 },
    { id: 'bin3', name: 'Peelamedu', lat: 11.0392, lon: 76.9572 },
    { id: 'bin4', name: 'Kovai Pudur', lat: 11.0789, lon: 76.9523 },
    { id: 'bin5', name: 'Singanallur', lat: 11.0341, lon: 76.9519 },
    { id: 'bin6', name: 'Tidel Park', lat: 11.0184, lon: 76.9657 },
    { id: 'bin7', name: 'Ukkadam', lat: 11.0331, lon: 76.9789 },
    { id: 'bin8', name: 'Peelamedu Market', lat: 11.0275, lon: 76.9616 },
    { id: 'bin9', name: 'Saibaba Colony', lat: 11.0102, lon: 76.9553 },
    { id: 'bin10', name: 'Race Course', lat: 10.9979, lon: 76.9648 },
    { id: 'bin11', name: 'Pappanaickenpalayam', lat: 11.0387, lon: 76.9709 },
    { id: 'bin12', name: 'Tatabad', lat: 11.0045, lon: 76.9701 },
    { id: 'bin13', name: 'Tatabad (2)', lat: 11.0085, lon: 76.9754 },
    { id: 'bin14', name: 'Peelamedu (2)', lat: 11.0130, lon: 76.9500 },
    { id: 'bin15', name: 'Gandhipuram (2)', lat: 11.0071, lon: 76.9735 }
];

// Initialize map with Leaflet.js
const map = L.map('map').setView([11.0168, 76.9558], 12); // Coordinates for Coimbatore

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for bins on the map
bins.forEach(bin => {
    const marker = L.marker([bin.lat, bin.lon]).addTo(map);
    marker.bindPopup(`${bin.name}<br>Status: ${capitalizeFirstLetter(binStatuses[bin.id])}`);
});

// Function to capitalize the first letter
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to update all bin statuses
function updateAllBins() {
    for (let binId in binStatuses) {
        if (binStatuses[binId] === 'low') {
            binStatuses[binId] = 'medium';
        } else if (binStatuses[binId] === 'medium') {
            binStatuses[binId] = 'high';
        } else {
            binStatuses[binId] = 'low';
        }

        // Update bin status in UI
        document.getElementById(`status-${binId}`).textContent = capitalizeFirstLetter(binStatuses[binId]);
        const binElement = document.getElementById(binId);
        binElement.classList.remove('low', 'medium', 'high');
        binElement.classList.add(binStatuses[binId]);

        // Update marker on map with new status
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                if (layer.getPopup().getContent().includes(binStatuses[binId])) {
                    layer.setPopupContent(`${bins.find(bin => bin.id === binId).name}<br>Status: ${capitalizeFirstLetter(binStatuses[binId])}`);
                }
            }
        });
    }
}

// Event listener for update button
document.getElementById('update-btn').addEventListener('click', updateAllBins);
