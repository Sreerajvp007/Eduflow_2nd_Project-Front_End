import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { clearError } from "../features/parent/auth/parentAuthSlice";

const useErrorNotification = (error) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) return;

    // 🔥 Combine all messages into one clean notification
    let message = error.message || "Something went wrong";

    if (error.fields && Object.keys(error.fields).length > 0) {
      const fieldMessages = Object.values(error.fields);
      message += "\n• " + fieldMessages.join("\n• ");
    }

    notifications.show({
      title: "Error",
      message,
      color: "red",
      autoClose: 4000,
    });

    dispatch(clearError());
  }, [error, dispatch]);
};

export default useErrorNotification;