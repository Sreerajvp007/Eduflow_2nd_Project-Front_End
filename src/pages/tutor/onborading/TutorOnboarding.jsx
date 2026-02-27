

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "./progressBar";
import OnboardingFooter from "./onboardingFooter";

import ProfileInfoStep from "./steps/ProfileInfoStep";
import TeachingInfoStep from "./steps/TeachingInfoStep";
import QualificationsStep from "./steps/QualificationsStep";
import IdVerificationStep from "./steps/IdVerificationStep";
import OnboardingComplete from "./steps/OnboardingComplete";

import { fetchOnboardingStatus } from "../../../features/tutor/onboarding/tutorOnboardingSlice";

const STEP_COMPONENTS = {
  1: ProfileInfoStep,
  2: TeachingInfoStep,
  3: QualificationsStep,
  4: IdVerificationStep,
  5: OnboardingComplete,
};

const TutorOnboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutor } = useSelector((state) => state.tutorAuth);
  const { step, profileCompletion } = useSelector(
    (state) => state.tutorOnboarding
  );

  useEffect(() => {
    dispatch(fetchOnboardingStatus());
  }, [dispatch]);

  /* ================= APPROVED REDIRECT ================= */
  useEffect(() => {
    if (tutor?.status === "active") {
      navigate("/tutor/dashboard");
    }
  }, [tutor, navigate]);

  /* ================= STEP 5 (SUBMITTED ONLY) ================= */
  if (step === 5 && tutor?.status !== "active") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <OnboardingComplete />
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[step] || ProfileInfoStep;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-8 py-6">
        <h1 className="text-xl font-semibold">
          Profile & Verification
        </h1>
        <ProgressBar value={profileCompletion} />
      </div>

      {/* Step Content */}
      <div className="flex-1 px-8">
        <StepComponent />
      </div>

      {/* Footer */}
      <OnboardingFooter />
    </div>
  );
};

export default TutorOnboarding;
