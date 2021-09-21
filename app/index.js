const express = require('express')
const app = express();

app.get('/articles', (req, res) => {
    res.send("All articles")
})

app.listen(8080, () => {
    console.log(`Server listen on 8080`)
})
