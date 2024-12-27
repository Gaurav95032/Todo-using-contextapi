import { createContext, useContext } from 'react'

export const TodoContext = createContext({
    todos : [
        {
            id : 1,
            todo : "todo msg",
            completed : false,
        }
    ],
    AddTodo : (todo) => {},
    UpdateTodo : (id, todo) => {},
    DeleteTodo : (id) => {},
    ToggleComplete : (id) => {}
})

export const UseTodo = () => {
    return useContext(TodoContext)
}

export const TodoContextProvider = TodoContext.Provider;
