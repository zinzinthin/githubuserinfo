const getform = document.querySelector("#form");
const getsearch = document.querySelector("#search");
const displaybody = document.querySelector("#displayBody");
const displayfooter = document.querySelector("#displayFooter");
const displayfollowing = document.querySelector("#displayFollowing");
const displayfollower = document.querySelector("#displayFollower");
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
        getFollowings(username);
        getFollowers(username);
        getRepos(username);

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
                    <h5 class="card-title my-2"><a href="${user.html_url}" class="text-decoration-none" target="_blank">${user.name}</a></h5>
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

function getFollowings(username) {
    $.ajax({
        method: "GET",
        url: url + username + `/following`,
    }).done(followings => {
        displayfollowing.innerHTML = "";
        if (followings.length > 0) {
            followings.forEach(following => {
                const li = `<li class="d-flex justify-content-center align-items-center p-2">
                <img src="${following.avatar_url}" class="rounded-circle" alt="profile" width="25" />
                <a href="${following.html_url}" class="dropdown-item" target="_blank">${following.login}</a>
                </li>`;
                displayfollowing.innerHTML += li;
            });
        } else {
            displayfollowing.innerHTML += `<li class="px-2">No followings</li>`;
        }
    }).fail(err => console.log(err));
}

function getFollowers(username) {
    $.ajax({
        method: "GET",
        url: url + username + `/followers`,
    }).done(followers => {
        displayfollower.innerHTML = "";
        if (followers.length > 0) {
            followers.forEach(follower => {
                const li = `<li class="d-flex justify-content-center align-items-center p-2">
                <img src="${follower.avatar_url}" class="rounded-circle" alt="profile" width="25" />
                <a href="${follower.html_url}" class="dropdown-item" target="_blank">${follower.login}</a>
                </li>`;
                displayfollower.innerHTML += li;
            });
        }else {
            displayfollower.innerHTML += `<li class="px-2">No followers</li>`;
        }
    }).fail(err => console.log(err));
}

function getRepos(username) {
    $.ajax({
        method: "GET",
        url: url + username + `/repos`,
    }).done(repos => {
        displayrepos.innerHTML = "";
        if (repos.length > 0) {
            repos.forEach(repo => {
                const li = `<li><a href="${repo.html_url}" class="dropdown-item" target="_blank">${repo.name}</a></li>`;
                displayrepos.innerHTML += li;
            });
        }else {
            displayrepos.innerHTML += `<li class="px-2">No public repos</li>`;
        }
    }).fail(err => console.log(err));
}

