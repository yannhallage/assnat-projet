{/* <script> */}
// Ajouter une alerte lors du clic sur un fichier PDF
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
        alert('Vous êtes sur le point d\'ouvrir : ' + this.textContent);
    });
});

// Si besoin, ajouter un comportement interactif supplémentaire ici
// Exemple : afficher un message si la liste est vide
const pdfList = document.getElementById('pdf-list');
if (pdfList.children.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Aucun fichier PDF trouvé.';
    document.body.appendChild(emptyMessage);
}
