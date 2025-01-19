const getform = document.querySelector("#form");
const getsearch = document.querySelector("#search");
const getdisplaybody = document.querySelector("#displayBody");
const getdisplayfooter = document.querySelector("#displayFooter");
const getdisplaylist = document.querySelector("#displayList");

const uri = `https://api.github.com/users/`;

getform.addEventListener('submit', (e) => {
    e.preventDefault();

    const getusername = getsearch.value;

    if (getusername.trim()) {
        getresult(getusername);
        getsearch.value = "";
        getsearch.focus();
    } else {
        alert("Please enter a username");
    }
});

//inital user
getresult('zinzinthin');

function getresult(username){
   axios({
    method : "GET",
    url : uri + username,
   }).then(response => {
    console.log(response);
   }).catch(err => console.log(err));
}