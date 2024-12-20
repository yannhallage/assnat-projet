const express = require("express");
const path = require("path");
const fs = require('fs');
const multer = require('multer');
const { insertVersement, insertVersementFiche } = require('./server/Server-requets/Client-versement-requets');
const { insertRetrait, insertRetraitFiche } = require('./server/Server-requets/Client-retrait-requets');
const { insertAdmin } = require('../assnat-projet/server/Server-requets/Admin-server');

const port = process.env.PORT || 3000;
const app = express();

// Chemin du fichier JSON pour stocker les totaux
const transactionsFilePath = path.join(__dirname, '/server/json/CashBank.json');

// Fonction pour lire le fichier JSON
function readTransactionsData() {
    const data = fs.readFileSync(transactionsFilePath, 'utf8');
    return JSON.parse(data);
}

// Fonction pour écrire dans le fichier JSON
function writeTransactionsData(data) {
    fs.writeFileSync(transactionsFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Middleware pour analyser les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration du moteur de rendu EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

// Middleware pour analyser les données JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de multer pour gérer le stockage
const storage = multer.memoryStorage(); // Stockage en mémoire pour fichiers temporairement
const upload = multer({ storage: storage });

// Servir les fichiers statiques (CSS, JS, images, PDFs)
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'server')));
app.use('/dossier_pdf', express.static(path.join(__dirname, 'dossier_pdf')));

// Routes pour les différentes pages
const route_form = require('./client/routes/route-forms');
app.use("/", route_form);

const route_home = require('./client/routes/route-home');
app.use("/acceuil", route_home);

const route_transaction = require('./client/routes/route-transaction');
app.use("/transaction", route_transaction);

const route_admin = require('./client/routes/route-admin');
app.use("/admin", route_admin);

const route_historique = require('./client/routes/route-historique');
app.use('/historique', route_historique);

const route_export = require('./client/routes/route-export');
app.use('/export', route_export);



// concernant toutes les requets 
// Route pour gérer un versement
app.post('/versement', (req, res) => {
    const { nom, prenom, matricule, montant, montant_lettre, motif, date, service, direction, type_versement, transactionRef } = req.body;
    const data = readTransactionsData();

    // Ajouter le montant au total des versements et au solde
    data.totalVersements += parseFloat(montant);
    data.soldeTotal += parseFloat(montant);

    // Mettre à jour le fichier JSON
    writeTransactionsData(data);
    
    insertVersementFiche(matricule, date, transactionRef, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'insertion du versement dans la fiche :', err);
            return res.status(500).json({ message: 'Erreur lors de l\'insertion dans la fiche' });
        }
    });

    insertVersement(nom, prenom, matricule, montant, montant_lettre, motif, date, service, direction, type_versement, transactionRef, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'insertion du versement :', err);
            return res.status(500).json({ message: 'Erreur lors de l\'insertion du versement' });
        }
        res.render('Client', { nom, prenom, matricule, montant, montant_lettre, motif, date, service, direction, type_versement, transactionRef });
    });
});

// Route pour gérer un retrait
app.post('/retrait', (req, res) => {
    const { nom, prenom, matricule, montant, montant_lettre, motif, date, service_retrait, direction_retrait, type_retrait, transactionRef } = req.body;

    const data = readTransactionsData();
    // Ajouter le montant au total des retraits et soustraire du solde
    data.totalRetraits += parseFloat(montant);
    data.soldeTotal -= parseFloat(montant);
    // Mettre à jour le fichier JSON
    writeTransactionsData(data);

    insertRetraitFiche(matricule, date, transactionRef, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'insertion du retrait dans la fiche :', err);
            return res.status(500).json({ message: 'Erreur lors de l\'insertion dans la fiche' });
        }
    });

    insertRetrait(nom, prenom, matricule, montant, montant_lettre, motif, date, service_retrait, direction_retrait, type_retrait, transactionRef, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'insertion du retrait :', err);
            return res.status(500).json({ message: 'Erreur lors de l\'insertion du retrait' });
        }
        res.render('Retrait', { nom, prenom, matricule, montant, montant_lettre, motif, date, service_retrait, direction_retrait, type_retrait, transactionRef });
    });
});

// Route pour sauvegarder un fichier PDF
app.post('/sauvegarder-pdf', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier reçu.' });
        }

        const { matricule, date_versement } = req.body;
        if (!matricule || !date_versement) {
            return res.status(400).json({ message: 'Matricule ou date de versement manquants.' });
        }

        // Nettoyage et formatage de la date de versement
        const cleanDate = date_versement.replace(/[-:.]/g, "");
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Horodatage unique
        const pdfFilename = `${matricule}_${timestamp}.pdf`; // Fichier unique par transaction
        const pdfPath = path.join(__dirname, 'dossier_pdf', pdfFilename);

        // Création du dossier s'il n'existe pas et écriture du fichier
        await fs.promises.mkdir(path.dirname(pdfPath), { recursive: true });
        await fs.promises.writeFile(pdfPath, req.file.buffer);

        res.status(200).json({ message: 'PDF sauvegardé avec succès.', filename: pdfFilename });
    } catch (err) {
        console.error('Erreur :', err);
        res.status(500).json({ message: 'Erreur lors du traitement.' });
    }
});


// Route pour afficher un PDF
app.post('/affiche_pdf', (req, res) => {
    const { pdf_name } = req.body;
    const pdfUrl = `/dossier_pdf/${pdf_name}`;
    res.render('ficheTransaction', { pdfUrl });
});

// Route pour ajouter un admin
app.post('/admins', (req, res) => {
    const { matricule, nom, prenom, mot_de_passe } = req.body;

    if (!matricule || !nom || !prenom || !mot_de_passe) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    insertAdmin(matricule, nom, prenom, mot_de_passe, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de l\'admin :', err);
            return res.status(500).json({ message: 'Erreur lors de l\'insertion de l\'admin' });
        }
        res.status(200).json({ message: 'Admin ajouté avec succès', results });
    });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur en ligne sur le port ${port}`);
    // console.log('yannhallage')
});
