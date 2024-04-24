const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)


const sql = `INSERT INTO people(name) VALUES ('Rafael Freitas')`
connection.query(sql)
connection.end()


// const selectQuery = `INSERT INTO people(name) VALUES ('Rafael Freitas')`;
// result = connection.query(selectQuery);
// connection.end();

// const pool = mysql.createPool(config);


// const selectQuery = `SELECT * FROM people`;
// connection.query(selectQuery, (err, selectResult) => {
//     if (err) {
//         console.error('Error performing SELECT query:', err);
//         return;
//     }
//     console.log('Selected all records from people table:', selectResult);

//     // Define route handler to send the result as response
//     // app.get('/', (req, res) => {
//     //     console.log('result', selectResult)
//     //     res.send(`<h1> Full Cycle Rafael !!!! </h1> <pre>${JSON.stringify(selectResult)}</pre>`);
//     // });
// });


// app.get('/', (req, res) => {


//     debugger
//     pool.query('SELECT * FROM people', (error, results) => {

//         debugger
//         if (error) {
//             // If there's an error, send an error response
//             return res.status(500).json({ error: 'Error retrieving people from database' });
//         }

//         // If the query is successful, send the results as JSON
//         //res.json(results);
//         res.send(`<h1> Full Cycle  Rafael !!!! </h1> <pre>${JSON.stringify(results)}</pre`)
//     });

// })

// app.get('/', (req, res) => { 

//     const selectQuery = `SELECT * FROM people`;

//     connection.query(selectQuery, (err, selectResult) => {
//         if (err) {
//             console.error('Error performing SELECT query:', err);
//             return;
//         }
//         console.log('Selected all records from people table:', selectResult);
//     });
    

//     res.send(`<h1> Full Cycle  Rafael !!!! </h1> <pre>${JSON.stringify(selectResult)}</pre`)
// })


// const selectQuery = `SELECT * FROM people`;
// connection.query(selectQuery, (err, selectResult) => {
//     if (err) {
//         console.error('Error performing SELECT query:', err);
//         return;
//     }
//     console.log('Selected all records from people table:', selectResult);

//     // Define route handler to send response with selectQuery result
//     app.get('/', (req, res) => {
//         res.send(`<h1> Full Cycle Rafael !!!! </h1> <pre>${JSON.stringify(selectResult)}</pre>`);
//     });
// });


app.get('/', (req, res) => {
    res.send(`<h1> Full Cycle Rafael !!!! </h1> `);
});

app.listen(port , () => {
    console.log(`rodando na porta ${port}`)
})

