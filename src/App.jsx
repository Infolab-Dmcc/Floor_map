import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/Auth/NotFound";
import UnAuthorized from "./Pages/Auth/UnAuthorized";
import { NextUIProvider } from "@nextui-org/react";
import NewFloor from "./Pages/NewFloor";
import MyFloors from "./Pages/MyFloors";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "NewFloor", element: <NewFloor /> },
        { path: "AddFloor", element: <MyFloors /> },
      ],
    },
    { path: "unauthorized", element: <UnAuthorized /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <NextUIProvider>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={routers} />
      </DndProvider>
    </NextUIProvider>
  );
}

export default App;
