import { useState } from "react";
import { saveUserProfile } from "./FirebaseFunctions";
import { useAuth } from "../context/AuthContext";

export default function UserProfileForm() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Converts a file to Base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // outputs Base64
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to save your profile.");
      return;
    }

    setLoading(true);
    try {
      const resumeBase64 = resume ? await fileToBase64(resume) : "";
      const coverLetterBase64 = coverLetter ? await fileToBase64(coverLetter) : "";

      await saveUserProfile({
        name,
        phone,
        email,
        address,
        resume: resumeBase64,
        coverLetter: coverLetterBase64,
      });

      alert("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Your Profile</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <div>
        <label className="block font-medium mb-1">Resume (PDF/DOCX)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Cover Letter (PDF/DOCX)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}