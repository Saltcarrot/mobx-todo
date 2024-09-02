import { IEntity } from '#models'

export interface ITodo extends IEntity {
	title: string
	completed: boolean
}

export type TAddTodoRequest = Pick<ITodo, 'title'>