
const  deleteAllCookies = ()=> {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      window.location.reload()
  }
}


if (document.cookie !== ""){
    // console.log(true)
    console.log(document.cookie)
    let btn_versmt = document.querySelector('#btn-versmt')
let btn_retrt = document.querySelector('#btn-retrait')
let btn_sold = document.querySelector('#btn-sold')
let sold = document.querySelector('#solde')
let second = document.querySelector('#versement')
let third = document.querySelector('#Retrait')
let btn_return = document.querySelector('#btn-return')
let file = document.querySelector('#file')
let file_c = document.querySelector('#file_c')
let validation_versement= document.querySelector('#Validation_versement')
let effacer_btn = document.querySelector('#effacer_btn')
// btn return
btn_return.addEventListener('click', function(){
    window.location.href="/acceuil"
    console.log(true)
})
// solde
btn_sold.addEventListener('click' , ()=>{
    console.log(true)
    second.classList.add('hidden')
    third.classList.add('hidden')
    sold.classList.remove('hidden')
    file.classList.add('hidden')
     // effet de couleur 
     btn_sold.classList.remove('bg-white')
     btn_sold.classList.add('bg-slate-100')

     btn_versmt.classList.add('bg-white')
     btn_versmt.classList.remove('bg-slate-100')
     btn_retrt.classList.remove('bg-slate-100')
     btn_retrt.classList.add('bg-white')
     file_c.classList.add('bg-white')
     file_c.classList.remove('bg-slate-100')
     console.log('okay')
})
// versement
btn_versmt.addEventListener('click', ()=>{
    console.log(true)
    sold.classList.add('hidden')
    third.classList.add('hidden')
    second.classList.remove('hidden')
    file.classList.add('hidden')
    // effet de couleur
    btn_versmt.classList.remove('bg-white')
    btn_versmt.classList.add('bg-slate-100')
    btn_sold.classList.add('bg-white')
    btn_sold.classList.remove('bg-slate-100')
    btn_retrt.classList.remove('bg-slate-100')
    btn_retrt.classList.add('bg-white')
    file_c.classList.add('bg-white')
    file_c.classList.remove('bg-slate-100')
})
// retrait 
btn_retrt.addEventListener('click', ()=>{
    console.log(true)
    console.log(second)
    second.classList.add('hidden')
    sold.classList.add('hidden')
    third.classList.remove('hidden')
    file.classList.add('hidden')

     // effet de couleur
     btn_retrt.classList.remove('bg-white')
     btn_retrt.classList.add('bg-slate-100')
     btn_versmt.classList.remove('bg-slate-100')
     btn_versmt.classList.add('bg-white')
     btn_sold.classList.remove('bg-slate-100')
     btn_sold.classList.add('bg-white')
     file_c.classList.remove('bg-slate-100')
     file_c.classList.add('bg-white')
})
// consulter 
file_c.addEventListener('click', ()=>{
    console.log(true)
    file.classList.remove('hidden')
    second.classList.add('hidden')
    third.classList.add('hidden')
    sold.classList.add('hidden')

    
     // effet de couleur
     file_c.classList.add('bg-slate-100')
     file_c.classList.remove('bg-white')
     btn_retrt.classList.add('bg-white')
     btn_retrt.classList.remove('bg-slate-100')
     btn_versmt.classList.add('bg-white')
     btn_versmt.classList.remove('bg-slate-100')
     btn_sold.classList.remove('bg-slate-100')
     btn_sold.classList.add('bg-white')
})


// au declenchement du btn pour la validation
validation_versement.addEventListener('click' , ()=>{
    console.log(true)
    // appeler les variables 
    let nom = document.querySelector('#nom').value
    let prenom = document.querySelector('#prenom').value
    let matricule = document.querySelector('#matricule-deposant').value
    let montant = document.querySelector('#montant-chiffre').value
    let montant_lettre = document.querySelector('#montant-lettre').value
    let motif = document.querySelector('#motif-versement').value
    let date = document.querySelector('#date-versement').value
    let adress = document.querySelector('#adresse').value
    let service = document.querySelector('#service').value
    let direction = document.querySelector('#direction').value
    let type_versement = document.querySelector('#type-versement').value
    if (nom !== '' && prenom !== '' && matricule !== '' && montant !== '' && adress !== '' && montant_lettre !== '' && motif !== '' && date !== ''  && service !== '' && direction !==''){
        // appeler la fonction pour la validation
        console.log(nom)
        console.log(prenom)
        console.log(matricule)
        console.log(montant)
        console.log(montant_lettre)
        console.log(motif)
        console.log(date)
        console.log(adress)
        console.log(service)
        console.log(direction)
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
          fetch('/versement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, matricule, montant,montant_lettre ,motif, date, service, direction, type_versement, transactionRef })
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
        
        
      
          document.querySelector('#nom').value = ''
          document.querySelector('#prenom').value = ''
          document.querySelector('#matricule-deposant').value = ''
          document.querySelector('#montant-chiffre').value = ''
          document.querySelector('#montant-lettre').value = ''
          document.querySelector('#motif-versement').value = ''
          document.querySelector('#date-versement').value = ''   
          document.querySelector('#adresse').value = ''
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
effacer_btn.addEventListener('click', ()=>{
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
          document.querySelector('#nom').value = ''
          document.querySelector('#prenom').value = ''
          document.querySelector('#matricule-deposant').value = ''
          document.querySelector('#montant-chiffre').value = ''
          document.querySelector('#montant-lettre').value = ''
          document.querySelector('#motif-versement').value = ''
          document.querySelector('#date-versement').value = ''   
          document.querySelector('#adresse').value = ''
          document.querySelector('#service').value = ''
          document.querySelector('#direction').value = ''
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
}else{
    window.location.href="/"
}

