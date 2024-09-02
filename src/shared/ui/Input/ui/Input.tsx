import { Component } from 'react'
import { defaultProps, IInputProps, IInputState } from '../model'

export class Input extends Component<IInputProps, IInputState> {
	static defaultProps = defaultProps

	constructor(props: IInputProps) {
		super(props)

		const { value } = defaultProps

		this.state = { value: value }
	}

	componentDidUpdate(prevProps: Readonly<IInputProps>) {
		const { value } = this.props

		if (value !== prevProps.value) {
			this.setState({ value: value })
		}
	}

	handleChange = (value: string) => {
		const { onChange } = this.props

		if (typeof onChange === 'function') onChange(value)
		else this.setState({ value })
	}

	render() {
		const { value } = this.state

		return (
			<input
				value={ value }
				onChange={ ({ target: { value } }) => this.handleChange(value) }
			/>
		)
	}
}