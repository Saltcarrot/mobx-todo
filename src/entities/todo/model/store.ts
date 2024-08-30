import { ITodo } from '#todo'
import { ApiClient } from '#api'
import { action, computed, observable } from 'mobx'

class TodoStore {
	@observable accessor todos: Map<string, ITodo> = new Map()
	@observable accessor isLoading: boolean
	@observable accessor error: string

	@computed
	get totalTodos() {
		return this.todos.size
	}

	@action
	getTodos() {
		this.isLoading = true

		ApiClient
			.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
			.then(
				action('getTodosSuccess', todos => {
					this.todos = new Map(todos.map(todo => [ `todo[${todo.id}]`, todo ]))
					this.error = ''
				})
			)
			.catch(action('getTodosError', error => this.error = error))
			.finally(action('getTodosDone', () => this.isLoading = false))
	}
}

export const todoStore = new TodoStore()