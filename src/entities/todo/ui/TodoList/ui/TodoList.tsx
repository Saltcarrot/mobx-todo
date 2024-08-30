import { Component } from 'react'
import { defaultProps, ITodoListComponent } from '../model'

export class TodoList extends Component<ITodoListComponent> {
	static defaultProps = defaultProps

	constructor(props: ITodoListComponent) {
		super(props)
	}

	render() {
		const { todos } = this.props

		return (
			<ul>
				{ Array.from(todos).map(([ key, todo ]) => (
					<li key={ key }>
						<span>{ todo.title }</span>
					</li>
				)) }
			</ul>
		)
	}
}