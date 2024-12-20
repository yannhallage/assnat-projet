// Appels des plugins
const mysql = require('mysql');
const dotenv = require('dotenv');

// Utiliser dotenv pour bien passer les informations sur la BD
// dotenv.config({ path: '.env' });

// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
  host: 'localhost',     // Hôte local
  port: 3306,            // Port par défaut de MySQL
  user: 'root',          // Nom d'utilisateur 'racine'
  password: 'root',      // Mot de passe 'racine'
  database: 'assnat_projet'  // Remplace par le nom de ta base de données
});

// Vérification de la connexion
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion:', err);
    } else {
        console.log('Connecté a  MYSQL et la base de donnée');
    }
});

// Fonction d'insertion des données en BD
function insertVersement(nom ,prenom,matricule,montant,montant_lettre,motif,date,service,direction,type_versement,transactionRef, callback) {
    const query = 'INSERT INTO transaction_paiment (reference_transaction,matricule_client,nom_client,prenom_client,service_client,direction_client,type_operation,montant_operation,montant_lettre,motif_versement,date_transaction) VALUES (?, ?,?,?,?,?,?,?,?,?,?)';
    connection.query(query, [transactionRef,matricule,nom,prenom,service,direction,type_versement,montant,montant_lettre,motif,date], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }
  // requete pour les fiche de transactions
  function insertVersementFiche(matricule,date,transactionRef, callback) {
      const query = 'INSERT INTO fiche_transaction (reference_transaction,matricule_client,date_transaction) VALUES (?, ?,?)';
      connection.query(query, [transactionRef,matricule,date], (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      });
    }
  
  module.exports = { insertVersement,insertVersementFiche };