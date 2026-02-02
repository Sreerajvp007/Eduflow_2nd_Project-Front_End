
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveIdVerification,
  submitForReview,
} from "../../../../features/tutor/onboarding/tutorOnboardingSlice";

import Button from "../../../../components/common/button";
import Input from "../../../../components/common/input";

const ID_TYPES = [
  "Aadhaar Card",
  "PAN Card",
  "Passport",
  "Driving License",
];

const IdVerificationStep = () => {
  const dispatch = useDispatch();
  const { loading, tutor } = useSelector(
    (state) => state.tutorOnboarding
  );

  const [form, setForm] = useState({
    idType: tutor?.idVerification?.idType || "Aadhaar Card",
    idNumber: tutor?.idVerification?.idNumber || "",
    documentUrl: tutor?.idVerification?.documentUrl || "",
  });

  const handleFileUpload = (file) => {
    if (!file) return;

    
    setForm((prev) => ({
      ...prev,
      documentUrl: file.name,
    }));
  };

  const handleSubmit = async () => {
    await dispatch(saveIdVerification(form));
    await dispatch(submitForReview());
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_14px_rgba(0,0,0,0.04)] px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            ID Verification
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload a valid government-issued ID for verification.
          </p>
        </div>

        {/* ID Type */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">
            Government ID Type
          </label>
          <select
            value={form.idType}
            onChange={(e) =>
              setForm({ ...form, idType: e.target.value })
            }
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
          >
            {ID_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* ID Number */}
        <Input
          label="ID Number"
          value={form.idNumber}
          onChange={(e) =>
            setForm({ ...form, idNumber: e.target.value })
          }
        />

        {/* Upload */}
        <div className="mb-6">
          <label className="block text-xs text-gray-500 mb-1">
            Upload ID Proof
          </label>

          {form.documentUrl ? (
            <div className="flex items-center gap-3 text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
              <span className="text-gray-700 truncate">
                {form.documentUrl}
              </span>

              <span className="text-green-600 text-xs font-medium">
                ✓ Uploaded
              </span>

              <label className="ml-auto text-indigo-600 cursor-pointer text-sm">
                Replace
                <input
                  type="file"
                  hidden
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileUpload(e.target.files[0])
                  }
                />
              </label>
            </div>
          ) : (
            <label className="group flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-dashed border-gray-300 rounded-md text-sm cursor-pointer text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition">
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v4h16v-4" />
              </svg>
              Upload ID Proof
              <input
                type="file"
                hidden
                accept="image/*,.pdf"
                onChange={(e) =>
                  handleFileUpload(e.target.files[0])
                }
              />
            </label>
          )}
        </div>

        {/* Status */}
        <div className="mb-6 text-sm">
          <span className="text-gray-500">
            Status:
          </span>{" "}
          <span className="font-medium text-yellow-600">
            Pending
          </span>
        </div>

        {/* Final CTA */}
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <Button
            loading={loading}
            onClick={handleSubmit}
            className="px-8"
            sx={{
    backgroundColor: "#000",
    "&:hover": { backgroundColor: "#000" },
  }}
          >
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdVerificationStep;
