const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("college");
        const collection = db.collection("students");

        // Home Route
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "index.html"));
        });

        // Insert Data
        app.post("/register", async (req, res) => {

            const student = {
                name: req.body.name,
                email: req.body.email,
                dob: req.body.dob,
                department: req.body.department,
                phone: req.body.phone
            };

            await collection.insertOne(student);

            res.send(`
                <h2>Student Registered Successfully!</h2>
                <a href="/">Go Back</a><br><br>
                <a href="/students">View All Students</a>
            `);
        });

        // SELECT (Retrieve Data)
        app.get("/students", async (req, res) => {

            const students = await collection.find().toArray();

            let html = `
                <h2>Student Records</h2>
                <table border="1" cellpadding="10">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Department</th>
                    <th>Phone</th>
                </tr>
            `;

            students.forEach(student => {
                html += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.dob}</td>
                        <td>${student.department}</td>
                        <td>${student.phone}</td>
                    </tr>
                `;
            });

            html += "</table><br><a href='/'>Back to Form</a>";

            res.send(html);
        });

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();