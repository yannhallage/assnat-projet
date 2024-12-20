if (document.cookie !== "") {
    console.log(true);
    console.log(document.cookie);
} else {
    window.location.href = "/";
}

let btn_return = document.querySelector('#btn-return');
btn_return.addEventListener('click', () => {
    window.location.href = "/acceuil";
});

let supprimer = document.querySelector('#supprimer');
let ajouter2 = document.querySelector('#Ajouter');

supprimer.addEventListener('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});

let input1Value, input2Value, input3Value, input4Value; // Déclare les variables globales

ajouter2.addEventListener('click', async () => {
    console.log(true);

    // Définir et appeler la fonction async fetchData
    async function fetchData() {
        const { value: formValues } = await Swal.fire({
            title: "Multiple inputs",
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="matricule">
                <input id="swal-input2" class="swal2-input" placeholder="nom">
                <input id="swal-input3" class="swal2-input" placeholder="prenom">
                <input id="swal-input4" class="swal2-input" placeholder="mot de passe">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const input1 = document.getElementById("swal-input1").value;
                const input2 = document.getElementById("swal-input2").value;
                const input3 = document.getElementById("swal-input3").value;
                const input4 = document.getElementById("swal-input4").value;
                
                return [input1, input2, input3, input4];
            }
        });

        // Si les valeurs sont définies, les stocker dans les variables globales
        if (formValues) {
            [input1Value, input2Value, input3Value, input4Value] = formValues; // Stocker dans les variables globales
            console.log(`Input 1: ${input1Value}, Input 2: ${input2Value}, Input 3: ${input3Value}, Input 4: ${input4Value}`);
        }
    }

    // Appelle la fonction fetchData
    await fetchData();

    // Tu peux maintenant accéder aux valeurs en dehors de l'async
    console.log("En dehors de l'async:");
    console.log(`Matricule: ${input1Value}, Nom: ${input2Value}, Prénom: ${input3Value}, Mot de passe: ${input4Value}`);

    // Envoyer les données au serveur
    fetch('http://localhost:5000/admins', {
        method: 'POST', // Ajout de la méthode POST
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            matricule: input1Value,
            nom: input2Value,
            prenom: input3Value,
            mot_de_passe: input4Value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Données reçues du serveur :", data);
        document.open();
        document.write(data.html); // Assure-toi que la réponse renvoie un `html`
        document.close();
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des données:", error);
    });
});
