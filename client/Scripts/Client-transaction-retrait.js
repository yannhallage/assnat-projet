
if (document.cookie !== ""){
    console.log(true)
    console.log(document.cookie)
}else{
    window.location.href="/"
}

let validation_retrait= document.querySelector('#Validation_retrait')
let effacer_retrait = document.querySelector('#effacer_retrait')



// au declenchement du btn pour la validation
validation_retrait.addEventListener('click' , ()=>{
    console.log(true)
    // appeler les variables 
    let nom = document.querySelector('#nom-beneficiaire').value
    let prenom = document.querySelector('#prenom-beneficiaire').value
    let service_retrait = document.querySelector('#service-beneficiaire').value
    let direction_retrait = document.querySelector('#direction-beneficiaire').value
    let matricule = document.querySelector('#matricule-beneficiaire').value
    let montant = document.querySelector('#montant-chiffre-retrait').value
    let montant_lettre = document.querySelector('#montant-lettre-retrait').value
    let motif = document.querySelector('#motif-retrait').value
    let date = document.querySelector('#date-retrait').value
    let adress = document.querySelector('#adresse-beneficiaire')
    let type_retrait = document.querySelector('#type-retrait').value
    if (nom !== '' && prenom !== '' && matricule !== '' && montant !== '' && adress !== '' && montant_lettre !== '' && motif !== '' && date !== ''  && service_retrait !== '' && direction_retrait !==''){
        // appeler la fonction pour la validation
        console.log(nom)
        console.log(prenom)
        console.log(matricule)
        console.log(montant)
        console.log(montant_lettre)
        console.log(motif)
        console.log(date)
        // console.log(adress)
        console.log(service_retrait)
        console.log(direction_retrait)
        // let date_transact = date()
        // reference 
        const baseRef = "ref_0030062001";
        const transactionRef = generateTransactionRef(baseRef);
        // others
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Transaction validée"
          });

        //   utilisationd de la requete fecth()
        // fetch('/retrait', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       nom,
        //       prenom,
        //       matricule,
        //       montant,
        //       motif,
        //       date,
        //        service_retrait,  // Correction ici
        //       direction_retrait,  // Correction ici
        //       type_retrait,
        //       transactionRef
        //     })
        //   })
        // effectuer les requets post 
        fetch('/retrait', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, matricule, montant,montant_lettre,motif, date, service_retrait, direction_retrait, type_retrait, transactionRef })
        })
        .then(response => {
            return response.text();  // Traiter la réponse en tant que texte HTML
        })
        .then(html => {
            document.open();  // Ouvrir le document
            document.write(html);  // Insérer le contenu HTML dans le document
            document.close();  // Fermer l'écriture du document
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert("Une erreur s'est produite lors de l'enregistrement du versement.");
        });
        
          document.querySelector('#nom-beneficiaire').value = ''
          document.querySelector('#prenom-beneficiaire').value = ''
          document.querySelector('#matricule-beneficiaire').value = ''
          document.querySelector('#montant-chiffre-retrait').value = ''
          document.querySelector('#montant-lettre-retrait').value = ''
          document.querySelector('#motif-retrait').value = ''
          document.querySelector('#date-retrait').value = ''   
          document.querySelector('#adresse-beneficiaire').value = ''
          document.querySelector('#service-beneficiaire').value =''
          document.querySelector('#direction-beneficiaire').value =''
    }else{
        console.log('vide')
        Swal.fire({
            title: "Champ vide!!!",
            text: "verifier les champs du formulaire",
            icon: "info"
          });
    }
})

// effacer les donnees
effacer_retrait.addEventListener('click', ()=>{
    Swal.fire({
        title: "etres vous sure ?",
        text: "Vous etes sur le point de vide les champs",
        icon: "attention",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Supprimé!",
            text: "Your file has been deleted.",
            icon: "success"
            
          });
          document.querySelector('#nom-beneficiaire').value = ''
          document.querySelector('#prenom-beneficiaire').value = ''
          document.querySelector('#matricule-beneficiaire').value = ''
          document.querySelector('#montant-chiffre-retrait').value = ''
          document.querySelector('#montant-lettre-retrait').value = ''
          document.querySelector('#motif-retrait').value = ''
          document.querySelector('#date-retrait').value = ''   
          document.querySelector('#adresse-beneficiaire').value = ''
          document.querySelector('#service-beneficiaire').value =''
          document.querySelector('#direction-beneficiaire').value =''
        }
      });
  
})

  // creation de la reference 
  function generateTransactionRef(baseRef) {
    // Générer un nombre aléatoire pour rendre la référence unique
    const randomNumber = Math.floor(Math.random() * 1000000000); // 9 chiffres aléatoires
    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Lettre aléatoire a-z

    // Combiner la référence de base avec le nombre et la lettre aléatoire
    const transactionRef = `${baseRef}${randomNumber}${randomChar}`;

    return transactionRef;
}