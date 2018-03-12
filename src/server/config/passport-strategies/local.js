import mongoose from "mongoose"
import { Strategy as LocalStrategy } from "passport-local"
import User from "../../models/user"

export default new LocalStrategy({
 		usernameField: "email"
 	}, 
	(email, password, done) => { 	
		User.findOne({email}, (err, user) => {
			if(!user) {
				return done(null, false, { message: `Email ${email} not found` })
			}
			user.comparePassword(password, (err, isMatch) => {
				if (isMatch) {
					return done(null, user)
				} else {
					return done(null, false, { message: "Invalid email or password" })
				}

			})
		})
	}
)