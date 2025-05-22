import { RouteObject } from 'react-router-dom';
import PromptPlayground from "@pages/prompt/PromptPlayground";
import PromptList from "@pages/prompt/PromptList";

export const promptRoutes: RouteObject[] = [
    {path: '/', element: <PromptPlayground />},
    {path: '/prompt', element: <PromptList />},
    {path: '/prompt/playground', element: <PromptPlayground />},
    {path: '/prompt/:id', element: <div>Prompt Detail</div>},
    {path: '/prompt/:promptName/:version', element: <div>HELLO</div>},
];