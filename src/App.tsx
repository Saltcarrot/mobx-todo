import { Component, createRef, MutableRefObject } from 'react'
import { TodoList, todoStore } from '#todo'
import { observer } from 'mobx-react'

@observer
class App extends Component {
	private _isRequestSent: MutableRefObject<boolean>

	constructor(props: NonNullable<unknown>) {
		super(props)

		this._isRequestSent = createRef<boolean>()
	}

	componentDidMount() {
		if (!this._isRequestSent.current) {
			todoStore.getTodos()

			this._isRequestSent.current = true
		}
	}

	render() {
		const {
			todos,
			isLoading,
			error
		} = todoStore

		return (
			<>
				{ isLoading ? (
					<div>Loading...</div>
				) : error ? (
					<div>{ error }</div>
				) : todos.size ? (
					<TodoList todos={ todos } />
				) : <div>No data</div> }
			</>
		)
	}
}

export default App