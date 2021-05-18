
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import userIcon from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import Claim from "@material-ui/icons/CancelPresentation";
import Product from "@material-ui/icons/LocalOffer";
import Plan from "@material-ui/icons/FormatListBulleted"
import CategoryIcon from '@material-ui/icons/Category';
import Lock from '@material-ui/icons/Lock'
// core components/views for Admin layout
import CategoryTableList from "views/TableList/CategoryTableList";
import ArticleTableList from "views/TableList/ArticleTableList.js";
import GMSTableList from 'views/TableList/GMSTableList'
import ConcurrentTableList from 'views/TableList/ConcurrentTableList'
import login from 'views/Login/login'
import MonthlyGoal from 'views/MonthlyGoal';
import UserTableList from 'views/TableList/UserTableList';
import Planning from 'views/Planning';
import ReclamationTableList from 'views/TableList/ReclamationTableList'



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Tableau de Bord",
    icon: Dashboard,
    component: CategoryTableList,
    layout: "/admin"
  },
  {
    path: "/utilisateurs",
    name: "Utilisateurs",
    icon: userIcon,
    component: UserTableList,
    layout: "/admin"
  },
  {
    path: "/objectifs",
    name: "Objectifs",
    icon: "content_paste",
    component: MonthlyGoal,
    layout: "/admin"
  },
  {
    path: "/reclamations",
    name: "Réclamations",
    icon: Claim,
    component: ReclamationTableList,
    layout: "/admin"
  },
  {
    path: "/plannification",
    name: "Plannification",
    icon: Plan,
    component: Planning,
    layout: "/admin"
  },
  {
    path: "/concurrents",
    name: "Concurrents",
    icon: Person,
    component: ConcurrentTableList,
    layout: "/admin"
  },
  {
    path: "/gms",
    name: "GMS",
    icon: Home,
    component: GMSTableList,
    layout: "/admin"
  },
  {
    path: "/articles",
    name: "Articles",
    icon: Product,
    component: ArticleTableList,
    layout: "/admin"
  },
  {
    path: "/Categories",
    name: "Categories",
    icon: CategoryIcon,
    component: CategoryTableList,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "login",
    icon: Lock,
    component: login,
    layout: "/login"
  }
];

export default dashboardRoutes;
