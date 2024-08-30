import { ITodo } from '#todo'

export interface ITodoListComponent {
	todos?: Map<string, ITodo>
}