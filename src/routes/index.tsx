import AboutUs from "@/components/aboutUs/AboutUs";
import RootLayout from "@/layouts/RootLayout";
import FormAuth from "@/modules/formAuth/FormAuth";
import FormRegistration from "@/modules/formRegistration/FormRegistration";
import MainDetection from "@/modules/mainDetection/MainDetection";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AboutUs />,
      },
      {
        path: "auth",
        element: <FormAuth />,
      },
      {
        path: "registration",
        element: <FormRegistration />,
      },
      {
        path: "detection",
        element: <MainDetection />,
      },
    ],
  },
];
