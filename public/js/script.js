var objClic = document.getElementsByClassName('symbole');

var ajout = objClic[1];
ajout.addEventListener('click', ajouter);

for (var i = 2; i < objClic.length; i++) {
	if(i%2 == 0){
		objClic[i].addEventListener('click', modifier);
	}else{
		objClic[i].addEventListener('click', detruire);
	}
}

function ajouter(){
	console.log('ajouter');
}

function modifier(){
	elmLigneDiv = this.parentElement.children;
	lienModifier();
}

function detruire(){
	//console.log('supprimer');
	elmLigneDiv = this.parentElement.children;
	lienDetruire();
}

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