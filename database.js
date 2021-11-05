const fs = require('fs');

class Database{
    #files = ['urls.json', 'users.json']
    #path = './db/'
    constructor(path = './db/'){
        fs.promises.mkdir(path, { recursive: true }).then(res =>{
            let rawdata = fs.readFileSync(path + this.#files[0]);
            this.urls = JSON.parse(rawdata);
            console.log(this.urls);
            rawdata = fs.readFileSync(path + this.#files[1]);
            this.users = JSON.parse(rawdata);
            console.log(this.users);
        });
        this.#path = path;
    }
    addUrl(newUrl, originalURL){
        const urlObj = {
            originalURL: originalURL,
            newURL: newUrl,
            creationDate : Date.now(),
            redirections : 0,
        }
        this.urls.urls.push(urlObj);
        let jsonString = JSON.stringify(this.urls);
        fs.writeFile(
          `${this.#path}${this.#files[0]}`,
          jsonString,
          "utf8",
          function (err) {
            if (err) throw err;
          }
        );
    }
    addUser(username, password, pro){
        const userObj = {
            username: username,
            password: password,
            pro: pro,
            creationDate : Date.now(),
        }
        this.users.users.push(userObj);
        let jsonString = JSON.stringify(this.users);
        fs.writeFile(
          `${this.#path}${this.#files[1]}`,
          jsonString,
          "utf8",
          function (err) {
            if (err) throw err;
          }
        );
    }
    addRedirection(newUrl){
        console.log(newUrl);
        this.urls.urls.forEach(urlObj => {
            console.log(urlObj);
            if(urlObj.newURL === newUrl){
                console.log("enterd");
                urlObj.redirections++;
                let jsonString = JSON.stringify(this.urls);
                fs.writeFile(
                    `${this.#path}${this.#files[0]}`,
                    jsonString,
                    "utf8",
                    function (err) {
                        if (err) throw err;
                    }
                );
            }
        });
    }
}

module.exports = Database;