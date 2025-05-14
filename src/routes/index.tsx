import { useRoutes } from 'react-router-dom';
import {promptRoutes} from "@routes/promptRoutes";

export default function AppRouter() {
    const routes = [
        ...promptRoutes,
        {path: '/', element: <div>hello world!</div>},
        {path: '*', element: <div>Not Found</div>}
    ]

    return useRoutes(routes);
}