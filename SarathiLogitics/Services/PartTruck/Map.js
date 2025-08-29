let map, marker, activeInput, autocomplete, infoWindow, searchBox;

function initMap(lat = 27.7172, lng = 85.324) {
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

  infoWindow = new google.maps.InfoWindow();

  // Set marker position
  google.maps.event.addListener(map, "click", (event) => {
    marker.setPosition(event.latLng);
  });

  /* Current Location Button */
  const locationButton = document.createElement("div");
  locationButton.style.backgroundColor = "#fff";
  locationButton.style.border = "2px solid #fff";
  locationButton.style.borderRadius = "50%";
  locationButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  locationButton.style.cursor = "pointer";
  locationButton.style.margin = "10px";
  locationButton.style.width = "40px";
  locationButton.style.height = "40px";
  locationButton.style.display = "flex";
  locationButton.style.alignItems = "center";
  locationButton.style.justifyContent = "center";

  const innerCircle = document.createElement("div");
  innerCircle.style.width = "12px";
  innerCircle.style.height = "12px";
  innerCircle.style.background = "#fff";
  innerCircle.style.borderRadius = "50%";
  innerCircle.style.boxShadow = "0 0 0 4px rgba(161, 162, 163, 0.6)";
  locationButton.appendChild(innerCircle);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          marker.setPosition(pos);
          map.setCenter(pos);

          innerCircle.style.background = "#4285F4";
          innerCircle.style.boxShadow = "0 0 0 4px rgba(130, 187, 244, 0.6)";
        },
        () => handleLocationError(true, map.getCenter())
      );
    } else {
      handleLocationError(false, map.getCenter());
    }
  });

  /* Search Box */
  const input = document.createElement("input");
  input.id = "pac-input";
  input.type = "text";
  input.placeholder = "Search location...";
  input.style.cssText = `
    box-sizing: border-box;
    border: 1px solid transparent;
    width: 240px;
    height: 32px;
    margin-top: 3.5rem;
    padding: 1.2rem 1rem;
    border-radius: 5rem;
    font-size: 14px;
    outline: none;
    text-overflow: ellipsis;
    position: relative;
    z-index: 5;
    right: 10px;
    top: 0px;
    left: 0;
    margin-left: 0.5rem;
  `;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  searchBox = new google.maps.places.SearchBox(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    markers.forEach((m) => m.setMap(null));
    markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) return;

      markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        })
      );

      marker.setPosition(place.geometry.location);

      if (place.geometry.viewport) bounds.union(place.geometry.viewport);
      else bounds.extend(place.geometry.location);
    });
    map.fitBounds(bounds);
  });
}

function handleLocationError(browserHasGeolocation, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "❌ Error: The Geolocation service failed."
      : "❌ Error: Your browser doesn’t support geolocation."
  );
  infoWindow.open(map);
}

function openMapForInput(input) {
  activeInput = input;
  document.getElementById("mapModal").style.display = "block";
  setTimeout(() => initMap(), 200);
}

// Enable Places Autocomplete for pickup/delivery inputs
function enableAutocomplete(input) {
  autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ["formatted_address", "geometry"],
    componentRestrictions: { country: "np" },
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    const location = place.geometry.location;
    if (!map) initMap(location.lat(), location.lng());
    else {
      map.setCenter(location);
      marker.setPosition(location);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const pickupInput = document.querySelector(
    'input[placeholder="Enter pickup address"]'
  );
  const deliveryInput = document.querySelector(
    'input[placeholder="Enter delivery address"]'
  );

  const pickupIcon = pickupInput.previousElementSibling;
  const deliveryIcon = deliveryInput.previousElementSibling;

  pickupIcon.addEventListener("click", () => openMapForInput(pickupInput));
  deliveryIcon.addEventListener("click", () => openMapForInput(deliveryInput));

  enableAutocomplete(pickupInput);
  enableAutocomplete(deliveryInput);

  // Close modal
  document.getElementById("closeMap").addEventListener("click", () => {
    document.getElementById("mapModal").style.display = "none";
  });

  // Confirm location button
  document.getElementById("confirmLocation").addEventListener("click", () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: marker.getPosition() }, (results, status) => {
      if (status === "OK" && results[0]) {
        activeInput.value = results[0].formatted_address;
      } else {
        activeInput.value = `${marker.getPosition().lat()}, ${marker
          .getPosition()
          .lng()}`;
      }
    });
    document.getElementById("mapModal").style.display = "none";
  });
});
