import { BrowserRouter } from 'react-router-dom';
import { promptRoutes } from '@routes/promptRoutes';
import Layout from '@layout/Layout';
import ScrollToTop from '@common/ScrollTop';
import { useRoutes } from 'react-router-dom';

const AppRoutes = () => {
    const routes = [
        {
            path: '/',
            element: <Layout />,
            children: [
                ...promptRoutes,
                { path: '/', element: <div>hello world!</div> },
                { path: '*', element: <div>Not Found</div> }
            ]
        }
    ];

    return useRoutes(routes);
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
        </BrowserRouter>
    );
}
