// moduls 

const toast = ()=>{
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

      document.querySelector('#nom').value = ''
      document.querySelector('#prenom').value = ''
      document.querySelector('#matricule-deposant').value = ''
      document.querySelector('#montant-chiffre').value = ''
      document.querySelector('#montant-lettre').value = ''
      document.querySelector('#motif-versement').value = ''
      document.querySelector('#date-versement').value = ''   
      document.querySelector('#adresse').value = ''
}
export default toast