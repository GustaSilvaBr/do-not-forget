import { createRoot } from 'react-dom/client'
import {TodoList} from './pages/TodoList/Index';
import { TodoDetails} from './pages/TodoDetails/Index';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './global.css'
import { getTodo } from './services/todosServices';

function Root() {
    return (
      <Outlet /> 
    );
  }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      { 
        index: true, 
        element: <TodoList />, 
        
      },
      {
        path: "todos/:todoItemId", 
        element: <TodoDetails />, 
        loader: async ({ params }) => { 

          const todo = await getTodo(params.todoItemId?(params.todoItemId):('')).then(); 
          return todo;
        },
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
