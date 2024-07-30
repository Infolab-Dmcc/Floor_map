import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/Auth/NotFound";
import UnAuthorized from "./Pages/Auth/UnAuthorized";
import { NextUIProvider } from "@nextui-org/react";
import NewFloor from "./Pages/NewFloor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import PreviewFloor from "./Pages/PreviewFloor";
import noval from "noval";
import createState from "./utils/noval-helper/create-state";
import createDispatch from "./utils/noval-helper/create-dispatcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ViewRoomsPage from "./Pages/ViewRoomsPage";
import { useEffect } from "react";

const ProviderNoval = noval(createState, createDispatch);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "add-floor", element: <NewFloor /> },
        { path: "floor/:floorId/edit", element: <PreviewFloor /> },
        { path: "floor/:floorId/view", element: <ViewRoomsPage /> },
      ],
    },
    { path: "unauthorized", element: <UnAuthorized /> },
    { path: "*", element: <NotFound /> },
  ]);

  useEffect(() => {
    //http://207.154.212.192:8069
    localStorage.setItem("roles", "admin");
    localStorage.setItem("customer_dash_url", "https://highnox.site/highnox");
  }, []);

  return (
    <ProviderNoval>
      <NextUIProvider>
        <DndProvider backend={HTML5Backend}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routers} />
          </QueryClientProvider>
        </DndProvider>
      </NextUIProvider>
    </ProviderNoval>
  );
}

export default App;
