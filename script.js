const apiEndpoint = "https://api.pexels.com/v1/search?query=";
const apiKey = "9HV01XpSlh4lhLWxjGCGV5dYbyPCH3t3XMLc3zesLnO9QdJVeiGJ4BEq";
const photoContainer = document.getElementById("photoContainer");

//Bottoni per caricare gli album
const loadImagesBtn = document.getElementById("loadImagesBtn");
const secondaryImagesBtn = document.getElementById("secondaryImagesBtn");

loadImagesBtn.addEventListener("click", () => {
    fetchPhotos("nature");
});

secondaryImagesBtn.addEventListener("click", () => {
    fetchPhotos("tiger");
});

//Funzione per richiesta API
function fetchPhotos(query) {
    fetch(apiEndpoint + query, {
        headers: {
            Authorization: apiKey
        }
    })
        .then(response => response.json())
        .then(data => displayPhotos(data.photos))
}

// Funzioni per creare le Card
function displayPhotos(photos) {
    photoContainer.innerHTML = "";

    photos.forEach(photo => {
        const card = createCard(photo);
        photoContainer.appendChild(card);
    });
}
function createCard(photo) {
    const card = document.createElement("div");
    card.classList.add("col-3", "mb-4");

    const cardElement = `
      <div class="card">
        <img src="${photo.src.medium}" class="card-img-top" alt="${photo.photographer}">
        <div class="card-body">
          <h5 class="card-title">${photo.photographer}</h5>
          <p class="card-text">ID: ${photo.id}</p>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#photoModal${photo.id}">View</button>
          <button class="btn btn-danger" onclick="hideCard(event)">Hide</button>
        </div>
      </div>
    `;

    card.innerHTML = cardElement;

    const modal = createModal(photo);
    document.body.appendChild(modal);

    return card;
}

// Funzione per il modale
function createModal(photo) {
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `photoModal${photo.id}`;

    const modalElement = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${photo.photographer}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <img src="${photo.src.original}" class="img-fluid" alt="${photo.photographer}">
          </div>
        </div>
      </div>
    `;

    modal.innerHTML = modalElement;

    return modal;
}

// Funzione per scartare una foto dall'album
function hideCard(event) {
    const card = event.target.closest('.card').remove()
}