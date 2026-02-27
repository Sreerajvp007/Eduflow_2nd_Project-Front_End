
import { useDispatch } from "react-redux";
import { Card, Text, Button } from "@mantine/core";
import { resetFlow } from "../../../features/parent/parentCourseSlice";
import { useNavigate } from "react-router-dom";

const ConfirmationStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
<>
<div className="w-full flex justify-center px-4 py-6">
    <Card
      radius="xl"
      shadow="sm"
      className="w-full max-w-xl lg:max-w-2xl"
      style={{
        padding: "32px",
        border: "1px solid #e5e7eb",
        textAlign: "center",
        marginTop: "24px",
  marginBottom: "24px",
      }}
    >
      <Text
        size="xl"
        fw={700}
        mb="xs"
        style={{ color: "#6366f1" }}
      >
        Booking Confirmed 🎉
      </Text>

      <Text
        size="sm"
        c="dimmed"
        mb="xl"
      >
        Your course has been successfully created.
      </Text>

      <button
 onClick={() => {
  dispatch(resetFlow());
  navigate("/parent/courses", { replace: true });
}}
  className="w-full mt-4 py-3 rounded-full 
  bg-gradient-to-r from-indigo-500 to-pink-500 
  text-white font-semibold shadow-md hover:opacity-90 transition"
>
  Go to Courses →
</button>
    </Card>
  </div>
</>
  );
};

export default ConfirmationStep;