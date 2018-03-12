// initializing PassportJS
import User from "../models/user"
import local from "./passport-strategies/local"

export default function (app, passport) {
  passport.serializeUser((user, done) => {  	
  	done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
  	User.findById(id, (err, user) => {      
  		done(err, user)
  	})
  })

  // use the following strategies
  passport.use(local)
}

