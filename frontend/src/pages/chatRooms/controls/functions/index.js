export function formatTimestamp(timestamp) {
  try {
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    console.error(error);
  }
}
export const clearLocaltorage = () => {
  localStorage.removeItem("recent chat");
  localStorage.removeItem("recent user");
  localStorage.removeItem("current room");
  localStorage.removeItem("recent chat recipient");
  localStorage.removeItem("current chat");
};
