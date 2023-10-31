export const serializedUser = localStorage.getItem("recent user");
export const recentUser = JSON.parse(serializedUser);

export const recentChat = localStorage.getItem("recent chat");

export const previousChat = localStorage.getItem("current chat");


 const serializedCurrentChatRecipient = localStorage.getItem(
   "recent chat recipient"
 );

export const previousChatRecipient = JSON.parse(serializedCurrentChatRecipient);
