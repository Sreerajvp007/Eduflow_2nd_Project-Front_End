import axiosInstance from "../../../utils/axiosInstance";

const onboardingAPI = {
  saveProfileInfo: async (data) => {
    const res = await axiosInstance.put(
      "/tutor/onboarding/profile",
      data
    );
    return res.data;
  },

  saveTeachingInfo: async (data) => {
    const res = await axiosInstance.put(
      "/tutor/onboarding/teaching",
      data
    );
    return res.data;
  },

  saveQualifications: async (data) => {
    const res = await axiosInstance.put(
      "/tutor/onboarding/qualifications",
      data
    );
    return res.data;
  },

  saveIdVerification: async (data) => {
    const res = await axiosInstance.put(
      "/tutor/onboarding/id-verification",
      data
    );
    return res.data;
  },

  submitForReview: async () => {
    const res = await axiosInstance.post(
      "/tutor/onboarding/submit"
    );
    return res.data;
  },
  getOnboardingStatus: async () => {
  const res = await axiosInstance.get(
    "/tutor/onboarding/status"
  );
  return res.data;
},

};

export default onboardingAPI;
