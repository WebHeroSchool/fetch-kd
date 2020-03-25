let url = window.location.toString();

let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if (userName == undefined){
        userName = 'IlyaKd';
    }
    return userName;
}

let nick = getUsername(url);

fetch('https://api.github.com/users/' + nick)
    .then(response => response.json())
    .then(json => {
        if (json.login != undefined) {
            let addName = () => {
                let name = document.querySelector('.name');
                name.innerHTML = json.name;
                if (json.name === null) {
                    let nickname = json.login;
                    name.innerHTML = nickname;
                } 
            }
            let addLink = () => {
                let link = document.querySelector('.link');
                link.href = json.html_url;

            }
            let addBio = () => {
                let bio = document.querySelector('.bio');
                bio.innerHTML = json.bio;
            }
            let addAvatar = () => {
                let avatar = document.querySelector('.image');
                avatar.src = json.avatar_url;
            }
            addName();
            addLink();
            addBio();
            addAvatar();
        } else {
            alert('Информация о пользователе не доступна');
        }
    })
    .catch(err => alert('Информация о пользователе не доступна'));