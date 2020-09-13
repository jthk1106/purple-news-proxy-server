const express = require('express')
const request = require('request')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://purple-news.netlify.app/')
    next()
})

app.get('/', (req, res) => {
    res.send('Proxy says hello Oojoo!')
})

app.get('/cnn', (req, res) => {
    request(
        { url: (`https://purple-news-scraper.herokuapp.com/cnn`) },
        (error, response, body) => {
            if(error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message })
            }

            res.json(JSON.parse(body))
        }
    )
})

app.get('/fox', (req, res) => {
    request(
        { url: (`https://purple-news-scraper.herokuapp.com/fox`) },
        (error, response, body) => {
            if(error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message })
            }

            res.json(JSON.parse(body))
        }
    )
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = process.env.PORT || 1111
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})