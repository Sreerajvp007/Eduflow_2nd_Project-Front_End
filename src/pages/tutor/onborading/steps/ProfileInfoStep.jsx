
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProfileInfo } from "../../../../features/tutor/onboarding/tutorOnboardingSlice";

import MuiTextField from "../../../../components/common/TextArea";
import MuiButton from "../../../../components/common/button";

const ProfileInfoStep = () => {
  const dispatch = useDispatch();
  const { loading, tutor } = useSelector(
    (state) => state.tutorOnboarding
  );

  const [bio, setBio] = useState(tutor?.bio || "");
  const [profileImage, setProfileImage] = useState(
    tutor?.profileImage || ""
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    await dispatch(saveProfileInfo({ bio, profileImage }));
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_14px_rgba(0,0,0,0.04)] px-6 py-6">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Information
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add a profile photo and short introduction.
          </p>
        </div>

        {/* Profile Photo */}
        <div className="flex items-center gap-5 mb-7">
          <div className="w-20 h-20 rounded-full border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">
                No photo
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              Profile Photo
            </p>
            <p className="text-xs text-gray-400 mb-1">
              Clear headshot, max 2MB
            </p>

            <label className="text-sm font-medium text-indigo-600 cursor-pointer">
              Upload photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-7">
          <MuiTextField
            label="Short Bio / Introduction"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={4}
            placeholder="Briefly describe your experience and teaching style…"
          />
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <MuiButton
            loading={loading}
            onClick={handleSave}
            sx={{
    backgroundColor: "#000",
    "&:hover": { backgroundColor: "#000" },
  }}
           
          >
            Save & Continue
          </MuiButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoStep;
