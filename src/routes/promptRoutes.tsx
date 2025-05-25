import { RouteObject } from 'react-router-dom';
import PromptPlayground from "@pages/prompt/PromptPlayground";
import PromptList from "@pages/prompt/PromptList";
import PromptVersionList from "@pages/prompt/PromptVersionList";
import PromptDetail from "@pages/prompt/PromptDetail";

export const promptRoutes: RouteObject[] = [
    {path: '/', element: <PromptPlayground />},
    {path: '/prompt', element: <PromptList />},
    {path: '/prompt/playground', element: <PromptPlayground />},
    {path: '/prompt/:promptName', element: <PromptVersionList />},
    {path: '/prompt/:promptName/:version', element: <PromptDetail />},
];