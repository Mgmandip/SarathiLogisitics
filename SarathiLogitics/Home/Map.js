let mapApp = {
  map: null,
  marker: null,
  activeInput: null,
  autocomplete: null,
  infoWindow: null,
  searchBox: null,
};

function initMap(lat = 27.7172, lng = 85.324) {
  if (mapApp.map) return; // prevent multiple re-initializations

  const center = { lat, lng };

  mapApp.map = new google.maps.Map(document.getElementById("map"), {
    center,
    zoom: 14,
  });

  mapApp.marker = new google.maps.Marker({
    position: center,
    map: mapApp.map,
    draggable: true,
  });

  mapApp.infoWindow = new google.maps.InfoWindow();

  // Click to set marker
  google.maps.event.addListener(mapApp.map, "click", (event) => {
    mapApp.marker.setPosition(event.latLng);
  });

  /* Current Location Button */
  const locationButton = document.createElement("div");
  locationButton.style.cssText = `
    background: #fff; border: 2px solid #fff; border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3); cursor: pointer;
    margin: 10px; width: 40px; height: 40px; display: flex;
    align-items: center; justify-content: center;
  `;
  const innerCircle = document.createElement("div");
  innerCircle.style.cssText = `
    width: 12px; height: 12px; background: #fff; border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(161,162,163,0.6);
  `;
  locationButton.appendChild(innerCircle);
  mapApp.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          mapApp.marker.setPosition(coords);
          mapApp.map.setCenter(coords);
          innerCircle.style.background = "#4285F4";
          innerCircle.style.boxShadow = "0 0 0 4px rgba(130,187,244,0.6)";
        },
        () => handleLocationError(true, mapApp.map.getCenter())
      );
    } else {
      handleLocationError(false, mapApp.map.getCenter());
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
    position: relative; 
    z-index: 5; 
    right: 10px; 
    top: 0px; 
    left: 0; 
    margin-left: 0.5rem;
  `;
  mapApp.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  mapApp.searchBox = new google.maps.places.SearchBox(input);

  mapApp.map.addListener("bounds_changed", () => {
    mapApp.searchBox.setBounds(mapApp.map.getBounds());
  });

  let markers = [];
  mapApp.searchBox.addListener("places_changed", () => {
    const places = mapApp.searchBox.getPlaces();
    if (!places.length) return;

    markers.forEach((m) => m.setMap(null));
    markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry?.location) return;

      markers.push(
        new google.maps.Marker({
          map: mapApp.map,
          title: place.name,
          position: place.geometry.location,
        })
      );

      mapApp.marker.setPosition(place.geometry.location);
      if (place.geometry.viewport) bounds.union(place.geometry.viewport);
      else bounds.extend(place.geometry.location);
    });
    mapApp.map.fitBounds(bounds);
  });
}

function handleLocationError(browserHasGeolocation, pos) {
  mapApp.infoWindow.setPosition(pos);
  mapApp.infoWindow.setContent(
    browserHasGeolocation
      ? "❌ Error: The Geolocation service failed."
      : "❌ Error: Your browser doesn’t support geolocation."
  );
  mapApp.infoWindow.open(mapApp.map);
}

function openMapForInput(input) {
  mapApp.activeInput = input;
  document.getElementById("mapModal").style.display = "block";
  setTimeout(() => initMap(), 200);
}

function enableAutocomplete(input) {
  const autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ["formatted_address", "geometry"],
    componentRestrictions: { country: "np" },
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    const location = place.geometry.location;
    if (!mapApp.map) initMap(location.lat(), location.lng());
    else {
      mapApp.map.setCenter(location);
      mapApp.marker.setPosition(location);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const pickupInput = document.getElementById("pickupAddress");
  const deliveryInput = document.getElementById("deliveryAddress");

  pickupInput.previousElementSibling.addEventListener("click", () => openMapForInput(pickupInput));
  deliveryInput.previousElementSibling.addEventListener("click", () => openMapForInput(deliveryInput));

  enableAutocomplete(pickupInput);
  enableAutocomplete(deliveryInput);

  // Close modal
  document.getElementById("closeMap").addEventListener("click", () => {
    document.getElementById("mapModal").style.display = "none";
  });

  // Confirm location button
  document.getElementById("confirmLocation").addEventListener("click", () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: mapApp.marker.getPosition() }, (results, status) => {
      if (status === "OK" && results[0]) {
        mapApp.activeInput.value = results[0].formatted_address;
      } else {
        mapApp.activeInput.value = `${mapApp.marker.getPosition().lat()}, ${mapApp.marker.getPosition().lng()}`;
      }
    });
    document.getElementById("mapModal").style.display = "none";
  });
});
