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
