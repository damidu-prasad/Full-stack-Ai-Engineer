import { z } from 'zod';

export const applicationSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  nic: z.string().regex(/^[0-9]{9}[vVxX]$|^[0-9]{12}$/, { message: "Invalid NIC format" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z.string().regex(/^(?:\+94|0)7[0-9]{8}$/, { message: "Invalid Sri Lankan phone number" }),
  cityDistrict: z.string().min(1, { message: "District is required" }),
  
  currentStatus: z.enum(['After A/L', 'Undergraduate', 'After Degree', 'Career Change']),
  
  afterALYear: z.string().optional(),
  afterALStream: z.string().optional(),
  
  undergradDegree: z.string().optional(),
  undergradUniversity: z.string().optional(),
  
  degreeName: z.string().optional(),
  degreeUniversity: z.string().optional(),
  otherUniversity: z.string().optional(),
  
  javaInstituteBatch: z.string().optional(),
  javaInstituteSemester: z.string().optional(),
  javaInstituteGradYear: z.string().optional(),
  
  careerChangePreviousField: z.string().optional(),
  careerChangeReason: z.string().optional(),
  
  hasProgrammingKnowledge: z.enum(['YES', 'NO', 'Basic Knowledge']),
  webDevFrameworks: z.array(z.string()).optional(),
  customFrameworks: z.string().optional(),
  otherSkills: z.string().optional(),
  
  hasAIMLKnowledge: z.enum(['YES', 'NO']),
  aimlDetails: z.string().optional(),
  
  cvResumeLink: z.string().url({ message: "Must be a valid URL" }),
  whyJoin: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
