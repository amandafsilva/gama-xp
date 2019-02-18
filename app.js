document.addEventListener("DOMContentLoaded", event => {
    var config = {
        apiKey: "AIzaSyDkaP66Dq0eVpZgkBu6FXyrjuOmV8EBGNc",
        authDomain: "show-me-the-leads.firebaseapp.com",
        databaseURL: "https://show-me-the-leads.firebaseio.com",
        projectId: "show-me-the-leads",
        storageBucket: "show-me-the-leads.appspot.com",
        messagingSenderId: "911938446399"
      };
    firebase.initializeApp(config);
    const app = firebase.app();
});

function insertLead(){
    let lnome = document.getElementById('nome').value;
    let lsnome = document.getElementById('snome').value;
    let lemail = document.getElementById('email').value;
    let ltel = document.getElementById('tel').value;
    let lempresa = document.getElementById('empresa').value;
    let lsegmento = document.getElementById('segmento').value;
    firebase.database().ref('leads/').push({nome: lnome, snome: lsnome, email: lemail, tel: ltel, empresa: lempresa, segmento: lsegmento}, function(error){
        if(error) alert("ERRO");
        else alert("Email cadastrado!");
    });

}
