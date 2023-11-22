import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import { App } from 'source/components/App';
import { AboutLazy } from 'source/pages/About/About.lazy';
import { ShopLazy } from 'source/pages/Shop/Shop.lazy';

const root = document.getElementById('root');

if(!root) {
    throw new Error('root not found');
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={'Loading...'}><AboutLazy /></Suspense>
            },
            {
                path: '/shop',
                element: <Suspense fallback={'Loading...'}><ShopLazy /></Suspense>
            }
        ]
    },
]);

const container = createRoot(root);

container.render(
    <RouterProvider router={router} />
);
