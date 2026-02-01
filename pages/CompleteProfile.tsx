import React, { useState } from "react";
import { supabase } from "../supabaseClient";

interface CompleteProfileProps {
  onComplete: () => void;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({ onComplete }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      alert("User not found");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        age: Number(age),
        gender,
        upi_id: upi,
        profile_completed: true,
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onComplete();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>

      <input
        type="number"
        placeholder="Age"
        className="w-full mb-3 p-2 border rounded"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <select
        className="w-full mb-3 p-2 border rounded"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input
        placeholder="UPI ID"
        className="w-full mb-4 p-2 border rounded"
        value={upi}
        onChange={(e) => setUpi(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-2 rounded"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
};

export default CompleteProfile;
