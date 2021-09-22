const express = require('express');
const fetch = require('node-fetch');
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();

app.get('/articles', (req, res) => {
    res.send("All articles")
})

app.get('/api/posts', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => res.json(json));
});

app.get('/articles/1', (req, res) => {
    res.send({
        name: "article 1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum augue in nulla volutpat, " +
            "non mattis diam lacinia. Aliquam volutpat congue malesuada. Mauris ut lacinia tortor, nec porta libero. " +
            "Curabitur quis quam bibendum, blandit metus ac, malesuada magna. Duis nec fermentum urna. Suspendisse potenti. " +
            "Vestibulum feugiat interdum iaculis. Maecenas vel fringilla ipsum.\n" +
            "\n" +
            "Mauris vel turpis ante. Suspendisse a congue nisi. Proin eu faucibus odio, sit amet sollicitudin ante." +
            " In turpis arcu, sodales aliquam cursus vel, egestas at diam. Morbi congue sed diam in maximus. Morbi congue eros " +
            "consectetur, interdum felis vitae, placerat enim. Sed pulvinar imperdiet nunc quis laoreet. Vestibulum vitae semper eros." +
            " Proin neque orci, tempus eu lacinia id, varius non velit. Donec porta vestibulum scelerisque. Nunc mi ligula, finibus " +
            "quis tincidunt eget, maximus at metus. Cras sagittis urna nec nisl egestas pellentesque vitae nec justo. Donec sit amet" +
            " metus convallis, rhoncus elit a, pulvinar orci. Nunc iaculis suscipit sapien eget lobortis. Etiam elementum est in " +
            "blandit efficitur. Phasellus vestibulum semper nunc in mollis.\n" +
            "\n" +
            "Curabitur nec faucibus elit, in sodales nisi. Aliquam erat volutpat. Phasellus id molestie libero. " +
            "Cras varius tincidunt aliquam. Donec facilisis lorem vel eros varius, ac accumsan lacus consequat. " +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum est sit amet viverra tempor. " +
            "Morbi quis est in justo vehicula faucibus. Sed ac nunc interdum, sollicitudin felis sit amet, elementum eros. " +
            "Duis vel consectetur dui. Nullam ipsum arcu, auctor in sagittis dictum, mattis vitae magna. Quisque id velit neque. " +
            "Curabitur eget risus a odio laoreet lacinia. Nulla mi felis, sodales sed semper sed, interdum sed nunc. " +
            "Vivamus interdum facilisis justo, iaculis consequat mi lacinia et.\n" +
            "\n" +
            "Donec iaculis quam mi, id mollis orci interdum at. Donec nec tortor enim. Aenean rutrum congue est, quis vehicula eros rhoncus vel. Nunc nulla augue, tincidunt sed dapibus at, venenatis eget velit. Nulla suscipit neque ante, sit amet tristique odio feugiat id. Nulla gravida massa lectus, vitae egestas eros mollis quis. Pellentesque dictum sed sem vitae congue. Nullam ultricies volutpat purus, ut efficitur quam condimentum ut. Nullam eu enim non nibh tempor tempor vitae quis augue. In viverra purus justo, dictum malesuada nisi tempus vel. Aliquam molestie purus tortor, at consectetur nibh consectetur nec. Donec vel mattis sem, ac cursus massa. Quisque feugiat porta sollicitudin. Nulla dignissim augue dolor, eget imperdiet neque dignissim ut. Fusce scelerisque eu enim nec tristique.\n" +
            "\n" +
            "Morbi in iaculis metus. Vivamus diam orci, aliquam et justo et, hendrerit convallis tortor. Donec ultrices mollis odio. Nullam eu neque a mauris pulvinar imperdiet. Aliquam eu magna eget magna pretium hendrerit. Cras eget auctor diam. Nam pellentesque tempor nulla, id facilisis urna tristique in. Quisque suscipit turpis nec orci ornare, vitae dapibus dolor venenatis. Fusce at congue lectus, in rutrum est. Aenean quis sodales nunc, at malesuada tellus. Nam egestas dolor in pharetra sodales. Aenean tempus leo et tortor bibendum malesuada. Praesent ultrices a est eget gravida. Pellentesque eu metus id libero rhoncus maximus. Suspendisse id ligula vulputate, malesuada tellus eu, feugiat augue.\n" +
            "\n",
        author: "Jack",
        release: "12/09/2021"

    })
})

app.get('/', (req, res) => {
    res.send("Hello from NodeJs")
})

app.post('/articles/posts', verifyToken,(req, res) => {
    //Vérifier de manière asynchrone le jeton donné à l'aide d'un secret ou d'une clé publique pour obtenir un jeton décodé
    //mettre secretkey en varibale d'env
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
            res.sendStatus(403); //renvoi forbidden si erreur
        }else {
            res.json({
                message:'post created...',
                authData
            });
        }
    });
});

app.listen(5000, () => {
    console.log(`Server listen on 5000`)
})

app.post('/users/login', (req, res) => {
    const user = {
        //enlever l'id si possible pour sécurité
        //id :1,
        usernam:"QL",
        email:"quentinloicp@gmail.com"
    }
    //Sign the given payload into a JSON Web Token string payload
    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token,
        }); 
    }); 
}); 

//FUNCTION QUI VERIFIE QUE LA REQUETE CONTIENT BIEN LE TOKEN JWT
function verifyToken(req, res, next){
   const bearerHeader = req.headers['authorization']
   if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader.split(" ")[1]
       req.token=bearerToken
       next();
    }else{
        res.sendStatus(403); //renvoi forbidden si erreur
    }
}
