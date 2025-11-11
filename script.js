document.addEventListener("DOMContentLoaded", () => {
  const copy = document.querySelector(".logos-slide").cloneNode(true);
  document.querySelector(".logos").appendChild(copy);

  const form = document.getElementById("briefForm");
  const submitButton = form.querySelector('button[type="submit"]');

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzrx50KpWh6_thS6M_QTdxliExG-aGa1zEAUUpMoH0JGnxrnHjUp09raO6EIbsZffXo/exec";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const formData = new FormData(form);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.result === "success") {
          alert("Form submitted successfully!");
          form.reset();
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      });
  });
});
