const fecth = () =>{
    // utilisationd de la requete fecth()
    fetch('/versement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, matricule, montant, motif, date, service, direction, type_versement, transactionRef })
  })
      .then(response => response.json())
      .then(data => {
          if (data.message) {
              alert(data.message);  // Afficher le message de succès ou d'erreur du serveur
          }
      })
      .catch(error => {
          console.error('Erreur:', error);
          alert("Une erreur s'est produite lors de l'enregistrement du versement.");
      });
}
export default fecth