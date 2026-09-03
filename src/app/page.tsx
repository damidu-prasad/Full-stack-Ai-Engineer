"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { applicationSchema } from "@/lib/schema";

type FormData = z.infer<typeof applicationSchema>;

const sriLankanDistricts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const universityList = [
  'Our University', 'University of Moratuwa', 'University of Colombo', 'University of Kelaniya', 'University of Peradeniya', 'University of Sri Jayewardenepura', 'SLIIT', 'IIT', 'Java Institute for Advanced Technology', 'NSBM', 'NIBM', 'Other'
];

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [dynamicQuestions, setDynamicQuestions] = useState<string[]>([]);
  const [dynamicAnswers, setDynamicAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setDynamicQuestions(data.data.map((q: any[]) => q[0]));
        }
      })
      .catch(console.error);
  }, []);

  const handleDynamicChange = (question: string, value: string) => {
    setDynamicAnswers(prev => ({ ...prev, [question]: value }));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      hasProgrammingKnowledge: "NO",
      hasAIMLKnowledge: "NO",
      webDevFrameworks: [],
    },
  });

  const currentStatus = watch("currentStatus");
  const hasProgrammingKnowledge = watch("hasProgrammingKnowledge");
  const hasAIMLKnowledge = watch("hasAIMLKnowledge");
  
  const undergradUniversity = watch("undergradUniversity");
  const degreeUniversity = watch("degreeUniversity");
  const showJavaInstituteFields = 
    (currentStatus === "Undergraduate" && undergradUniversity === "Java Institute for Advanced Technology") ||
    (currentStatus === "After Degree" && degreeUniversity === "Java Institute for Advanced Technology");

  const InputError = ({ name }: { name: keyof FormData }) => {
    if (!errors[name]) return null;
    return <p className="text-red-400 text-xs mt-1 font-medium">{errors[name]?.message as string}</p>;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    try {
      const payload = { ...data, dynamicAnswers };
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to submit application.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center max-w-md w-full relative z-10 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-green-400/20 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">Application Received!</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">Thank you for applying. We will review your application and get back to you soon.</p>
          <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-1">
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-fixed bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 px-8 py-8 border-b border-white/20">
          <h1 className="text-3xl font-extrabold text-white text-center tracking-tight">Full Stack AI Engineer Internship</h1>
          <p className="text-blue-100 text-center mt-3 text-lg font-medium">Application Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10 text-white">
          
          {/* Section 1: Personal Details */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/20 pb-3 flex items-center">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input {...register("fullName")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400 p-3 outline-none transition" placeholder="John Doe" />
                <InputError name="fullName" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">NIC Number</label>
                <input {...register("nic")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400 p-3 outline-none transition" placeholder="123456789V" />
                <InputError name="nic" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" {...register("email")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400 p-3 outline-none transition" placeholder="john@example.com" />
                <InputError name="email" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input {...register("contactNumber")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400 p-3 outline-none transition" placeholder="0712345678" />
                <InputError name="contactNumber" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">City / District</label>
                <select {...register("cityDistrict")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white focus:border-blue-400 focus:ring-blue-400 p-3 outline-none transition [&>option]:text-black">
                  <option value="">Select District</option>
                  {sriLankanDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <InputError name="cityDistrict" />
              </div>
            </div>
          </section>

          {/* Section 2: Educational Background */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/20 pb-3 flex items-center">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
              Educational Background
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Current Status</label>
              <select {...register("currentStatus")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white focus:border-blue-400 focus:ring-blue-400 p-3 outline-none transition [&>option]:text-black">
                <option value="">Select Status...</option>
                <option value="After A/L">After A/L</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="After Degree">After Degree</option>
                <option value="Career Change">Career Change</option>
              </select>
              <InputError name="currentStatus" />
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              {currentStatus === "After A/L" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <input {...register("afterALYear")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="e.g. 2023" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stream</label>
                    <input {...register("afterALStream")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="e.g. Maths, Science, Commerce" />
                  </div>
                </div>
              )}

              {currentStatus === "Undergraduate" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Degree</label>
                    <input {...register("undergradDegree")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="BSc. Computer Science" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">University</label>
                    <select {...register("undergradUniversity")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white p-3 outline-none [&>option]:text-black">
                      <option value="">Select University...</option>
                      {universityList.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {currentStatus === "After Degree" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Degree Name</label>
                    <input {...register("degreeName")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="BSc. Software Engineering" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">University</label>
                    <select {...register("degreeUniversity")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white p-3 outline-none [&>option]:text-black">
                      <option value="">Select University...</option>
                      {universityList.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {currentStatus === "Career Change" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Previous Field</label>
                    <input {...register("careerChangePreviousField")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="e.g. Accounting, Marketing" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reason for Career Change</label>
                    <textarea {...register("careerChangeReason")} rows={3} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="Why do you want to switch to IT?" />
                  </div>
                </div>
              )}
            </div>

            {/* Java Institute Optional Section - Only visible if selected */}
            {showJavaInstituteFields && (
              <div className="mt-6 border border-white/20 rounded-2xl p-6 bg-white/10 shadow-sm animate-in fade-in slide-in-from-top-4">
                <label className="block text-sm font-semibold mb-4 text-blue-200">Java Institute Student Details</label>
                <div>
                  <label className="block text-xs font-medium mb-1 text-white/80">Batch</label>
                  <input {...register("javaInstituteBatch")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="e.g. 21.1" />
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Technical Skills */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/20 pb-3 flex items-center">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
              Technical Skills
            </h2>
            
            <div className="space-y-8">
              {/* Programming Knowledge */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <label className="block text-sm font-medium mb-4">Do you have Programming Knowledge?</label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" value="YES" {...register("hasProgrammingKnowledge")} className="w-5 h-5 text-blue-400 bg-white/10 border-white/30 focus:ring-blue-400 cursor-pointer" />
                    <span className="font-medium group-hover:text-blue-300 transition">YES</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" value="NO" {...register("hasProgrammingKnowledge")} className="w-5 h-5 text-blue-400 bg-white/10 border-white/30 focus:ring-blue-400 cursor-pointer" />
                    <span className="font-medium group-hover:text-blue-300 transition">NO</span>
                  </label>
                </div>

                {hasProgrammingKnowledge === "YES" && (
                  <div className="mt-6 animate-in fade-in slide-in-from-top-4">
                    <label className="block text-sm font-medium mb-3">Web Dev Frameworks Knowledge</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["React", "Angular", "Vue", "Next.js", "Express", "Django", "Spring Boot", "Laravel"].map((framework) => (
                        <label key={framework} className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg border border-white/20 cursor-pointer hover:border-blue-400 hover:bg-white/20 transition">
                          <input type="checkbox" value={framework} {...register("webDevFrameworks")} className="w-4 h-4 text-blue-400 bg-white/10 border-white/30 rounded focus:ring-blue-400" />
                          <span className="text-sm font-medium">{framework}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* AI/ML Knowledge */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <label className="block text-sm font-medium mb-4">Do you have AI / ML Knowledge?</label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" value="YES" {...register("hasAIMLKnowledge")} className="w-5 h-5 text-blue-400 bg-white/10 border-white/30 focus:ring-blue-400 cursor-pointer" />
                    <span className="font-medium group-hover:text-blue-300 transition">YES</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" value="NO" {...register("hasAIMLKnowledge")} className="w-5 h-5 text-blue-400 bg-white/10 border-white/30 focus:ring-blue-400 cursor-pointer" />
                    <span className="font-medium group-hover:text-blue-300 transition">NO</span>
                  </label>
                </div>

                {hasAIMLKnowledge === "YES" && (
                  <div className="mt-6 animate-in fade-in slide-in-from-top-4">
                    <label className="block text-sm font-medium mb-2">Details (Optional)</label>
                    <textarea {...register("aimlDetails")} rows={3} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="Briefly describe your experience (e.g. Python, TensorFlow, PyTorch)" />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 4: Dynamic Custom Questions */}
          {dynamicQuestions.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b border-white/20 pb-3 flex items-center">
                <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">+</span>
                Additional Questions
              </h2>
              <div className="space-y-6">
                {dynamicQuestions.map((question, index) => (
                  <div key={index} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                    <label className="block text-sm font-medium mb-2">{question}</label>
                    <textarea 
                      rows={2} 
                      className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" 
                      placeholder="Your answer..."
                      onChange={(e) => handleDynamicChange(question, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: Attachments */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-white/20 pb-3 flex items-center">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
              Attachments & Final Details
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">CV / Resume Link <span className="text-red-400">*</span></label>
              <input {...register("cvResumeLink")} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="Google Drive or Dropbox Link (Make sure it's public)" />
              <InputError name="cvResumeLink" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Why do you want to join us? (Optional)</label>
              <textarea {...register("whyJoin")} rows={4} className="block w-full rounded-lg bg-white/5 border border-white/30 text-white placeholder-white/50 p-3 outline-none" placeholder="Tell us about your motivation..." />
            </div>
          </section>

          {errorMessage && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm font-medium text-center">
              {errorMessage}
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 transition transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting ? <><Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" /> Submitting...</> : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
