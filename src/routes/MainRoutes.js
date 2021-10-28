import { lazy } from "react";
import { Navigate } from "react-router";
// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);
const Setting = Loadable(lazy(() => import("../views/Setting")));
const PackageStatus = Loadable(lazy(() => import("../views/PackageStatus")));
const PackageList = Loadable(lazy(() => import("../views/PackageList")));
const Profile = Loadable(lazy(() => import("../views/Profile")));
const PackageReceipt = Loadable(lazy(() => import("../views/PackageReceipt")));
const ServiceList = Loadable(lazy(() => import("../views/ServiceList")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "/package/status/:packageId",
      element: <PackageStatus />,
    },
    {
      path: "/packages",
      element: <PackageList />,
    },
    {
      path: "/package/receipt/:packageId",
      element: <PackageReceipt />,
    },
    {
      path: "/services",
      element: <ServiceList />,
    },
  ],
};

export default MainRoutes;
