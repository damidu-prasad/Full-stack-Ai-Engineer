"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { PsychologicalFormData } from "@/lib/schema";

const UNIVERSITIES = [
  "University of Colombo", "University of Peradeniya", "University of Moratuwa", "University of Kelaniya", 
  "University of Sri Jayewardenepura", "University of Ruhuna", "Rajarata University", "Wayamba University", 
  "Sabaragamuwa University", "University of Jaffna", "Eastern University", "South Eastern University", 
  "Uva Wellassa University", "University of the Visual & Performing Arts", "Gampaha Wickramarachchi University", 
  "University of Vavuniya", "Open University of Sri Lanka (OUSL)", "SLIIT", "NSBM Green University", 
  "IIT (Informatics Institute of Technology)", "NIBM", "CINEC Campus", "KDU (General Sir John Kotelawala Defence University)", 
  "Java Institute for Advanced Technology", "ICBT Campus", "BCAS Campus", "SLTC Research University", 
  "ESOFT Metro Campus", "Horizon Campus", "Saegis Campus", "APIIT Sri Lanka", "KIU (Kaatsu International University)", 
  "Aquinas College", "BMS (Business Management School)", "RIC (Royal Institute of Colombo)", "EAM CRA", "Other"
].map(uni => ({ value: uni, label: uni }));

const AL_YEARS = Array.from({ length: 12 }, (_, i) => 2015 + i);

const LABELS = {
  en: {
    next: "Next",
    back: "Back",
    submit: "Yes! Unlock My AI Future",
    submitting: "Submitting...",
    successTitle: "You're In!",
    successSubtitle: "Your application is successful. We will contact you soon.",
    step1: {
      title: "Let's Get Started",
      desc: "Welcome to the future of technology. Fill in your basic details to begin your journey into AI.",
      firstName: "First Name",
      lastName: "Last Name",
      nic: "NIC Number",
      whatsapp: "Best WhatsApp Number",
      email: "Email Address",
    },
    step2: {
      title: "What is your primary goal right now?",
      desc: "AI is reshaping every industry. Tell us what you want to achieve, so we can guide you to success.",
      options: {
        foundation_for_it: "🎯 Build a foundation for an IT Career",
        prep_for_degree: "🎓 Prep before starting a Degree",
        easier_campus_life: "🚀 Make Campus life & projects easier",
        boost_job_productivity: "💼 Boost Job Productivity & Career growth",
      }
    },
    step3: {
      hurdleTitle: "What is your biggest hurdle when thinking about AI & IT?",
      hurdleDesc: "It's normal to feel overwhelmed. We are here to clear the path for you.",
      hurdles: {
        fear_of_coding: "Fear of coding",
        lack_of_guidance: "Lack of guidance",
        lack_of_time: "Lack of time",
        dont_know_where_to_start: "Don't know where to start",
      },
      timeTitle: "How much time can you dedicate daily for your future?",
      times: {
        "1-2_hours": "1 - 2 hours",
        "2-4_hours": "2 - 4 hours",
        "more_than_4": "More than 4 hours",
      }
    },
    step4: {
      title: "Where are you right now in your journey?",
      desc: "Whether you are a student or a professional, there is a place for you in the AI revolution.",
      stages: {
        after_al: "After A/L",
        university: "At a University/Institute",
        working: "Working",
      },
      alYear: "A/L Year",
      alStream: "A/L Stream",
      streams: { Maths: "Maths", Bio: "Bio", Tech: "Tech", Arts: "Arts", Commerce: "Commerce" },
      university: "Select your University / Institute",
      javaBatch: "Java Institute Batch Number",
      customInstitute: "Type your Institute name",
      professionField: "Your Current Job / Profession",
    },
    step5: {
      title: "Why should we select you?",
      desc: "This is your moment to shine. Tell us your passion for AI and why you are ready to learn.",
      placeholder: "Write a few words about your passion...",
    }
  },
  si: {
    next: "ඉදිරියට",
    back: "ආපසු",
    submit: "ඔව්! මගේ AI ගමන අරඹන්න",
    submitting: "යොමු කරමින් පවතී...",
    successTitle: "අයදුම්පත සාර්ථකයි!",
    successSubtitle: "ඔබගේ අනාගතයට ගත් පියවර සාර්ථකයි. අපි ඔබව ඉක්මනින් සම්බන්ධ කරගන්නෙමු.",
    step1: {
      title: "ආරම්භ කරමු",
      desc: "තාක්ෂණයේ අනාගතයට සාදරයෙන් පිළිගනිමු! ඔබගේ AI ගමන ආරම්භ කිරීමට මූලික තොරතුරු ලබා දෙන්න.",
      firstName: "මුල් නම",
      lastName: "වාසගම",
      nic: "ජාතික හැඳුනුම්පත් අංකය (NIC)",
      whatsapp: "ඔබේ WhatsApp අංකය",
      email: "ඊමේල් ලිපිනය",
    },
    step2: {
      title: "ඔබගේ ප්‍රධානතම ඉලක්කය කුමක්ද?",
      desc: "AI තාක්ෂණය ලෝකයම වෙනස් කරමින් පවතී. ඔබේ අරමුණ කුමක්දැයි අපට පවසන්න.",
      options: {
        foundation_for_it: "🎯 IT ක්ෂේත්‍රයට අඩිතාලමක් දාගන්න",
        prep_for_degree: "🎓 Degree එකක් පටන් ගන්න කලින් මූලික දැනුම හදාගන්න",
        easier_campus_life: "🚀 Campus එකේ Assignments / Projects ලේසි කරගන්න",
        boost_job_productivity: "💼 රැකියාවේ වැඩ පහසු කරගෙන ඉක්මන් දියුණුවක් ලබන්න",
      }
    },
    step3: {
      hurdleTitle: "AI සහ IT ගැන හිතනකොට ඔබට දැනෙන ලොකුම බාධාව මොකක්ද?",
      hurdleDesc: "අභියෝග සාමාන්‍ය දෙයකි. ඒවා ජය ගැනීමට නිවැරදි මඟ පෙන්වීමක් අපි ලබා දෙන්නෙමු.",
      hurdles: {
        fear_of_coding: "කේතනය (Coding) අමාරුයි කියන බය.",
        lack_of_guidance: "හරි පාර පෙන්නන්න කෙනෙක් / ගයිඩන්ස් එකක් නැතිකම.",
        lack_of_time: "කාලය කළමනාකරණය කරගන්න අමාරුකම.",
        dont_know_where_to_start: "කොහෙන් පටන් ගන්නද කියලා හිතාගන්න බැරිකම.",
      },
      timeTitle: "ඔබ දවසකට කොපමණ කාලයක් ඔබේ අනාගතය වෙනුවෙන් ආයෝජනය කරන්න සූදානම්ද?",
      times: {
        "1-2_hours": "පැය 1 - 2",
        "2-4_hours": "පැය 2 - 4",
        "more_than_4": "ඊට වැඩියෙන් පුළුවන්",
      }
    },
    step4: {
      title: "දැනට ඔබ ඉන්නේ කොතැනද?",
      desc: "ඔබ ශිෂ්‍යයෙකු වුවත් වෘත්තිකයෙකු වුවත්, AI ලෝකයේ ඔබට සුවිශේෂී තැනක් ඇත.",
      stages: {
        after_al: "උසස් පෙළින් පසු",
        university: "විශ්වවිද්‍යාලයක / ආයතනයක",
        working: "රැකියාවක",
      },
      alYear: "කළ වසර",
      alStream: "විෂය ධාරාව",
      streams: { Maths: "ගණිත", Bio: "ජීව විද්‍යා", Tech: "තාක්ෂණවේදය", Arts: "කලා", Commerce: "වාණිජ" },
      university: "ඔබේ විශ්වවිද්‍යාලය / ආයතනය තෝරන්න",
      javaBatch: "Java Institute Batch අංකය",
      customInstitute: "ආයතනයේ නම ටයිප් කරන්න",
      professionField: "ඔබේ වර්තමාන රැකියාව / ක්ෂේත්‍රය",
    },
    step5: {
      title: "ඇයි අපි ඔබව මේ ප්‍රෝග්‍රෑම් එකට තෝරගන්න ඕනේ?",
      desc: "මෙය ඔබගේ වාරයයි. AI පිළිබඳ ඔබේ උනන්දුව සහ ඉගෙනීමට ඇති සූදානම ගැන අපට කියන්න.",
      placeholder: "වචන කිහිපයකින් ලියන්න...",
    }
  },
};

export default function ApplicationForm() {
  const [lang, setLang] = useState<"en" | "si">("si");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = LABELS[lang];

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm<PsychologicalFormData>({
    mode: "onTouched",
  });

  const primaryGoal = watch("primaryGoal");
  const currentStage = watch("currentStage");
  const universityOrInstitute = watch("universityOrInstitute");

  const onNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["firstName", "lastName", "nic", "email", "whatsapp"]);
      if (isValid) {
        try {
          const data = watch();
          fetch("/api/applications/step1", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        } catch (e) {
          console.error("Failed to capture lead", e);
        }
        setStep(2);
      }
    } else if (step === 2) {
      isValid = await trigger(["primaryGoal"]);
      if (isValid) setStep(3);
    } else if (step === 3) {
      isValid = await trigger(["biggestHurdle", "timeCommitment"]);
      if (isValid) setStep(4);
    } else if (step === 4) {
      isValid = await trigger(["currentStage", "alYear", "alStream", "universityOrInstitute", "javaInstituteBatch", "customInstituteName", "currentProfessionField"]);
      if (isValid) setStep(5);
    }
  };

  const onSubmit = async (data: PsychologicalFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submissionLanguage: lang }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errData = await response.json();
        setError(errData.error || "Submission failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#020617', // gray-950
      borderColor: state.isFocused ? '#3B82F6' : '#334155', // blue-500 or gray-700
      padding: '0.5rem',
      borderRadius: '0.75rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3B82F6'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#0F172A',
      border: '1px solid #334155',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#1E293B' : 'transparent',
      color: 'white',
      '&:active': {
        backgroundColor: '#3B82F6',
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white'
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white'
    })
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-800 border border-slate-700 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold mb-3">{t.successTitle}</h2>
          <p className="text-slate-400 text-lg">{t.successSubtitle}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      <header className="p-4 sm:p-6 flex justify-between items-center border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-20 bg-slate-950/80">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          AI Engineer Internship
        </div>
        <button onClick={() => setLang(lang === "en" ? "si" : "en")} className="bg-slate-800 hover:bg-slate-700 transition px-4 py-2 rounded-full text-sm font-semibold tracking-wide border border-slate-700">
          {lang === "en" ? "සිංහල" : "EN"}
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 w-full">
        {/* Progress */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>Step {step} of 5</span>
            <span>{step * 20}% Completed</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${step * 20}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="max-w-3xl w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{t.step1.title}</h2>
                  <p className="text-slate-400 text-sm mb-6">{t.step1.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">{t.step1.firstName}</label>
                    <input type="text" {...register("firstName")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message as string}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">{t.step1.lastName}</label>
                    <input type="text" {...register("lastName")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message as string}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">{t.step1.nic}</label>
                  <input type="text" {...register("nic")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                  {errors.nic && <p className="text-red-400 text-sm mt-1">{errors.nic.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">{t.step1.whatsapp}</label>
                  <input type="tel" {...register("whatsapp")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                  {errors.whatsapp && <p className="text-red-400 text-sm mt-1">{errors.whatsapp.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">{t.step1.email}</label>
                  <input type="email" {...register("email")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message as string}</p>}
                </div>
                <div className="pt-4 flex justify-end">
                  <button onClick={onNextStep} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                    {t.next}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{t.step2.title}</h2>
                  <p className="text-slate-400 text-sm mb-6">{t.step2.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(t.step2.options).map(([key, label]) => (
                    <label key={key} className={`cursor-pointer border rounded-2xl p-6 transition-all flex items-center ${primaryGoal === key ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 hover:border-slate-600 bg-slate-950/50'}`}>
                      <input type="radio" value={key} {...register("primaryGoal")} className="sr-only" />
                      <div className="font-medium text-lg leading-snug">{label}</div>
                    </label>
                  ))}
                </div>
                {errors.primaryGoal && <p className="text-red-400 text-sm mt-2">{errors.primaryGoal.message as string}</p>}
                <div className="pt-8 flex justify-between">
                  <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white px-4 py-4 rounded-xl font-medium transition-colors">{t.back}</button>
                  <button onClick={onNextStep} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">{t.next}</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{t.step3.hurdleTitle}</h2>
                  <p className="text-slate-400 text-sm mb-4">{t.step3.hurdleDesc}</p>
                  <div className="space-y-3">
                    {Object.entries(t.step3.hurdles).map(([key, label]) => (
                      <label key={key} className="flex items-center space-x-3 cursor-pointer group p-4 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-600 transition">
                        <input type="radio" value={key} {...register("biggestHurdle")} className="w-5 h-5 text-blue-500 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-950" />
                        <span className="font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.biggestHurdle && <p className="text-red-400 text-sm mt-2">{errors.biggestHurdle.message as string}</p>}
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">{t.step3.timeTitle}</h2>
                  <div className="space-y-3">
                    {Object.entries(t.step3.times).map(([key, label]) => (
                      <label key={key} className="flex items-center space-x-3 cursor-pointer group p-4 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-600 transition">
                        <input type="radio" value={key} {...register("timeCommitment")} className="w-5 h-5 text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 focus:ring-offset-slate-950" />
                        <span className="font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.timeCommitment && <p className="text-red-400 text-sm mt-2">{errors.timeCommitment.message as string}</p>}
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => setStep(2)} className="text-slate-400 hover:text-white px-4 py-4 rounded-xl font-medium transition-colors">{t.back}</button>
                  <button onClick={onNextStep} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">{t.next}</button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{t.step4.title}</h2>
                  <p className="text-slate-400 text-sm mb-6">{t.step4.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {Object.entries(t.step4.stages).map(([key, label]) => (
                    <label key={key} className={`cursor-pointer border rounded-2xl p-4 text-center transition-all ${currentStage === key ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 hover:border-slate-600 bg-slate-950/50'}`}>
                      <input type="radio" value={key} {...register("currentStage")} className="sr-only" />
                      <div className="font-medium">{label}</div>
                    </label>
                  ))}
                </div>
                {errors.currentStage && <p className="text-red-400 text-sm -mt-6 mb-4">{errors.currentStage.message as string}</p>}

                {currentStage === 'after_al' && (
                  <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">{t.step4.alYear}</label>
                        <select {...register("alYear")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg outline-none focus:border-blue-500">
                          <option value="">Select Year</option>
                          {AL_YEARS.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">{t.step4.alStream}</label>
                        <select {...register("alStream")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg outline-none focus:border-blue-500">
                          <option value="">Select Stream</option>
                          {Object.entries(t.step4.streams).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                        </select>
                     </div>
                  </motion.div>
                )}

                {currentStage === 'university' && (
                  <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="space-y-6">
                     <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">{t.step4.university}</label>
                        <Controller
                          name="universityOrInstitute"
                          control={control}
                          render={({ field }) => (
                            <Select 
                              {...field}
                              options={UNIVERSITIES}
                              styles={customSelectStyles}
                              placeholder="Search..."
                              onChange={(val: any) => field.onChange(val?.value)}
                              value={UNIVERSITIES.find(u => u.value === field.value) || null}
                            />
                          )}
                        />
                     </div>
                     
                     {universityOrInstitute === "Java Institute for Advanced Technology" && (
                       <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                          <label className="block text-sm font-medium mb-2 text-slate-300">{t.step4.javaBatch}</label>
                          <input type="text" {...register("javaInstituteBatch")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg outline-none focus:border-blue-500" />
                       </motion.div>
                     )}
                     
                     {universityOrInstitute === "Other" && (
                       <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                          <label className="block text-sm font-medium mb-2 text-slate-300">{t.step4.customInstitute}</label>
                          <input type="text" {...register("customInstituteName")} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg outline-none focus:border-blue-500" />
                       </motion.div>
                     )}
                  </motion.div>
                )}

                {currentStage === 'working' && (
                  <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">{t.step4.professionField}</label>
                      <input type="text" {...register("currentProfessionField")} placeholder="e.g. Civil Engineer, Marketing Executive" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                      {errors.currentProfessionField && <p className="text-red-400 text-sm mt-1">{errors.currentProfessionField.message as string}</p>}
                    </div>
                  </motion.div>
                )}

                <div className="pt-8 flex justify-between">
                  <button onClick={() => setStep(3)} className="text-slate-400 hover:text-white px-4 py-4 rounded-xl font-medium transition-colors">{t.back}</button>
                  <button onClick={onNextStep} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">{t.next}</button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{t.step5.title}</h2>
                  <p className="text-slate-400 text-sm mb-6">{t.step5.desc}</p>
                </div>
                <div>
                  <textarea
                    rows={6}
                    placeholder={t.step5.placeholder}
                    {...register("whySelectYou")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  ></textarea>
                  {errors.whySelectYou && <p className="text-red-400 text-sm mt-1">{errors.whySelectYou.message as string}</p>}
                </div>

                <div className="pt-8 flex justify-between">
                  <button onClick={() => setStep(4)} className="text-slate-400 hover:text-white px-4 py-4 rounded-xl font-medium transition-colors">{t.back}</button>
                  <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? t.submitting : t.submit}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
