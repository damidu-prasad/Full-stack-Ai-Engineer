import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Step 1: Lead
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nic: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },

  // Step 2: The Core Desire
  primaryGoal: { type: String, required: true, enum: [
    'foundation_for_it', 
    'prep_for_degree', 
    'easier_campus_life', 
    'boost_job_productivity'
  ]},

  // Step 3: Quiz
  biggestHurdle: { type: String, required: true, enum: [
    'fear_of_coding',
    'lack_of_guidance',
    'lack_of_time',
    'dont_know_where_to_start'
  ]},
  timeCommitment: { type: String, required: true, enum: [
    '1-2_hours',
    '2-4_hours',
    'more_than_4'
  ]},

  // Step 4: Background
  currentStage: { type: String, required: true, enum: ['after_al', 'university', 'working'] },
  
  // Conditional: After A/L
  alYear: { type: String },
  alStream: { type: String },

  // Conditional: Uni / Working
  universityOrInstitute: { type: String },
  javaInstituteBatch: { type: String },
  customInstituteName: { type: String },

  // Step 5: Final Hook
  whySelectYou: { type: String, required: true },
  
  // Metadata
  submissionLanguage: { type: String, default: 'en' },
  isLeadCapturedOnly: { type: Boolean, default: false },
  applicationStatus: { type: String, default: 'pending', enum: ['pending', 'reviewed', 'selected', 'rejected'] },
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
