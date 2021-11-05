
//Event Listeners
document.getElementById("genrateNewUrlButton").addEventListener("click", (e) => {
    let formData = new FormData();
    formData.append("url", "hi");
    axios.post(`http://localhost:3000/shorten`, formData, 
    {
        headers: {
          "Access-Control-Allow-Origin": "*", 
          "url": document.getElementById("url_input").value
        }
    })
    .then(response =>{
        document.getElementById("newURL").textContent = "New URL :" + response.data;
    });
});

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
   
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

//Genrate New URL Button Clicked Event Handler (Client > Server > Client)
//send url using form to get a response with new url > displaying the new url. FInished


//Signup Basic User (Client > Server > Client)
//save users to database with a basic user token

//Signup Pro Users (Client > Server > Client)
//save users to database with a pro user token

//Download CV Button Clicked Event Handler (Client > Server > Client)
//download the file when the clicked event fired

//Contact Button Clicked Event Handler (Client > Mail)
//send input info to dbarabi5@gmail.com