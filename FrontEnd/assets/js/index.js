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
//récupérer les balises img et figcaption
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
