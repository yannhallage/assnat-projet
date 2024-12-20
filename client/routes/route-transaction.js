const express = require("express");
const fs = require('fs');
const path = require('path');
const mysql = require("mysql2");
const router = express.Router();

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',     // Hôte local
    port: 3306,            // Port par défaut de MySQL
    user: 'root',          // Nom d'utilisateur 'racine'
    password: 'root',      // Mot de passe 'racine'
    database: 'assnat_projet'  // Remplace par le nom de ta base de données
  });


// Chemin vers le fichier JSON
const transactionsFilePath = path.join(__dirname, '../../server/json/CashBank.json');

// Fonction pour lire les données du fichier JSON
function readTransactionsData() {
    try {
        const data = fs.readFileSync(transactionsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Erreur lors de la lecture des données :", err);
        return null;
    }
}

// Route pour la page principale
router.get('/', (req, res) => {
    // Chemin vers le dossier contenant les fichiers PDF
    const pdfDir = path.join(__dirname, '../../dossier_pdf');

    // Lire tous les fichiers dans le dossier PDF
    fs.readdir(pdfDir, (err, files) => {
        if (err) {
            return res.status(500).send("Erreur lors de la lecture des fichiers PDF.");
        }

        // Filtrer pour ne garder que les fichiers PDF
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));

        const query = "SELECT Reference_transaction, matricule_client, nom_client, prenom_client, service_client, direction_client, type_operation, Montant_operation, montant_lettre, date_transaction FROM transaction_paiment";

        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).send("Erreur lors de la récupération des transactions.");
            }

            const data = readTransactionsData();

            // Vérifier si les données ont été lues correctement
            if (data) {
                let totalVersements = data.totalVersements || 0;  // Utiliser 0 par défaut
                let totalRetraits = data.totalRetraits || 0;      // Utiliser 0 par défaut
                let soldeTotal = data.soldeTotal || 0;            // Utiliser 0 par défaut

                // Rendre la vue EJS et passer la liste des fichiers PDF, des transactions et des totaux
                res.render('Client-transaction', { pdfFiles, transaction: results, totalVersements, totalRetraits, soldeTotal });
            } else {
                // Si les données ne peuvent pas être lues, passer des valeurs par défaut
                // res.render('Client-transaction', { pdfFiles, transaction: results, totalVersements: 0, totalRetraits: 0, soldeTotal: 0 });
            }
        });
    });
});

module.exports = router;
