import { Component } from 'react'

const name = 'John'

class App extends Component {
	render() {
		return (
			<div className='app'>Hello, { name }</div>
		)
	}
}

export default App