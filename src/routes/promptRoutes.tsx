import { RouteObject } from 'react-router-dom';
import PromptPlayground from "@pages/prompt/PromptPlayground";

export const promptRoutes: RouteObject[] = [
    {path: '/', element: <PromptPlayground />},
    {path: '/prompt/playground', element: <PromptPlayground />},
    {path: '/prompt/:id', element: <div>Prompt Detail</div>},
    {path: '/prompt/:id/edit', element: <div>Edit Prompt</div>},
    {path: '/prompt/list', element: <div>Prompt List</div>},
];