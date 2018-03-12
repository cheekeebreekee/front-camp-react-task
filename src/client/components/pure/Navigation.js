import React from "react"
import { Link } from "react-router"

var navStyle = {
	display: "flex",
	justifyContent: "space-around",
	padding: "10px"
}

var buttonStyle = {
	backgroundColor: "yellow"
}

const Navigation = React.createClass({

	_logout: function(event) {
		event.preventDefault()
		this.props.manualLogout()
	},

	render: function() {
		return(
			<div style={navStyle}>				
				{
					this.props.user.authenticated 
					? <button onClick={this._logout} style={buttonStyle}>Logout [{this.props.user.email}]</button>
					: <Link to="/login">Log In</Link>
				}				
				{
					!this.props.user.authenticated 
					? <span><Link to="/register">Register</Link></span>
					: ""
				}				
				<Link to="/myprofile">MyProfile</Link>
			</div>
		)	
	}
})

export default Navigation