import { IEntity } from '#models'

export interface ITodo extends IEntity {
	userId: number
	title: string
	completed: boolean
}