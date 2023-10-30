import App from "../App";
import ChatRoom from "../pages/chatRooms/ChatRoom";
import ErrorPage from "../pages/error/Error";
import AllGroups from "../pages/home/component/AllGroups";
import Chats from "../pages/home/component/Chats";
import MyGroups from "../pages/home/component/MyGroups";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AllGroups />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
      {
        path: "/my-groups",
        element: <MyGroups />,
      },
    ],
  },
  {
    path: "/group/:groupName",
    element: <ChatRoom />,
    errorElement: <ErrorPage />,
  },
];
