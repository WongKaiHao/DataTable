import Error404 from "pages/Error404";
import Homepage from "pages/Homepage";

export const ROUTES = [
  {
    path: '/',
    component: Homepage,
    name: 'Data Table Demo',
  },
  {
    path: '*',
    component: Error404,
    name: 'Page Not Foyund'
  }
];