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
    let postIndex = 0;
    let post;
    firebase.database().ref(`posts/${postIndex}`).on("value", function(snapshot){
        updateData(snapshot.val());    
    }, function(error){
        console.log(error);
    });
});

function updateData(data){
    document.getElementById("postTitle").innerHTML = data.titulo;
    document.getElementById("postText").innerHTML = data.texto;
    document.getElementById("dataPost").innerHTML = data.data;
}