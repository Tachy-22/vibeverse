import App from "../App";
import ChatRoom from "../pages/chatRooms/ChatRoom";
import IndividualChatRoom from "../pages/chatRooms/IndividualChatRooms";
import ErrorPage from "../pages/error/Error";
import Home from "../pages/home/Home";
import AllGroups from "../pages/home/component/AllGroups";
import Chats from "../pages/home/component/Chats";
import MyGroups from "../pages/home/component/MyGroups";
import Profile from "../pages/profile/Profile";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home/",
        element: <AllGroups />,
      },
      {
        path: "/home/chats",
        element: <Chats />,
      },
      {
        path: "/home/my-groups",
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
];
