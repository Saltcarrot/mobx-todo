import { Component, createRef, MutableRefObject } from 'react'
import { ApiClient } from '#api'
import { ITodo } from '#todo'

interface IProps {
	name?: string
}

const defaultProps: IProps = {
	name: 'Nemo'
}

class App extends Component<IProps> {
	static defaultProps = defaultProps

	private _isRequestSent: MutableRefObject<boolean>

	constructor(props: IProps) {
		super(props)

		this._isRequestSent = createRef<boolean>()
	}

	componentDidMount() {
		if (!this._isRequestSent.current) {
			ApiClient
				.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
				.then(data => console.debug(data))
				.catch(err => console.debug(err))

			this._isRequestSent.current = true
		}
	}

	render() {
		const { name } = this.props

		return (
			<div className='app'>Hello, { name }</div>
		)
	}
}

export default App