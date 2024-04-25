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


const pool = mysql.createPool(config);
const selectQuery = `SELECT * FROM people`;


// Middleware to execute the SQL query
app.use((req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Execute the SQL query
        connection.query(insertQuery, (err) => {
            if (err) {
                console.error('Error executing insert query:', err);
                connection.release(); // Release the connection back to the pool
                return res.status(500).send('Internal Server Error');
            }

            connection.query(selectQuery, (err, results) => {
                connection.release(); // Release the connection back to the pool

                if (err) {
                    console.error('Error executing select query:', err);
                    return res.status(500).send('Internal Server Error');
                }

                res.locals.people = results; // Store the query results in res.locals
                next(); // Proceed to the next middleware
            });
        });
    });
});




app.get('/', (req, res) => {
    const people = res.locals.people || []; // Retrieve query results from res.locals
    const names = people.map(person => `<li>${person.name}</li>`).join('');
    res.send(`<h1> Full Cycle Rafael !!!! </h1> `);
});

app.listen(port , () => {
    console.log(`rodando na porta ${port}`)
})



const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "test",
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM Student", (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
  });
});

app.listen(5000, () => console.log("listining on port 5000"));