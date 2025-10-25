let works = []; // 🔹 variable qui stocke les données

fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    return response.json();
  })
  .then(data => {
    works = data; // ✅ on stocke les données ici
    console.log('Données récupérées :', works);
    afficherWorks(works); // Fonction à écrire 
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
const h2 = portfolio.querySelector("h2");

const divButton = document.createElement("div");
divButton.classList.add("btn-filter-div")
divButton.innerHTML = `
  <button data-category="0" class="btn-filter">Tous</button>
  <button data-category="1" class="btn-filter">Objets</button>
  <button data-category="2" class="btn-filter">Appartements</button>
  <button data-category="3" class="btn-filter">Hotels et restaurants</button>
`;

h2.insertAdjacentElement("afterend", divButton);




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















