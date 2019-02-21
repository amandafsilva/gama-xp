var section = 'normal';
function b2cORb2b (email){
    var arremail = email.split("@");
    switch(arremail[1]){
        case "gmail.com":
        case "hotmail.com":
        case "yahoo.com":
        case "uol.com.br":
        case "outlook.com":
        case "live.com":
        case "yahoo.com.br":
        case "bol.com.br":
        case "ymail.com":
        case "globomail.com":
        case "icloud.com":
        case "me.com":
            return "B2C";
            break;
        default:
            return "B2B";
            break;
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
document.addEventListener("DOMContentLoaded", event => {
    var config = {
        apiKey: "AIzaSyDkaP66Dq0eVpZgkBu6FXyrjuOmV8EBGNc",
        authDomain: "show-me-the-leads.firebaseapp.com",
        databaseURL: "https://show-me-the-leads.firebaseio.com",
        projectId: "show-me-the-leads",
        storageBucket: "show-me-the-leads.appspot.com",
        messagingSenderId: "911938446399"
      };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const app = firebase.app();
});
var userIp;
function getIp(callback)
{
    function response(s)
    {
        callback(window.userip);

        s.onload = s.onerror = null;
        document.body.removeChild(s);
    }

    function trigger()
    {
        window.userip = false;

        var s = document.createElement("script");
        s.async = true;
        s.onload = function() {
            response(s);
        };
        s.onerror = function() {
            response(s);
        };

        s.src = "https://l2.io/ip.js?var=userip";
        document.body.appendChild(s);
    }

    if (/^(interactive|complete)$/i.test(document.readyState)) {
        trigger();
    } else {
        document.addEventListener('DOMContentLoaded', trigger);
    }
}

getIp(function (ip) {
    userIp = ip;
});

function insertLead(){
    let lnome = document.getElementById('nome').value;
    let lsnome = document.getElementById('snome').value;
    let lemail = document.getElementById('email').value;
    //let lempresa = document.getElementById('empresa').value;
    let brtTime = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
    brtTime = new Date(brtTime);
    stringTime = brtTime.getFullYear().toString() + "-" + ("0"+(brtTime.getMonth()+1)).slice(-2) + "-" + ("0" + brtTime.getDate()).slice(-2) + " " + ("0" + brtTime.getHours()).slice(-2) + ":" + ("0" + brtTime.getMinutes()).slice(-2) + ":" + ("0" + brtTime.getSeconds()).slice(-2);    
    if(lnome === "" || lsnome === "" || lemail === ""){
        alert("Todos os campos devem ser preenchidos!");
    }else{
        if(validateEmail(lemail)){
            let emailreplace = lemail.replace("@","at").replace(".","dot").replace(".","dot").replace(".","dot").replace(".","dot").replace(".","dot").replace(".","dot");
            if(section==='second-form'){
                firebase.database().ref('leads/').child(emailreplace).set({nome: lnome + " " + lsnome, email: lemail, data: stringTime, ip: userIp, clientType: b2cORb2b(lemail), secao: section}, function(error){
                //firebase.database().ref('leads/').child(lemail).set('teste', function(error){
                    if(error) alert("ERRO: Email já cadastrado!");
                    else {
                        alert("Email cadastrado!");
                        if(section='second-form') location.href = "index.html";
                    }
                });
            }else if(section==='form'){
                firebase.database().ref('leads/').child(emailreplace).set({nome: lnome, email: lemail, data: stringTime, ip: userIp, clientType: b2cORb2b(lemail), secao:section}, function(error){
                    location.target = "_blank";
                    window.location.href = 'https://gamaexp17-1.herokuapp.com/downloadBook/'+book;
                });
            }else {
                //QUIZ
                let locupacao = document.getElementById('ocupacao').value;
                firebase.database().ref('leads/').child(emailreplace).set({nome: lnome, email: lemail, data: stringTime, ip: userIp, clientType: b2cORb2b(lemail), ocupacao: locupacao, secao:section}, function(error){
                    location.target = "_blank";
                    location.href = 'https://quiz.tryinteract.com/#/5c6b09761db3ce0014ab10cb';
                });
            }
        }else alert("O email não é válido!");
    }

}