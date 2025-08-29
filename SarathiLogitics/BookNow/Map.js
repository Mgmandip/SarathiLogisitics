let map, marker, activeInput, autocomplete;

function initMap(lat = 27.7172, lng = 85.3240) { 
  const center = { lat, lng };

  map = new google.maps.Map(document.getElementById("map"), {
    center,
    zoom: 14,
  });

  marker = new google.maps.Marker({
    position: center,
    map,
    draggable: true,
  });

  google.maps.event.addListener(map, "click", (event) => {
    marker.setPosition(event.latLng);
  });
}

function openMapForInput(input) {
  activeInput = input;
  document.getElementById("mapModal").style.display = "block";
  setTimeout(() => initMap(), 200);
}

// Autocomplete for manual typing
function enableAutocomplete(input) {
  autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ["formatted_address", "geometry"],
    componentRestrictions: { country: "np" },
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    // Map and Marker
    const location = place.geometry.location;
    if (!map) initMap(location.lat(), location.lng());
    else {
      map.setCenter(location);
      marker.setPosition(location);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const pickupInput = document.querySelector('input[placeholder="Enter pickup address"]');
  const deliveryInput = document.querySelector('input[placeholder="Enter delivery address"]');

  const pickupIcon = pickupInput.previousElementSibling;
  const deliveryIcon = deliveryInput.previousElementSibling;

  pickupIcon.addEventListener("click", () => openMapForInput(pickupInput));
  deliveryIcon.addEventListener("click", () => openMapForInput(deliveryInput));

  // Enables autocomplete on inputs
  enableAutocomplete(pickupInput);
  enableAutocomplete(deliveryInput);

  // Close modal
  document.getElementById("closeMap").addEventListener("click", () => {
    document.getElementById("mapModal").style.display = "none";
  });

  // Confirm location
  document.getElementById("confirmLocation").addEventListener("click", () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: marker.getPosition() }, (results, status) => {
      if (status === "OK" && results[0]) {
        activeInput.value = results[0].formatted_address;
      } else {
        activeInput.value = `${marker.getPosition().lat()}, ${marker.getPosition().lng()}`;
      }
    });
    document.getElementById("mapModal").style.display = "none";
  });
});
