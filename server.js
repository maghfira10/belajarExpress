const express = require('express');
const hbs = require ('hbs');
const fs = require ('fs');
const port = process.env.PORT || 3000;
var app = express(); //Var App yang mendeklarasikan function Express

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//untuk mengakses file di folder public scara statis
//ini digunakan apabila tidak memakai template engine
app.use(express.static(__dirname + '/public'));

//fungsi param next agar bisa mengeksekusi program selanjutnya
//jika tidak ada next, maka program selanjutnya tdak berjalan
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
//FUngsi req.method dan req.url adalah u/ mengambil url halaman
//jika kita akses halaman about maka hasil : GET /about diterminal
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
       if (err) {
           console.log('Unable to append server.log');
           
       }
   }) //buat file dg nama server.log
   
      next();
});

//.use digunakan untuk perintah yg default berjalan dan pasti dIeksekusi
//sedangkan .get untuk perintah pilihan (?)
// app.use((req, res, next ) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
    //return 'test';
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {  //function app.get dengan param req,res
   // res.send('<hHello Express yang dipelajari Fira'); //response 
    // res.send({
    //     name : 'Fira',
    //     likes : ['Biking',
    // 'Reading']
    // });
    res.render('home.hbs', {
        pageTitle : 'Home Page', //create property
        welcomeMessage : 'Welcome to My World',
        currentYear : new Date().getFullYear()
    });
});

app.get('/about', (req,res) => {
   res.render('about.hbs',{
       pageTitle : 'About page',
       currentYear : new Date().getFullYear()
   }); // re.render dgunakan agar bisa mengakses halaman template

});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle : 'Projects'
    });
});
//bad - send back JSON with errorMessage
app.get('/bad', (req,res) => {
    res.send({
        errorMessage :'unable to handle request'
    })
})
//untuk menetapkan port akses http broswer
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); //brrti berjalan di localhost:3000
