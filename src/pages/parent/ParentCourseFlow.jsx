
import { useSelector } from "react-redux";
import { Stepper, Card, Title, Text } from "@mantine/core";

import SelectSubjectStep from "./courseFlowSteps/SelectSubjectStep";
import SelectTutorStep from "./courseFlowSteps/SelectTutorStep";
import ScheduleStep from "./courseFlowSteps/ScheduleStep";
import PaymentStep from "./courseFlowSteps/PaymentStep";
import ConfirmationStep from "./courseFlowSteps/ConfirmationStep";

const ParentCourseFlow = () => {
  const { step } = useSelector((state) => state.parentCourse);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 md:p-6">
      <Card radius="xl" shadow="sm" className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Title order={3}>Request a Learning Plan</Title>
          <Text size="sm" c="dimmed">
            Follow the steps to book a course
          </Text>
        </div>

       <Stepper
  active={step - 1}
  breakpoint="sm"
  color="indigo"
  styles={{
    stepIcon: {
      borderColor: "#6366F1",
    },
    separator: {
      backgroundColor: "#6366F1",
    },
  }}
>
  <Stepper.Step label="Subject" />
  <Stepper.Step label="Tutor" />
  <Stepper.Step label="Schedule" />
  <Stepper.Step label="Payment" />
  {/* <Stepper.Step label="Confirm" /> */}
</Stepper>

        <div className="mt-8">
          {step === 1 && <SelectSubjectStep />}
          {step === 2 && <SelectTutorStep />}
          {step === 3 && <ScheduleStep />}
          {step === 4 && <PaymentStep />}
          {step === 5 && <ConfirmationStep />}
        </div>
      </Card>
    </div>
  );
};

export default ParentCourseFlow;