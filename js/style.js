const getform = document.querySelector("#form");
const getsearch = document.querySelector("#search");
const displaybody = document.querySelector("#displayBody");
const displayfooter = document.querySelector("#displayFooter");
const displayrepos = document.querySelector("#displayRepoList");

const url = `https://api.github.com/users/`;

getform.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = getsearch.value;

    if (username.trim()) {
        getresult(username);
        getsearch.value = "";
        getsearch.focus();
    } else {
        alert("Please enter a username");
    }
});

//inital user
getresult('zinzinthin');

function getresult(username) {
    axios({
        method: "GET",
        url: url + username,
    }).then(response => {

        const { data } = response;
        cardData(data);
        resultrepos(username);

    }).catch(err => {
        if (err.response.status === 404) {
            displaybody.innerHTML = `
        <div class="alert alert-danger text-center">No Data Found !!!</div>
        `;
            displayrepos.innerHTML = `
        <li class="dropdown-item">No Data</li>
        `;
        }
    });
}

function cardData(user) {
    displaybody.innerHTML = `
                    <img src="${user.avatar_url}"
                        class="rounded-circle" alt="profile" />
                    <h5 class="card-title my-2">${user.name}</h5>
                    <small class="card-subtitle my-2">${user.bio ?? ''}</small>

                    <ul class="list-group my-2">
                        <li class="list-group-item">Repositories :
                            <span class="fw-bold">${user.public_repos}</span>
                        </li>
                        <li class="list-group-item">Followers :
                            <span class="fw-bold">${user.followers}</span>
                        </li>
                        <li class="list-group-item">Following :
                            <span class="fw-bold">${user.following}</span>
                        </li>
                    </ul>
    `;
}

function resultrepos(username) {
    $.ajax({
        method: "GET",
        url: url + username + `/repos`,
    }).done(data => {
        showrepositories(data);
    }).fail(err => console.log(err));
}

function showrepositories(repos) {
    displayrepos.innerHTML = "";
    repos.forEach(repo => {
        const li = `<li><a href=${repo.html_url} class="dropdown-item" target="_blank">${repo.name}</a></li>`;
        displayrepos.innerHTML += li;
    });
}