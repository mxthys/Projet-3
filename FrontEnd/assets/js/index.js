

  let works = []; // 🔹 variable qui stocke les données

fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    return response.json();
  })
  .then(data => {
    works = data; // on stocke les données ici
    console.log('Données récupérées :', works);
    afficherWorks(works); // Fonction qui affiche la galerie
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
  
//PARTIE 1 VIDER LE CONTENU DE LA GALERIE
    // il faut afficher pour chaque éléments, une image et une caption

function afficherWorks(works) {
    
//récupérer la galerie
    const gallery = document.querySelector(".gallery");

//supprimer le contenu de gallery
  gallery.innerHTML = ""

//récuperer la source de l'image et la caption de chaque élément du tableau 
works.forEach((element)=>{
const imgSrc = element.imageUrl
const captionElement = element.title

//recréer les balises
const figure = document.createElement("figure")
figure.classList.add("figureGallery")
const img = document.createElement("img")
const caption = document.createElement("figcaption")

//injecter la source de l'image dans la balise img et la caption pour chaque élément
img.src= imgSrc
caption.innerText = captionElement

//injecter les balises image et figcaption dans la balise figure
figure.appendChild(img)
figure.appendChild(caption)
//implémenter dans la partie gallery de HTML
gallery.appendChild(figure)

  })}


                                        //PARTIE 2 CONFIGURER LES BOUTONS FILTRES ET LES RENDRE FONCTIONNELS

// TOUS  1 : OBJETS 2 : APPARTEMENTS 3 : HOTELS ET RESTAURANTS 
// Selon la categoryid du bouton cliqué, seules les images qui ont la categoryid corespondant s'affichent
//on clique sur le bouton => la gallerie se vide puis l'on recrée uniquement les images ayant l'id correspondant
//recuperer la categoryid du bouton,si la categoryid est 0 on lance la fonction afficherworks, si l'element possede un autre id alors on crée uniquement les elements qui ont cet id et on les implémentes dans le html



// Créer des boutons avec des catégories 0 1 2 3
const portfolio = document.querySelector("#portfolio");
const galleryTitle = document.getElementById("gallery-title");

const divButton = document.createElement("div");
divButton.classList.add("btn-filter-div")
divButton.innerHTML = `
  <button data-category="0" class="btn-filter">Tous</button>
  <button data-category="1" class="btn-filter">Objets</button>
  <button data-category="2" class="btn-filter">Appartements</button>
  <button data-category="3" class="btn-filter">Hotels et restaurants</button>
`;

galleryTitle.insertAdjacentElement("afterend", divButton);




//récupération des boutons
const boutons = document.querySelectorAll(".btn-filter");
// Ajout des listeners aux boutons
boutons.forEach(bouton => {
  bouton.addEventListener("click", () => {
//récuperer la categoryid avec le listener
    const categoryId = +bouton.dataset.category; 
//si la categoryid est 0 alors lancer la fonction initiale 
//sinon on vient crée une liste qui contient uniquement les éléments qui on le bon id et on lance la fonction avec cette liste
    const worksFiltrés = categoryId === 0 ? works : works.filter(work => work.categoryId === categoryId); 

    afficherWorks(worksFiltrés); // afficher uniquement les éléments filtrés
  });
});

 
                              //PARTIE 4 Récupérer le token de connexion, ajouter les style dédiés au mode édition, rendre possible la deconnexion
//Récupération du token, et 
const token = localStorage.getItem("token");

if (token) {
  activerModeEdition();
}

function activerModeEdition() {

// créer un une banniere, créer un élément div, lui ajouter un texte "Mode édition" et le l'intégrer dans le html au dessus de du header nav bar
  const banner = document.createElement("div")
  banner.classList.add("edition-banner")
  banner.innerHTML = `<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>`;

  const html = document.documentElement;
  html.insertBefore(banner, document.body);

//login devient logout
  const loginLiIndex = document.getElementById("login-li-index")
  loginLiIndex.textContent = "logout"

//Suppresion des filtres
const filtersDiv = document.querySelector(".btn-filter-div");
filtersDiv.classList.add("hidden")

//apparition du bouton modifier
const buttonGallery = document.getElementById("gallery-title-button")
buttonGallery.classList.remove("hidden")

//logout deconnecte l'utilisateur
 loginLiIndex.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});



                                          // PARTIE 5 quand on appuie sur modifier, une fenetre apparait


//appliquer un listener au bouton modifier pour que le bouton modifier fasse apparaitre la modale
buttonGallery.addEventListener("click", () => {
  const modal = document.getElementById("modal-container")
  modal.classList.remove("hidden")
  afficherGalerieModale();
})
} 
                                            //FONCTION QUI AFFICHE LES ELEMENTS DE LA MODALE 

function afficherGalerieModale() {
  const modal = document.getElementById("modal-container");
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = ""; // vider la modale
  
  // Fermeture de la modale quand on clique en dehors
  modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }})

  // Bouton fermer
  const divCloseButton = document.createElement("div")
  divCloseButton.id = "divCloseButton"
  const closeModal = document.createElement("button");
  closeModal.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  closeModal.classList.add("backCloseButton")
  closeModal.id = "closeIcon"
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  divCloseButton.appendChild(closeModal);
  modalContent.appendChild(divCloseButton);

  //Div contenu hors croix
  const divContenu = document.createElement("div")
  divContenu.classList.add("divContenu")
  modalContent.appendChild(divContenu)

  // Titre galerie
  const galleryTitle = document.createElement("h2");
  galleryTitle.classList.add("gallery-title");
  galleryTitle.textContent = "Galerie photo";
  divContenu.appendChild(galleryTitle);

  // Galerie images
  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modale-gallery");
  divContenu.appendChild(modalGallery);
  afficherWorksModal(works);
  

  // HR
  const hrModal = document.createElement("hr");
  hrModal.classList.add("modal-hr");
  divContenu.appendChild(hrModal);

  // Bouton Ajouter Photo
  const addPhoto = document.createElement("button");
  addPhoto.textContent = "Ajouter une photo";
  addPhoto.classList.add("addPhoto");
  modalContent.appendChild(addPhoto);

  // ✅ Listener correctement attaché
  addPhoto.addEventListener("click", afficherFormulaireAjout);
}


                                              //FONCTION QUI AFFICHE LA GALERIE DE LA MODALE
function afficherWorksModal(works){

//récuperer la source de l'image de chaque élément du tableau 
works.forEach((element)=>{
const imgSrc = element.imageUrl

//recréer les balises
const img = document.createElement("img")

//injecter la source de l'image dans la balise img pour chaque élément
img.src= imgSrc

//on crée une div
const imgModal = document.createElement("div")
imgModal.classList.add("modal-img-div")

//On créer le bouton supprimer
const deleteButton = document.createElement("button")
deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
deleteButton.classList.add("delete-button")

//implémenter dans la partie gallery de HTML
const modalGalleryDiv = document.querySelector(".modale-gallery")
imgModal.appendChild(img)
imgModal.appendChild(deleteButton)
modalGalleryDiv.appendChild(imgModal)

imgDelete()
})}

                                              //FONCTION QUI PERMET DE SUPPRIMER DES IMAGES
function imgDelete() {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", async () => {
      const workId = works[index].id; // récupérer l'id correspondant

      try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Impossible de supprimer l'image");
        }

        // Retirer l'élément du tableau works
        works = works.filter(work => work.id !== workId);

        // Mettre à jour les galeries
        afficherWorks(works);
        afficherGalerieModale();
        console.log("✅ Image supprimée :", workId);
      } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur lors de la suppression de l'image.");
      }
    });
  });
}
                                              //FONCTION QUI AFFICHE LE FORMULAIRE D'AJOUT D'IMAGE

function afficherFormulaireAjout() {
  //On récupère le conteneur la partie contenu de la modale
  const modal = document.getElementById("modal-container")
  const modalContent = document.getElementById("modal-content")

  modalContent.innerHTML = ""

  // div contenant le bouton retour et fermer
  const divCloseBack = document.createElement("div");
  divCloseBack.classList.add("divCloseBack");

  // bouton retour
  const backModal = document.createElement("button");
  backModal.classList.add("backCloseButton");
  backModal.innerHTML = `<i class="fa-solid fa-arrow-left" id="backIcon"></i>`;
  backModal.addEventListener("click", afficherGalerieModale);
  divCloseBack.appendChild(backModal);

  // bouton fermer
  const closeModal = document.createElement("button");
  closeModal.classList.add("backCloseButton");
  closeModal.innerHTML = `<i class="fa-solid fa-xmark" id="closeIcon"></i>`;
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  divCloseBack.appendChild(closeModal);
  modalContent.appendChild(divCloseBack);

//ajout du formulaire d'ajout 
  const divForm = document.createElement("div")
  divForm.classList.add("divForm")

  const formTitle = document.createElement("h2")
  formTitle.textContent = "Ajout photo"
  formTitle.classList.add("formTitle")

  const divDepot = document.createElement("div")
  divDepot.classList.add("divDepot")

  divDepot.innerHTML = `<i id="pictureIcon" class="fa-solid fa-image"></i>
                        <label for="ajout-input" id="add-input">+ Ajouter photo</label>
                        <input type="file" id="ajout-input" accept="image/*" class="hidden">
                        <p id="rule">jpg, png 4mo max</p>`
  
const divChamp = document.createElement("div")
  divChamp.classList.add("divChamp")
  divChamp.innerHTML=`<label for="textarea">Titre</label>
                      <input type="text" id="textarea">
                      <label for="categorySelect" id="labelSelect">Catégorie</label>
                      <select type="text" id="categorySelect"></select>`

const formHr = document.createElement("hr")

const buttonValider = document.createElement("button")
buttonValider.classList.add("buttonValider")
buttonValider.type = "submit"
buttonValider.textContent = "Valider"
  
divForm.appendChild(formTitle)
divForm.appendChild(divDepot)
divForm.appendChild(divChamp)
divForm.appendChild(formHr)
divForm.appendChild(buttonValider)

modalContent.appendChild(divForm)

afficherImgajout()
categoryFill()
activerFormulaireAjout()
}

                                                            //FONCTION PREVISUALISATION D'IMAGE DE L'INPUT



function afficherImgajout() {
  const inputFile = document.getElementById("ajout-input");
  const label = document.getElementById("add-input");

  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {

      // On vide le label (supprime ancienne image, icône, texte…)
      label.innerHTML = "";
      label.id = "add-input2"

      const rule = document.getElementById("rule")
      rule.textContent = ""


      // On crée la preview
      const imagePreview = document.createElement("img");
      imagePreview.src = URL.createObjectURL(file);
      imagePreview.classList.add("image-preview");

      // On l’affiche dans le label
      label.appendChild(imagePreview);

      
      const pictureIcon = document.getElementById("pictureIcon")
      pictureIcon.id = "pictureIconHidden"
    }
  });
}

                                                                //FONCTION CATEGORIE AVEC L'API

  function categoryFill() {
  const select = document.getElementById("categorySelect");
  const optionVide = document.createElement("option")
  select.appendChild(optionVide)

  // Ajouter une option par catégorie unique
  const categories = [];

  works.forEach(work => {

    const cat = work.category;
    if (!categories.find(c => c.id === cat.id)) {
      categories.push(cat);
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    }
  });
}

//fonction qui vérifie que tous les champs sont remplis, rend le bouton valider cliquable et ajoute l'image a la galerie
function activerFormulaireAjout() {

  const inputFile = document.getElementById("ajout-input");
  const titleInput = document.getElementById("textarea");
  const categorySelect = document.getElementById("categorySelect");
  const buttonValider = document.querySelector(".buttonValider");

  function checkFormValidity() {
    const fileSelected = inputFile.files.length > 0;
    const titleFilled = titleInput.value.trim() !== "";
    const categorySelected = categorySelect.value !== "";

    if (fileSelected && titleFilled && categorySelected) {
      buttonValider.classList.add("active");
      buttonValider.disabled = false;
    } else {
      buttonValider.classList.remove("active");
      buttonValider.disabled = true;
    }
  }

  // Écoute les changements
  inputFile.addEventListener("change", checkFormValidity);
  titleInput.addEventListener("input", checkFormValidity);
  categorySelect.addEventListener("change", checkFormValidity);

  checkFormValidity(); // premier check

  // Submit
  buttonValider.addEventListener("click", async (event) => {
    event.preventDefault();

    const file = inputFile.files[0];
    const title = titleInput.value.trim();
    const category = categorySelect.value;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
 
      if (!response.ok) throw new Error("Erreur API");

      const newWork = await response.json();
      works.push(newWork);

      afficherWorks(works);
      afficherGalerieModale(); // rechargement modale

    } catch (error) {
      console.error(error);
      alert("Impossible d’ajouter l’image.");
    }
  });

}

                                                                //FIN MODALE












