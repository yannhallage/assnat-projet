// Importation des plugins
const mysql = require('mysql');
const dotenv = require('dotenv');

// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
    host: 'localhost',     // Hôte local
    port: 3306,            // Port par défaut de MySQL
    user: 'root',          // Nom d'utilisateur 'racine'
    password: 'root',      // Mot de passe 'racine'
    database: 'assnat_projet'  // Remplace par le nom de ta base de données
  });;

// Vérification de la connexion
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion:', err);
    } else {
        console.log('Connecté à MYSQL et la base de données');
    }
});

// Fonction d'insertion des données de retrait en BD
function insertAdmin(matricule_admin,nom,prenom,motdepasse, callback) {
    const query = 'INSERT INTO administrateur (matricule_admin , nom_admin, prenom_admin,mot_de_passe) VALUES (?, ?, ?, ?)';
    connection.query(query, [matricule_admin,nom,prenom,motdepasse], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports = { insertAdmin };
