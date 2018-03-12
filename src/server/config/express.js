import path from "path"
import express from "express"
import session from "express-session"
import bodyParser from "body-parser"
import connectMongo from "connect-mongo"
import secrets from "./secrets"

const MongoStore = connectMongo(session)

export default function(app, passport) {
	app.set("port", 3000)
	app.set("host", "localhost")

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(express.static(path.join(process.cwd(), 'public')));

	const sess = {
		resave: true,
		saveUninitialized: true,
		secret: secrets.sessionSecret,
		proxy: false,
		name: "sessionId",
		cookie: {
			httpOnly: true,
			secure: false
		},
		store: new MongoStore({
			url: secrets.db,
			autoReconnect: true
		})
	}

	app.use(session(sess))

	app.use(passport.initialize())
	app.use(passport.session())

}
