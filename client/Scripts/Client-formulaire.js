let btn_connexion = document.querySelector('#btn-connexion')
let input_matricule = document.querySelector('#Matricule')
let input_password = document.querySelector('#Password')
let connexion_name = document.querySelector('#Connexion_name')
let spinner  = document.querySelector('#spinner')
// matricule & password 
const matricule = "13028404K" 
const password = "30062001@/"

// verification du cookie 
// verification du cookie 
if (document.cookie !== ''){
    window.location.href="/acceuil"
  }else{
    console.log(document.cookie)
  }
// verification avec affiche d'un alert sweet en cas d'erreur 
btn_connexion.addEventListener('click' , () =>{
    console.log('bouton declencher')    
    
    // condition
    if(input_matricule.value == matricule && input_password.value == password){
      console.log('connexion reussie')
      // creation de coockie
      document.cookie = "username=Connexion success; expires=Thu, 18 Oct 2025 12:00:00 UTC"; 
      // document.cookie = "username=Connexion success; expires=Thu, 18 Oct 2024 12:00:00 UTC"; 
        
        spinner.classList.remove('hidden')
        connexion_name.classList.add('hidden')
        setTimeout(() => {
         //   retoure 
         window.location.href="/acceuil"
     },"100");

    }else{

        console.log('connexion echouee')
        spinner.classList.remove('hidden')
        connexion_name.classList.add('hidden')
    //  utilisation d'un timeOut dans ce code aussi lors de l'echec 
    setTimeout(() => {
           // sweet alert
           Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Matricule ou mot de passe incorrect!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        //   retoure 
        spinner.classList.add('hidden')
        connexion_name.classList.remove('hidden')
    },"200");
    }
})