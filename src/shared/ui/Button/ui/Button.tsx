import { Component } from 'react'
import { defaultProps, IButtonProps } from '../model'

export class Button extends Component<IButtonProps> {
	static defaultProps = defaultProps

	constructor(props: IButtonProps) {
		super(props)
	}

	handleClick = () => {
		const { onClick } = this.props

		if (typeof onClick === 'function') onClick()
	}

	render() {
		const { title, disabled } = this.props

		return (
			<button
				onClick={ this.handleClick }
				disabled={ disabled }
			>{ !!title && title }</button>
		)
	}
}