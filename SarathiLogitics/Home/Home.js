let map, marker, activeField;

function initAutocomplete() {
  const pickupInput = document.getElementById("pickup");
  const deliveryInput = document.getElementById("delivery");

  const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, { componentRestrictions: { country: "np" } });
  const deliveryAutocomplete = new google.maps.places.Autocomplete(deliveryInput, { componentRestrictions: { country: "np" } });

  pickupAutocomplete.addListener("place_changed", () => {
    const place = pickupAutocomplete.getPlace();
    console.log("Pickup:", place.formatted_address);
  });

  deliveryAutocomplete.addListener("place_changed", () => {
    const place = deliveryAutocomplete.getPlace();
    console.log("Delivery:", place.formatted_address);
  });
}

function openMap(fieldId) {
  activeField = document.getElementById(fieldId);
  document.getElementById("mapModal").style.display = "flex";

  // Initialize map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.7172, lng: 85.3240 }, // Kathmandu default
    zoom: 13
  });

  marker = new google.maps.Marker({
    position: { lat: 27.7172, lng: 85.3240 },
    map,
    draggable: true
  });

  // Update field on marker drag
  google.maps.event.addListener(marker, 'dragend', function () {
    const pos = marker.getPosition();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: pos }, function (results, status) {
      if (status === "OK" && results[0]) {
        activeField.value = results[0].formatted_address;
      }
    });
  });
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
}

window.onload = initAutocomplete;
