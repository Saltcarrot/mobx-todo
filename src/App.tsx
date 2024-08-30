import { Component } from 'react'
import { ApiClient } from '#api'
import { ITodo } from '#todo'

const name = 'John'

class App extends Component {
	componentDidMount() {
		ApiClient
			.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
			.then(data => console.debug(data))
			.catch(err => console.debug(err))
	}

	render() {
		return (
			<div className='app'>Hello, { name }</div>
		)
	}
}

export default App