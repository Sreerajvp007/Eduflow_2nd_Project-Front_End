

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveTeachingInfo,
  fetchTeachingMeta,
} from "../../../../features/tutor/onboarding/tutorOnboardingSlice";

import MuiInput from "../../../../components/common/input";
import MuiButton from "../../../../components/common/button";
import MuiCheckboxGroup from "../../../../components/common/checkboxGroup";

const TeachingInfoStep = () => {
  const dispatch = useDispatch();

  const { loading, tutor, teachingMeta, error } = useSelector(
    (state) => state.tutorOnboarding
  );

  const [form, setForm] = useState({
    syllabus: tutor?.syllabus || [],
    classes: tutor?.classes || [],
    subjects: tutor?.subjects || [],
    teachingExperience: tutor?.teachingExperience || "",
    monthlyFee: tutor?.monthlyFee || "",
    availability: tutor?.availability?.map((a) => a.time) || [],
  });

  /* 🔥 Fetch classes + subjects */
  useEffect(() => {
    dispatch(fetchTeachingMeta());
  }, [dispatch]);

  /* 🔥 Dynamic Class Options */
  const classOptions = useMemo(() => {
    return teachingMeta.map((c) => ({
      label: `Grade ${c.classGrade}`,
      value: c.classGrade,
    }));
  }, [teachingMeta]);

  /* 🔥 Subject Options based on boards + classes */
  const subjectOptions = useMemo(() => {
    let subjects = [];

    teachingMeta
      .filter((c) => form.classes.includes(c.classGrade))
      .forEach((c) => {
        form.syllabus.forEach((board) => {
          const boardSubjects = c.subjectsByBoard?.[board] || [];

          boardSubjects.forEach((s) => {
            subjects.push({
              label: s.name,
              value: s.name,
            });
          });
        });
      });

    const unique = Array.from(
      new Map(subjects.map((s) => [s.value, s])).values()
    );

    return unique;
  }, [teachingMeta, form.classes, form.syllabus]);

  /* 🔥 Remove subject if invalid */
  useEffect(() => {
    const validSubjects = subjectOptions.map((s) => s.value);

    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) =>
        validSubjects.includes(s)
      ),
    }));
  }, [subjectOptions]);

  /* 🔥 Time slot options */
  const timeSlotOptions = [
    "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
    "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM",
    "5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM"
  ].map((time) => ({
    label: time,
    value: time,
  }));

  const handleSave = async () => {

    const payload = {
  ...form,
  availability: form.availability
};

    await dispatch(saveTeachingInfo(payload));
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

        {/* Boards */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Teaching Boards
          </p>

          <MuiCheckboxGroup
            values={form.syllabus}
            onChange={(vals) =>
              setForm({ ...form, syllabus: vals })
            }
            options={[
              { label: "STATE", value: "STATE" },
              { label: "CBSE", value: "CBSE" },
              { label: "ICSE", value: "ICSE" },
            ]}
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
            options={classOptions}
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
            options={subjectOptions}
          />
        </div>

       {/* Availability */}
<div className="mb-6">
  <p className="text-sm font-medium text-gray-700 mb-3">
    Available Time Slots
  </p>

  <div className="grid grid-cols-4 gap-2">
    {[
      "6:00 AM","7:00 AM","8:00 AM","5:00 PM",


      "6:00 PM","7:00 PM","8:00 PM","9:00 PM"
    ].map((time) => {
      const selected = form.availability.includes(time);

      return (
        <button
          key={time}
          type="button"
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              availability: selected
                ? prev.availability.filter((t) => t !== time)
                : [...prev.availability, time],
            }));
          }}
          className={`
            text-sm rounded-lg border px-3 py-2 transition
            ${
              selected
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white border-gray-300 hover:border-indigo-400"
            }
          `}
        >
          {time}
        </button>
      );
    })}
  </div>
</div>
        {/* Experience */}
        <div className="mb-6">
          <MuiInput
            label="Years of Experience"
            type="number"
            value={form.teachingExperience}
            onChange={(e) =>
              setForm({
                ...form,
                teachingExperience: e.target.value,
              })
            }
            sx={lightInputSx}
          />
        </div>

        {/* Monthly Fee */}
        <div className="mb-6">
          <MuiInput
            label="Monthly Fee"
            type="number"
            value={form.monthlyFee}
            onChange={(e) =>
              setForm({
                ...form,
                monthlyFee: e.target.value,
              })
            }
            sx={lightInputSx}
          />
        </div>

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