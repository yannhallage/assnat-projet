const express = require("express");
const fs = require('fs');
const path = require('path');
const mysql = require("mysql2");
const route = express.Router();

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',     // Hôte local
    port: 3306,            // Port par défaut de MySQL
    user: 'root',          // Nom d'utilisateur 'racine'
    password: 'root',      // Mot de passe 'racine'
    database: 'assnat_projet'  // Remplace par le nom de ta base de données
  });

route.get('/' , (req , res) =>{
    // res.sendFile(path.join(__dirname, '../public/Client-historique.html'))
    // recuperation des elemnts depuis la bd 

    
        // Filtrer pour ne garder que les fichiers PDF
        // const pdfFiles = files.filter(file => file.endsWith('.pdf'));

        const query = "SELECT  Reference_transaction, matricule_client,date_transaction,temp_actuel FROM fiche_transaction";

        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).send("Erreur lors de la récupération des transactions.");
            }
            
            // Rendre la vue EJS et passer la liste des fichiers PDF et des transactions
            res.render('Client-historique', { transaction: results });
        });
    });
module.exports = route;