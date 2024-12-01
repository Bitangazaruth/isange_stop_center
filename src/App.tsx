import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/home";
import AdminLayout from "./Layout/AdminLayout";

import Subscription from "./components/Subscription";
import Tablesub from "./components/Tablesub";

import DashHomePage from "./Pages/DashHomePage";

import SignUp from "./Pages/SignUp";

import CaseMgtTable from "./components/shared/CaseMgtTable";
import VictimIdentification from "./Pages/VictimIdentification";
import FollowUp from "./Pages/FollowUp";
import DataAnalysis from "./Pages/DataAnalysis";
import SingleCase from "./Pages/SingleCase";
import Users from "./Pages/Users";
import SingleUser from "./Pages/SingleUser";
import CounsellingPage from "./Pages/CounsellingPage";
import EmergencyMgt from "./Pages/EmergencyMgt";

import Trainings from "./Pages/Trainings";

export default function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "followup",
          element: <FollowUp />,
        },

        {
          path: "Subscription",
          element: <Subscription />,
        },
        {
          path: "tablesub",
          element: <Tablesub />,
        },

        {
          path: "cases",
          element: <CaseMgtTable />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "crisis",
          element: <CounsellingPage />,
        },
        {
          path: "caseDetails/:_id",
          element: <SingleCase />,
        },
        {
          path: "single/:_id",
          element: <SingleUser />,
        },
        {
          path: "victims",
          element: <VictimIdentification />,
        },
        {
          path: "analysis",
          element: <DataAnalysis />,
        },
        {
          path: "emergency",
          element: <EmergencyMgt />,
        },
        {
          path: "trainings",
          element: <Trainings />,
        },
        {
          path: "dashboard",
          element: <DashHomePage />,
        },

        { path: "home", element: <Home /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
