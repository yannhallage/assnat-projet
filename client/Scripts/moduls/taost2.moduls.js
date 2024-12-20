const toast2 = ()=>{
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
}
export default toast2