document.addEventListener("DOMContentLoaded", function () {
  const trackBtn = document.getElementById("trackBtn");
  const input = document.getElementById("trackingIdInput");
  const orderContainer = document.getElementById("orderContainer");

  // ✅ Simulated database (using localStorage)
  const demoOrder = {
    id: "643A039C5ADD493",
    sender: {
      name: "Archie Rai",
      phone: "+1 123 456 789",
      email: "archierai@28@gmail.com",
      address: "Dholahiti, Lalitpur",
      city: "Lalitpur",
    },
    receiver: {
      name: "Sita Lama",
      phone: "+977 9800000000",
      email: "sitalama@example.com",
      address: "Kathmandu, Nepal",
      city: "Kathmandu",
    },
    order: {
      item: "Documents",
      quantity: 1,
    },
  };

  // Store the demo order into localStorage
  localStorage.setItem("order_" + demoOrder.id, JSON.stringify(demoOrder));

  // Handle Track Order button
  trackBtn.addEventListener("click", function () {
    const trackingId = input.value.trim();

    if (!trackingId) {
      alert("Please enter a Tracking ID");
      return;
    }

    const orderData = localStorage.getItem("order_" + trackingId);

    if (orderData) {
      const order = JSON.parse(orderData);
      // Show container
      orderContainer.style.display = "block";

      // Fill order details dynamically
      orderContainer.innerHTML = `
          <div class="order-header">
            <h1>Order <span>Information</span></h1>
          </div>
          <div class="order-details">
            <div class="sender">
              <h1 class="sender-header">Sender</h1>
              <div class="sender-information">
                <h1>Name: <span>${order.sender.name}</span></h1>
                <h1>Contact Number: <span>${order.sender.phone}</span></h1>
                <h1>Email: <span>${order.sender.email}</span></h1>
                <h1>Address: <span>${order.sender.address}</span></h1>
                <h1>City: <span>${order.sender.city}</span></h1>
              </div>
            </div>
            <div class="receiver">
              <h1 class="receiver-header">Receiver</h1>
              <div class="receiver-information">
                <h1>Name: <span>${order.receiver.name}</span></h1>
                <h1>Contact Number: <span>${order.receiver.phone}</span></h1>
                <h1>Email: <span>${order.receiver.email}</span></h1>
                <h1>Address: <span>${order.receiver.address}</span></h1>
                <h1>City: <span>${order.receiver.city}</span></h1>
              </div>
            </div>
            <div class="orderitem">
              <h1 class="orderitem-header">Order</h1>
              <div class="orderitem-information">
                <h1>Order Item: <span>${order.order.item}</span></h1>
                <h1>Weight/Quantity: <span>${order.order.quantity}</span></h1>
              </div>
            </div>
          </div>
        `;
    } else {
      orderContainer.style.display = "none";
      alert("No order found with this Tracking ID");
    }
  });
});
