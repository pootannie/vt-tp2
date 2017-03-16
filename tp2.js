const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template «ejs»
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

app.use(bodyParser.json());

var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse : resultat})

    }) 
})

app.post('/modifier',  (req, res) => {
    //console.log(req.body);
    var paramPerson = req.body;
    
    //ajouter
    if(paramPerson["_id"] == ""){
        delete paramPerson["_id"];
    }else{
        paramPerson["_id"] = ObjectID(paramPerson["_id"]);
    }console.log(paramPerson);

    db.collection('adresse').save(paramPerson, (err, result) => {
    if (err) return console.log(err)
    db.collection('adresse').find(paramPerson).toArray((err, result) => {
        console.log('sauvegarder dans la BD')
        res.send({adresse:result});
    });
    
    })
})

//supprimer
app.post('/supprimer', (req, res) => {
    var id = req.body._id;
    //console.log(id)
    db.collection('adresse').findOneAndDelete({"_id": ObjectID(id)}, (err, resultat) => {
    if (err) return console.log(err)
    console.log('APOCALYPSE');
    res.send({adresse:resultat});
    })
})
