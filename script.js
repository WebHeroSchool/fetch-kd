let loader = document.querySelector('.container');
let content = document.querySelector('.content');

let showContent = () => {
    loader.classList.add('container_none');
    content.classList.add('content_active');
};

let getDate = new Promise((resolve, reject) => {
    setTimeout(() => {
        let time = new Date();
        let date = time.getDate()+':'+('0'+(time.getMonth()+1))+':'+time.getFullYear();
        resolve(date);
    },2000);
});

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

let getRequest = fetch('https://api.github.com/users/' + nick);

Promise.all([getDate, getRequest])
    .then(([date, request]) => {
        requestInfo = request;
        requestDate = date;
    })

    .then(res => requestInfo.json())
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

            let addDate = () => {
                document.getElementById('date').innerHTML = requestDate;
            };

            addName();
            addLink();
            addBio();
            addAvatar();
            addDate(date);
            showContent();
        } else {
            alert('Информация о пользователе не доступна');
        }
    })
    .catch(err => alert('Информация о пользователе не доступна'));