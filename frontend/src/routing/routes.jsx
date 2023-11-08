import App from "../App";
import About from "../pages/about/About";
import ChatRoom from "../pages/chatRooms/ChatRoom";
import IndividualChatRoom from "../pages/chatRooms/IndividualChatRooms";
import ErrorPage from "../pages/error/Error";
import Home from "../pages/home/Home";
import AllGroups from "../pages/home/component/AllGroups";
import Chats from "../pages/home/component/Chats";
import MyGroups from "../pages/home/component/MyGroups";
import Profile from "../pages/profile/Profile";
import SignIn from "../pages/signIn/SignIn";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SignIn />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/chat/:chatName",
        element: <IndividualChatRoom />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/home",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/home/all",
            element: <AllGroups />,
          },
          {
            path: "/home/chats",
            element: <Chats />,
          },
          {
            path: "/home/",
            element: <MyGroups />,
          },
        ],
      },
      {
        path: "/group/:groupName",
        element: <ChatRoom />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/chat/:chatName",
        element: <IndividualChatRoom />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
