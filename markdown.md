# Full Stack AI Engineer Internship - Application Form Specification & Tech Stack Guide

මෙම Markdown ලේඛනය මඟින් **Full Stack AI Engineer Internship Program** එක සඳහා වන වෙබ් Application Form එක Next.js, React සහ MongoDB භාවිතයෙන් මුල සිට නිර්මාණය කිරීමට අවශ්‍ය සියලුම තාක්ෂණික පිරිවිතර (Specifications), Schema, Fields, Conditional Logic සහ Technologies සම්පූර්ණයෙන් දක්වා ඇත.

---

## 1. Recommended Technology Stack (අවශ්‍ය තාක්ෂණයන්)

| Category | Recommended Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14/15 (App Router)** | Modern React Server Components, Fast Performance, SEO |
| **Language** | **TypeScript** | Strict Type Safety, Form & Data integrity |
| **Styling & UI** | **Tailwind CSS** + **Lucide React** | Responsive design, Dark/Light modes, Minimal icons |
| **Form Handling** | **React Hook Form** + **Zod** | High performance form state management & validation |
| **Database** | **MongoDB Atlas** (via **Mongoose** or Native Driver) | Document database for flexible candidate records |
| **File Storage** | **Google Drive URL** or **UploadThing / Cloudinary / AWS S3** | CV / Resume PDF attachments |
| **Email / Alerts** | **Resend** or **Nodemailer** | Application receipt emails & Admin notifications |
| **Hosting** | **Vercel** (Frontend & API) + **MongoDB Atlas** (Cloud DB) | Free tier available, 1-click Custom Domain integration |

---

## 2. Form Fields & Conditional Logic Structure

පෝරමය පහත පියවර (Steps) 4 න් හෝ Single-page Accordion එකක් ලෙස සකස් කළ හැක.

### Step 1: Personal & Contact Information (මූලික තොරතුරු)
1. **Full Name (සම්පූර්ණ නම)**
   - Type: `Text`
   - Validation: Required, min 3 characters.
2. **National Identity Card (NIC - ජාතික හැඳුනුම්පත් අංකය)**
   - Type: `Text`
   - Validation: Required. Sri Lankan NIC format:
     - පැරණි: `9 digits + V/X` (Regex: `/^[0-9]{9}[vVxX]$/`)
     - නව: `12 digits` (Regex: `/^[0-9]{12}$/`)
3. **Email Address (විද්‍යුත් තැපෑල)**
   - Type: `Email`
   - Validation: Required, valid email format.
4. **Contact Number (WhatsApp / Mobile)**
   - Type: `Tel`
   - Validation: Required, Sri Lankan phone format (`+94 7X XXX XXXX` or `07XXXXXXXX`).
5. **City / District (දිස්ත්‍රික්කය)**
   - Type: `Dropdown (Select)`
   - Validation: Required.
   - Options (Sri Lanka Districts):
     - *Ampara, Anuradhapura, Badulla, Batticaloa, Colombo, Galle, Gampaha, Hambantota, Jaffna, Kalutara, Kandy, Kegalle, Kilinochchi, Kurunegala, Mannar, Matale, Matara, Monaragala, Mullaitivu, Nuwara Eliya, Polonnaruwa, Puttalam, Ratnapura, Trincomalee, Vavuniya*

---

### Step 2: Educational Background & Conditional Fields (අධ්‍යාපනික තොරතුරු)

#### Current Status (ප්‍රධාන කාණ්ඩය):
- Type: `Radio Buttons` or `Select Cards`
- Options:
  1. `Undergraduate`
  2. `After Degree`
  3. `After A/L`
  4. `Career Change`

#### Dynamic Conditional Fields (තෝරන කාණ්ඩය අනුව පමණක් මතුවන ක්ෂේත්‍ර):

* **If "After A/L" is selected:**
  - **A/L Year**: Dropdown / Number (`2021`, `2022`, `2023`, `2024`, `2025`, `Other`)
  - **A/L Stream**: Dropdown (`Physical Science (Maths)`, `Biological Science`, `Technology (Engineering/Bio)`, `Commerce`, `Arts`, `Other`)

* **If "Undergraduate" is selected:**
  - **Degree Program**: Text (`e.g. BSc (Hons) in Software Engineering`)
  - **University / Institute**: Dropdown / Text:
    - *University of Moratuwa, University of Colombo, University of Kelaniya, University of Peradeniya, University of Sri Jayewardenepura, SLIIT, IIT, Java Institute for Advanced Technology, NSBM, NIBM, Other*
  - **⚡ Conditional Java Institute Details (University එක "Java Institute for Advanced Technology" තේරූ විට පමණක් දිස් වේ):**
    - **Java Institute Batch**: Text (`e.g. PCJT Batch 58`)
    
* **If "After Degree" is selected:**
  - **Graduated Degree Name**: Text (`e.g. BSc in Computer Science`)
  - **Awarding University / Institute**: Dropdown / Text
  - **⚡ Conditional Java Institute Details (University එක "Java Institute for Advanced Technology" නම් පමණක්):**
    - **Java Institute Batch**: Text (`e.g. PCJT Batch 52`)
    - **Completion Status / Semester**: Text (`e.g. Completed / Final Year`)

* **If "Career Change" is selected:**
  - **Previous Career / Field**: Text (`e.g. Civil Engineering, Banking, Marketing`)
  - **Reason for Transition**: Textarea (`Brief explanation of why moving into AI/Tech`)

---

### Step 3: Technical Background & Skills (තාක්ෂණික දැනුම)

1. **Do you have Programming Knowledge?**
   - Type: `Radio (YES / NO)`
   - Validation: Required.

2. **If YES: Web Development & Frameworks Knowledge**
   - Type: `Multi-Select Checkboxes / Chips`
   - Options:
     - `React / Next.js`
     - `Node.js / Express`
     - `TypeScript / JavaScript`
     - `Python (FastAPI / Flask / Django)`
     - `Java / Spring Boot`
     - `C# / .NET`
     - `Tailwind CSS`
     - `Docker / Containers`
     - `PostgreSQL / MySQL`
     - `MongoDB / NoSQL`
     - `Git / GitHub`
   - **Other Technologies / Frameworks**: Text (Optional)

3. **Do you have AI / ML Knowledge?**
   - Type: `Radio (YES / NO)`
   - Validation: Required.

4. **If YES: AI / ML Knowledge & Projects Details**
   - Type: `Textarea`
   - Placeholder: `Describe your experience with LLMs, Gemini/OpenAI APIs, LangChain, RAG, PyTorch, Hugging Face, or AI tools.`

---

### Step 4: CV, Links & Motivation (ලේඛන හා ලින්ක්ස්)

1. **CV / Resume Link (Google Drive / Cloud Link)**
   - Type: `URL` (or PDF File Upload via Cloud Storage)
   - Validation: Required. Must be an accessible view link.

2. **Why do you want to join this AI Internship?**
   - Type: `Textarea` (Optional)

---

## 3. TypeScript Interface (`types.ts`)

```typescript
export type CurrentStatus = 'After A/L' | 'Undergraduate' | 'After Degree' | 'Career Change';

export type YesNo = 'YES' | 'NO';

export interface ApplicationFormData {
  // Step 1: Personal
  fullName: string;
  nic: string;
  email: string;
  contactNumber: string;
  cityDistrict: string;

  // Step 2: Academic
  currentStatus: CurrentStatus;
  afterALYear?: string;
  afterALStream?: string;
  undergradDegree?: string;
  undergradUniversity?: string;
  degreeName?: string;
  degreeUniversity?: string;
  
  // Conditional: Only if University is Java Institute
  javaInstituteBatch?: string;
  javaInstituteSemester?: string;

  // Conditional: If Career Change
  careerChangePreviousField?: string;
  careerChangeReason?: string;

  // Step 3: Tech
  hasProgrammingKnowledge: YesNo;
  webDevFrameworks: string[];
  customFrameworks?: string;
  hasAIMLKnowledge: YesNo;
  aimlDetails?: string;

  // Step 4: Documents & Links
  cvResumeLink: string;
  whyJoin?: string;
}

export interface ApplicationRecord extends ApplicationFormData {
  id: string; // e.g. "AI-2026-1042"
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interview_scheduled' | 'accepted' | 'rejected';
  rating?: number;
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
}