
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveQualifications } from "../../../../features/tutor/onboarding/tutorOnboardingSlice";

import MuiButton from "../../../../components/common/button";
import MuiInput from "../../../../components/common/input";

const emptyQualification = {
  title: "",
  institute: "",
  year: "",
  certificateUrl: "",
};

const QualificationsStep = () => {
  const dispatch = useDispatch();
  const { loading, tutor, error } = useSelector(
  (state) => state.tutorOnboarding
);

  const [qualifications, setQualifications] = useState(
    tutor?.qualifications?.length
      ? tutor.qualifications
      : [emptyQualification]
  );

  const updateQualification = (index, key, value) => {
    const updated = [...qualifications];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setQualifications(updated);
  };

  const addQualification = () => {
    setQualifications([...qualifications, emptyQualification]);
  };

  const removeQualification = (index) => {
    setQualifications(
      qualifications.filter((_, i) => i !== index)
    );
  };

const handleFileUpload = (index, file) => {
  if (!file) return;

  const updated = [...qualifications];

  updated[index] = {
    ...updated[index],
    certificateFile: file,
    certificateUrl: file.name,
  };

  setQualifications(updated);
}; // ✅ CLOSE IT HERE


const handleSave = async () => {
  const formData = new FormData();

  qualifications.forEach((qual, index) => {
    formData.append(`qualifications[${index}][title]`, qual.title);
    formData.append(`qualifications[${index}][institute]`, qual.institute);
    formData.append(`qualifications[${index}][year]`, qual.year);

    if (qual.certificateFile) {
      formData.append(
        `qualifications[${index}][certificate]`,
        qual.certificateFile
      );
    }
  });

  await dispatch(saveQualifications(formData));
};

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_14px_rgba(0,0,0,0.04)] px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Qualifications & Certifications
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            List all relevant degrees and certifications. Documents
            will be reviewed by an administrator.
          </p>
        </div>

        {/* Qualification Cards */}
        {qualifications.map((qual, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <MuiInput
                label="Degree / Certification Name"
                value={qual.title}
                onChange={(e) =>
                  updateQualification(index, "title", e.target.value)
                }
                sx={lightInputSx}
              />

              <MuiInput
                label="Institution"
                value={qual.institute}
                onChange={(e) =>
                  updateQualification(index, "institute", e.target.value)
                }
                sx={lightInputSx}
              />

              <MuiInput
                label="Year"
                type="number"
                value={qual.year}
                onChange={(e) =>
                  updateQualification(index, "year", e.target.value)
                }
                sx={lightInputSx}
              />

              {/* Document Upload */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Document Upload (PDF/Image)
                </label>

                {qual.certificateUrl ? (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600">
                      {qual.certificateUrl}
                    </span>
                    <button
                      type="button"
                      className="text-blue-600"
                    >
                      View
                    </button>
                    <label className="text-blue-600 cursor-pointer">
                      Replace
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleFileUpload(
                            index,
                            e.target.files[0]
                          )
                        }
                      />
                    </label>
                  </div>
                ) : (
                  <label className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm cursor-pointer">
                    Upload Document
                    <input
                      type="file"
                      hidden
                      onChange={(e) =>
                        handleFileUpload(
                          index,
                          e.target.files[0]
                        )
                      }
                      sx={lightInputSx}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Remove */}
            {qualifications.length > 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeQualification(index)}
                  className="text-sm text-red-500"
                >
                  Remove Qualification
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add */}
        <button
          type="button"
          onClick={addQualification}
          className="text-sm text-indigo-600 mb-6"
        >
          + Add Qualification
        </button>
{error && (
  <p className="text-red-500 text-sm mb-4">
    {error}
  </p>
)}
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

export default QualificationsStep;
const lightInputSx = {
  "& .MuiOutlinedInput-root": {
    height: 48,
    borderRadius: "12px",
    backgroundColor: "#fff",
    color: "#111",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d1d5db",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9ca3af",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4f46e5",
    borderWidth: "2px",
  },
  "& .MuiInputLabel-root": {
    color: "#6b7280",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4f46e5",
  },
};