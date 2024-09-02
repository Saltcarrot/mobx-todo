import { Component, createRef, MutableRefObject } from 'react'
import { TodoList, todoStore } from '#todo'
import { observer } from 'mobx-react'
import { Button, Input } from '#ui'

@observer
class App extends Component<{}, { title: string }> {
	private _isRequestSent: MutableRefObject<boolean>

	constructor(props: {}) {
		super(props)

		this.state = { title: '' }

		this._isRequestSent = createRef<boolean>()
		this._isRequestSent.current = false
	}

	componentDidMount() {
		if (!this._isRequestSent.current) {
			todoStore.getTodos()

			this._isRequestSent.current = true
		}
	}

	// react doesn't bind event handlers, so
	// if you use a common function, bind it in constructor
	// this.handleInputChange = this.handleInputChange.bind(this)
	handleInputChange = (title: string) => {
		this.setState({ title })
	}

	handleAddClick = () => {
		const { title } = this.state

		todoStore.addTodo({ title })
		this.setState({ title: '' })
	}

	render() {
		return (
			<>
				<Input value={ this.state.title } onChange={ this.handleInputChange } />
				<Button title='Add todo' onClick={ this.handleAddClick } disabled={ !this.state.title } />
				{ todoStore.isLoading ? (
					<div>Loading...</div>
				) : todoStore.error ? (
					<div>Error</div>
				) : todoStore.todos.size ? (
					<TodoList todos={ todoStore.todos } />
				) : <div>No data</div> }
			</>
		)
	}
}

export default App