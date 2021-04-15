const express = require('express');
const app = express();
const portal = 3002;
const Error = 500;

let countries = [{
    "name": "Sweden", "continent": "Europe", "language": "Swedish", "id": 0,
},
{
    "name": "Portugal", "continent": "Europe", "language": "Portugeish", "id": 1,
},
{
    "name": "England", "continent": "Europe", "language": "English", "id": 2,
},
{
    "name": "Spain", "continent": "Europe", "language": "Spanish", "id": 3,
}]

app.use(express.static('./public'))
app.use(express.json())



 // GET 

app.get('/api/countries', (req, res) => {
    try{
    res.json(countries)
 }catch(err){
     res.status({message: Error}).json({})
 }
});


// GET ID

app.get("/api/countries/:id/2", (req, res) => {
    const { id } = req.params;
    const FindId = countries.find((countries) => {
        return countries.id == id
    })
    res.json(FindId)
 });


// POST

app.post('/api/countries', async (req, res) => {
    if(!req.body.name){
        res.status(Error).send("NOT ABLE TO UPDATE USER!")
    }
    let saveNewCountrie =  req.body

    countries.push(saveNewCountrie)


    console.log(countries);

    res.json(
        {
          status: "You just added " + saveNewCountrie.name + " as a new countrie!",
        })
    
});

// PUT

app.put('/api/countries/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let findId = countries.find(countrie => countrie.id == id)

    console.log(findId , "findID")
    console.log(req.body, "req.body")

    if(findId) {
            findId.name = req.body.name
            findId.continent = req.body.continent
            findId.language = req.body.language

            res.json(
                  {
                      status: "You just updated your list!"
            }
                )   

         } else {
        console.log(findId)
        res.status(Error).send("NOT ABLE TO UPDATE USER!")
    }  
});



// DELETE

app.delete('/api/countries/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const deleteId = countries.find(countrie => countrie.id === id)
    if(deleteId){
       console.log(deleteId.id)
       countries = countries.filter(countrie => countrie.id !== id)
       res.status(200).json(deleteId)
    } else {
        console.log(deleteId)
       res.status(404).json({ message: "CANT FIND WHAT YOUR ARE LOOKING FOR!"})
    }
})




app.listen(portal, () =>{
    console.log(`Server is running on portal http:://localhost:${portal}`)
})