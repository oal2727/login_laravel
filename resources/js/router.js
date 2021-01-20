import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PageError from "./pages/PageError" 
import Welcome from "./pages/Welcome"
import TaskDetail from "./pages/TaskDetail"
export const routes = [
    {path:"/",name:"Welcome",component:Welcome},
    {path:"/Login",name:"Login",component:Login},
    {path:"/Register",name:"Register",component:Register},
    {path:"/Dashboard",name:"Dashboard",component:Dashboard,meta: { requiresAuth: true }},
    {path:"/Task/:id",name:"TaskDetail",component:TaskDetail,meta: { requiresAuth: true }},
    {path:"*",component:PageError}
]