//objet clique
var objClic = document.getElementsByClassName('symbole');

//selon l'objet clique, une action differente a chacune
//ajouter
var ajout = objClic[1];
ajout.addEventListener('click', ajouter);

//modifier et supprimer
for (var i = 2; i < objClic.length; i++) {
	if(i%2 == 0){
		objClic[i].addEventListener('click', modifier);
	}else{
		objClic[i].addEventListener('click', detruire);
	}
}

//ajouter / ajout d'une rangee vide
function ajouter(){
	var position = this.parentElement.parentElement;
	var rangee = document.createElement('div');
	rangee.innerHTML = '<div class="texte" contenteditable="true"></div><div class="texte" contenteditable="true"></div><div class="texte" contenteditable="true"></div><div class="texte"></div><div class="symbole"><img src="img/sauvegarder.svg"></div><div class="symbole"><img src="img/supprimer.svg"></div>';
	rangee.setAttribute('class', 'table-row');
	position.appendChild(rangee);
	position.children[position.children.length-1].children[4].addEventListener('click', modifier, false);
}

//modifier partie 1
function modifier(){
	console.log("modifier");
	elmLigneDiv = this.parentElement.children;
	lienModifier();
}

//detruire partie 1
function detruire(){
	//console.log('supprimer');
	elmLigneDiv = this.parentElement.children;
	lienDetruire();
}

//modifier partie 2 et ajouter
function lienModifier(){
	xhr = new XMLHttpRequest();
	xhr.open('POST', "modifier", true);
	data = { 
		"nom" : elmLigneDiv[0].innerHTML,
		"prenom" : elmLigneDiv[1].innerHTML,
		"telephone" : elmLigneDiv[2].innerHTML,
		"_id" : elmLigneDiv[3].innerHTML 
	}
	sData = JSON.stringify(data);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(sData);
	xhr.addEventListener("readystatechange", traiterRequest, false);
}

//detruire partie 2
function lienDetruire(){
	xhr = new XMLHttpRequest();
	xhr.open('POST', "supprimer", true);
	data = { 
		"nom" : elmLigneDiv[0].innerHTML,
		"prenom" : elmLigneDiv[1].innerHTML,
		"telephone" : elmLigneDiv[2].innerHTML,
		"_id" : elmLigneDiv[3].innerHTML 
	}
	sData = JSON.stringify(data);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(sData);
	xhr.addEventListener("readystatechange", traiterRequest, false);
}

function traiterRequest(e){
	console.log("xhr.readyState = " + xhr.readyState)
	console.log("xhr.status = " + xhr.status)

	if(xhr.readyState == 4 && xhr.status == 200) {
		console.log('ajax fonctionne')
		var response = JSON.parse(xhr.responseText);
		console.log(xhr.responseText);
		elmLigneDiv[3].innerHTML = response["adresse"][0]["_id"];
		elmLigneDiv[3].parentElement.style.backgroundColor = "#0f0"

	}
}