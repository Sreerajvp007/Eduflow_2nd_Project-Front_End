import axiosInstance from "../../../utils/axiosInstance";

const onboardingAPI = {
  saveProfileInfo: (data) =>
    axiosInstance.put("/tutor/onboarding/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  saveTeachingInfo: (data) =>
    axiosInstance.put("/tutor/onboarding/teaching", data),

  saveQualifications: (data) =>
    axiosInstance.put("/tutor/onboarding/qualifications", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  saveIdVerification: (data) =>
    axiosInstance.put("/tutor/onboarding/id-verification", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getTeachingMeta: () => axiosInstance.get("/tutor/onboarding/teaching-meta"),

  getOnboardingStatus: () => axiosInstance.get("/tutor/onboarding/status"),

  submitForReview: () => axiosInstance.post("/tutor/onboarding/submit"),
};

export default onboardingAPI;
