
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTeachingInfo } from "../../../../features/tutor/onboarding/tutorOnboardingSlice";

import MuiInput from "../../../../components/common/input";
import MuiButton from "../../../../components/common/button";
import MuiRadioGroup from "../../../../components/common/Radio";
import MuiCheckboxGroup from "../../../../components/common/checkboxGroup";

const CLASS_OPTIONS = [
  { label: "Grade 1-4", value: "Grade 1-4" },
  { label: "Grade 5-7", value: "Grade 5-7" },
  { label: "Grade 8-10", value: "Grade 8-10" },
  { label: "Grade 11-12", value: "Grade 11-12" },
];

const SUBJECT_OPTIONS = [
  { label: "English", value: "English" },
  { label: "Maths", value: "Maths" },
  { label: "Hindi", value: "Hindi" },
  { label: "Social", value: "Social" },
  { label: "Chemistry", value: "Chemistry" },
];

const TeachingInfoStep = () => {
  const dispatch = useDispatch();
  const { loading, tutor } = useSelector(
    (state) => state.tutorOnboarding
  );

  const [form, setForm] = useState({
    syllabus: tutor?.syllabus || "STATE",
    classes: tutor?.classes || [],
    subjects: tutor?.subjects?.map((s) => s.subjectId) || [],
    teachingExperience: tutor?.teachingExperience || "",
    hourlyRate: tutor?.hourlyRate || "",
  });

  const handleSave = async () => {
    await dispatch(saveTeachingInfo(form));
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_14px_rgba(0,0,0,0.04)] px-6 py-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Teaching Information
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This information helps us match you with students.
          </p>
        </div>

        {/* Syllabus */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Teaching syllabus
          </p>

          <MuiRadioGroup
  value={form.syllabus}
  onChange={(val) =>
    setForm({ ...form, syllabus: val })
  }
  options={[
    { label: "STATE", value: "STATE" },
    { label: "CBSE", value: "CBSE" },
    { label: "ICSE", value: "ICSE" },
  ]}
  theme="light"
/>
        </div>
        

        {/* Classes */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Classes / Grades Handled
          </p>

          <MuiCheckboxGroup
            values={form.classes}
            onChange={(vals) =>
              setForm({ ...form, classes: vals })
            }
            options={CLASS_OPTIONS}
          />
        </div>

        {/* Subjects */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Subjects
          </p>

          <MuiCheckboxGroup
            values={form.subjects}
            onChange={(vals) =>
              setForm({ ...form, subjects: vals })
            }
            options={SUBJECT_OPTIONS}
          />
        </div>

        {/* Experience */}
        <div className="mb-6">
          <MuiInput
  label="Years of Experience"
  type="number"
  value={form.teachingExperience}
  onChange={(e) =>
    setForm({ ...form, teachingExperience: e.target.value })
  }
  sx={lightInputSx}
/>

        </div>

        {/* Rate */}
        <div className="mb-6">
          <MuiInput
  label="Payment per hour"
  type="number"
  value={form.hourlyRate}
  onChange={(e) =>
    setForm({ ...form, hourlyRate: e.target.value })
  }
  sx={lightInputSx}
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

export default TeachingInfoStep;
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
