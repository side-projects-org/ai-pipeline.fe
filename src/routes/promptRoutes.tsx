import { RouteObject } from 'react-router-dom';
import CreatePrompt from "../page/prompt/CreatePrompt";

export const promptRoutes: RouteObject[] = [
    {path: '/prompt/new', element: <CreatePrompt />},
    {path: '/prompt/:id', element: <div>Prompt Detail</div>},
    {path: '/prompt/:id/edit', element: <div>Edit Prompt</div>},
    {path: '/prompt', element: <div>Prompt List</div>},
];