require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT
const Redis = require("ioredis");
const { setupRedisConnection } = require('./redis')

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const redis = new Redis({
    port: 6379,
    host: "redis",
});
setupRedisConnection(redis);

// router
const router = require('./routes/router')
app.use("/api", router);

// sequelize
const { connectToDB } = require('./db');
connectToDB();

app.get('/', async (req, res) => {
    res.send("vouchers service");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

