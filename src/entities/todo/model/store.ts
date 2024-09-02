import { ITodo, TAddTodoRequest } from '#todo'
import { ApiClient } from '#api'
import { action, computed, observable } from 'mobx'

class TodoStore {
	@observable accessor todos: Map<string, ITodo> = new Map()
	@observable accessor isLoading: boolean = false
	@observable accessor error: string = ''

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

	@action
	addTodo(req: TAddTodoRequest) {
		this.isLoading = true

		ApiClient
			.post<Pick<ITodo, 'id'>>('https://jsonplaceholder.typicode.com/todos', {
				body: req
			})
			.then(action('addTodoSuccess', todo => {
				this.todos.set(`todo[${todo.id}]`, {
					id: todo.id,
					title: req.title,
					completed: false
				})
				this.error = ''
			}))
			.catch(action('addTodoError', error => this.error = error))
			.finally(action('addTodoDone', () => this.isLoading = false))
	}
}

export const todoStore = new TodoStore()