import fs from "fs"
import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import secrets from "./config/secrets" 
import configurePassport from "./config/passport"
import configureExpress from "./config/express"
import users from "./controllers/users"
import "./models/user"

const app = express()

const connect = () => {
	mongoose.connect(secrets.db, (err, res) => {
		if (err) {
			console.log(`Error connecting to ${secrets.db}. ${err}`)
		} else {
			console.log(`Successfully connected to ${secrets.db}.`)
		}
	})
}
connect()

mongoose.connection.on("error", console.error)
mongoose.connection.on("disconnected", connect)

configurePassport(app, passport)
configureExpress(app, passport)

app.post("/login", users.login)
app.get("/logout", users.logout)
app.post("/register", users.register)

app.get("*", (req, res, next) => {	

	// if we are in production mode then an extension will be provided, usually ".min"
	const minified = process.env.MIN_EXT || ""

	// this is the HTML we will send to the client when they request any page. React and React Router
	// will take over once the scripts are loaded client-side
	const appHTML = 
	`<!doctype html>
	<html lang="">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<title>React-Passport-Redux-Example</title>
	</head>
	<body>
		<div id="app"></div>
		<script src="/assets/app${minified}.js"></script>
	</body>
	</html>`

	res.status(200).end(appHTML)

})

// start listening to incoming requests
app.listen(app.get("port"), app.get("host"), (err) => {
	if (err) {
		console.err(err.stack)
	} else {
		console.log(`App listening on port ${app.get("port")}`)
	}
})
