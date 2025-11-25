//PARTIE 3 RECUPERER LES VALEURS ENTREES ET LES ENVOYER A L'API
//Récuperer les valeurs entrées
const loginForm = document.getElementById("login-Form");

loginForm.addEventListener("submit", function(event) { 

    event.preventDefault(); // empêche le rechargement de la page

    const mail = document.getElementById("email").value
    const userPW = document.getElementById("userPW").value

    console.log(`Le mail est : ${mail} le mot de passe est ${userPW}`)

    //Les mettre dans un objet 
const identifiants = {
    email : mail,
    password : userPW
}
//Créer la charge utile
const chargeUtile = JSON.stringify(identifiants)

//envoyer les valeurs
fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type"  : "application/json"},
    body : chargeUtile
})

//Gérer la réponse de l'API
.then(response => response.json())
  .then(data => {
    console.log("Réponse du serveur :", data);

    if (data.token) {
      console.log("Connexion réussie !");
      // Sauvegarder le token pour plus tard
      localStorage.setItem("token", data.token);
      // Rediriger vers la page principale
      window.location.href = "index.html";
    } else {
      console.log("Identifiants incorrects !");
      alert("E-mail ou mot de passe incorrect.");
    }
  })
  .catch(error => {
    console.error("Erreur réseau :", error);
  });
});



