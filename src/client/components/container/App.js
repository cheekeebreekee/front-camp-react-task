import React from "react"
import NavigationContainer from "./NavigationContainer"

const App = React.createClass({
	render: function() {
		return(
			<div>
				<NavigationContainer />				
				{this.props.children}
				<h1>React login app with PassportJS</h1>
			</div>	
		)	
	}
})

export default App