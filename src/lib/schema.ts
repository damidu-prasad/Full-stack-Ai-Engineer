import { z } from 'zod';

export type PrimaryGoal = 
  | 'foundation_for_it' 
  | 'prep_for_degree' 
  | 'easier_campus_life' 
  | 'boost_job_productivity';

export type BiggestHurdle = 'fear_of_coding' | 'lack_of_guidance' | 'lack_of_time' | 'dont_know_where_to_start';
export type TimeCommitment = '1-2_hours' | '2-4_hours' | 'more_than_4';
export type CurrentStage = 'after_al' | 'university' | 'working';
export type LanguageContext = 'en' | 'si';

// Step 1: Lead Capture
export const step1Schema = z.object({
  firstName: z.string().min(2, { message: "First name is too short" }),
  lastName: z.string().min(2, { message: "Last name is too short" }),
  nic: z.string().regex(/^(?:[0-9]{9}[vVxX]|[0-9]{12})$/, { message: "Invalid NIC format" }),
  whatsapp: z.string().regex(/^(?:\+94|0)?7\d{8}$/, { message: "Invalid Sri Lankan phone number" }),
  email: z.string().email({ message: "Invalid email address" }),
});
export type Step1Data = z.infer<typeof step1Schema>;

// Step 2: The Core Desire
export const step2Schema = z.object({
  primaryGoal: z.enum(['foundation_for_it', 'prep_for_degree', 'easier_campus_life', 'boost_job_productivity'], { required_error: "Please select a goal" }),
});
export type Step2Data = z.infer<typeof step2Schema>;

// Step 3: Quiz
export const step3Schema = z.object({
  biggestHurdle: z.enum(['fear_of_coding', 'lack_of_guidance', 'lack_of_time', 'dont_know_where_to_start'], { required_error: "Please select your biggest hurdle" }),
  timeCommitment: z.enum(['1-2_hours', '2-4_hours', 'more_than_4'], { required_error: "Please select a time commitment" }),
});
export type Step3Data = z.infer<typeof step3Schema>;

// Step 4: Background
export const step4Schema = z.object({
  currentStage: z.enum(['after_al', 'university', 'working'], { required_error: "Please select your current stage" }),
  alYear: z.string().optional(),
  alStream: z.string().optional(),
  universityOrInstitute: z.string().optional(),
  javaInstituteBatch: z.string().optional(),
  customInstituteName: z.string().optional(),
  currentProfessionField: z.string().optional(),
}).refine((data) => {
  if (data.currentStage === 'after_al') {
    return !!data.alYear && !!data.alStream;
  }
  if (data.currentStage === 'university') {
    return !!data.universityOrInstitute;
  }
  if (data.currentStage === 'working') {
    return !!data.currentProfessionField;
  }
  return true;
}, {
  message: "Please fill all required fields for your current stage",
  path: ["currentStage"]
});
export type Step4Data = z.infer<typeof step4Schema>;

// Step 5: Final Hook
export const step5Schema = z.object({
  whySelectYou: z.string().min(10, { message: "Please tell us a bit more about why we should select you." }),
});
export type Step5Data = z.infer<typeof step5Schema>;

// Complete Form Schema
export const applicationSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  // Base fields for step 4 to simplify the final type
  currentStage: z.enum(['after_al', 'university', 'working']),
  alYear: z.string().optional(),
  alStream: z.string().optional(),
  universityOrInstitute: z.string().optional(),
  javaInstituteBatch: z.string().optional(),
  customInstituteName: z.string().optional(),
  currentProfessionField: z.string().optional(),
  ...step5Schema.shape,
});

export type PsychologicalFormData = z.infer<typeof applicationSchema>;
