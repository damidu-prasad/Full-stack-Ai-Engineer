# Ultimate Psychological AI Application Form - Technical Specification

මෙම පෝරමය සාම්ප්‍රදායික "අයදුම්පතක්" නොව, පරිශීලකයාගේ මනස කියවන (Psychological Profiling) සහ ඔවුන්ගේ ගැටලුවලට විසඳුම් ලබා දෙන "Interactive Quiz" එකක් ආකාරයෙන් නිමවා ඇත. 

## 1. UI/UX & Design Psychology (පෙනුම සහ හැඟීම)
*   **Theme:** Deep Slate Dark Theme (`#0F172A` වැනි) සමග Glassmorphism Cards.
*   **Accents:** Electric Blue (`#3B82F6`) සහ Cyan (`#06B6D4`) - මේවායින් තාක්ෂණික සහ අනාගතවාදී හැඟීමක් ලබා දේ.
*   **Progress:** ඉහළින් Progress Bar එකක් තිබිය යුතුය (උදා: `25% Completed - You're doing great!`).
*   **Tone:** සම්මුඛ පරීක්ෂණයක් (Interview) නොව, මිත්‍රශීලී කතාබහක් (Conversational).

---

## 2. Form Flow & Psychological Steps

### Step 1: The Handshake (මූලික සම්බන්ධතාවය - Auto Saves to Google Sheets)
මෙය ඉතා සරලව ආරම්භ වේ. 

| Field | English Label | Sinhala Label | Type |
| :--- | :--- | :--- | :--- |
| **First Name** | First Name | මුල් නම | `Text` |
| **Last Name** | Last Name | වාසගම | `Text` |
| **WhatsApp**| Best WhatsApp Number | ඔබේ WhatsApp අංකය | `Tel` |
| **Email** | Email Address | ඊමේල් ලිපිනය | `Email` |

⚡ **Action:** මෙහි "Next" එබූ වහාම, මෙම දත්ත 4 Google Sheet එකට ලියවේ.

---

### Step 2: The Core Desire (ඔවුන්ගේ සැබෑ අවශ්‍යතාවය හඳුනාගැනීම)
මෙතැනදී අපි ඔවුන්ගේ Status එක (උපාධිධාරීද යන්න) නොව, ඔවුන්ගේ **ඉලක්කය (Goal)** අසමු.

**Question (UI - විශාල කාඩ්පත් 4ක් ලෙස දිස්විය යුතුය):** 
*EN: What is your primary goal right now?*
*SI: ඔබගේ ප්‍රධානතම ඉලක්කය කුමක්ද?*

1.  🎯 **IT ක්ෂේත්‍රයට අඩිතාලමක් දාගන්න** (Build a foundation for an IT Career)
2.  🎓 **Degree එකක් පටන් ගන්න කලින් මූලික දැනුම හදාගන්න** (Prep before starting a Degree)
3.  🚀 **Campus එකේ Assignments / Projects ලේසි කරගන්න** (Make Campus life & projects easier)
4.  💼 **රැකියාවේ වැඩ පහසු කරගෙන ඉක්මන් දියුණුවක් ලබන්න** (Boost Job Productivity & Career growth)

---

### Step 3: Psychological Quiz (මානසික බැඳීම ඇති කිරීම)
ඔවුන්ගේ ගැටලුව අපි තේරුම් ගන්නා බව පෙන්වීමට අසන කෙටි ප්‍රශ්න. (ඔවුන් ක්ලික් කරගෙන යාමට ප්‍රිය කරයි).

**Quiz Q1: AI සහ IT ගැන හිතනකොට ඔබට දැනෙන ලොකුම බාධාව මොකක්ද?**
*(What is your biggest hurdle when thinking about AI & IT?)*
*   [ ] කේතනය (Coding) අමාරුයි කියන බය. (Fear of coding)
*   [ ] හරි පාර පෙන්නන්න කෙනෙක් / ගයිඩන්ස් එකක් නැතිකම. (Lack of guidance)
*   [ ] කාලය කළමනාකරණය කරගන්න අමාරුකම. (Lack of time)
*   [ ] කොහෙන් පටන් ගන්නද කියලා හිතාගන්න බැරිකම. (Don't know where to start)

**Quiz Q2: ඔබ දවසකට කොපමණ කාලයක් ඔබේ අනාගතය වෙනුවෙන් ආයෝජනය කරන්න සූදානම්ද?**
*(How much time can you dedicate daily for your future?)*
*   [ ] පැය 1 - 2
*   [ ] පැය 2 - 4
*   [ ] ඊට වැඩියෙන් පුළුවන්

*(මෙය ඇසීමෙන් ඔවුන් තුළ "මම කැපවෙන්න ඕනේ" කියන මානසිකත්වය (Commitment) ඇති වේ.)*

---

### Step 4: The Background (අධ්‍යාපනික පසුබිම)
දැන් ඔවුන් පෝරමය පිරවීමට හොඳටම සම්බන්ධ වී (invested) ඇත. දැන් අපිට ඔවුන්ගේ පසුබිම ඇසිය හැක.

**Question:** දැනට ඔබ ඉන්නේ කොතැනද? (Where are you right now in your journey?)
*   [ ] උසස් පෙළින් පසු (After A/L)
*   [ ] විශ්වවිද්‍යාලයක / ආයතනයක (At a University/Institute)
*   [ ] රැකියාවක (Working)

**⚡ Conditional Logic (මෙහිදී මතුවන Fields):**

**If "After A/L":**
*   **A/L Year:** 2022, 2023, 2024, 2025
*   **Stream:** Maths, Bio, Tech, Arts, Commerce

**If "At a University/Institute" OR "Working":**
*   **Select your University / Institute (Searchable Dropdown):**
    *(Developer NOTE: Use a searchable select component like `react-select` for this massive list)*
    *   **State Universities:** University of Colombo, University of Peradeniya, University of Moratuwa, University of Kelaniya, University of Sri Jayewardenepura, University of Ruhuna, Rajarata University, Wayamba University, Sabaragamuwa University, University of Jaffna, Eastern University, South Eastern University, Uva Wellassa University, University of the Visual & Performing Arts, Gampaha Wickramarachchi University, University of Vavuniya, Open University of Sri Lanka (OUSL).
    *   **Private Institutes / Campuses:** SLIIT, NSBM Green University, IIT (Informatics Institute of Technology), NIBM, CINEC Campus, KDU (General Sir John Kotelawala Defence University), Java Institute for Advanced Technology, ICBT Campus, BCAS Campus, SLTC Research University, ESOFT Metro Campus, Horizon Campus, Saegis Campus, APIIT Sri Lanka, KIU (Kaatsu International University), Aquinas College, BMS (Business Management School), RIC (Royal Institute of Colombo), EAM CRA, Other.
*   **⚡ If "Java Institute" is selected:**
    *   **Batch:** (Text Input)
*   **If "Other" is selected:**
    *   **Type your Institute name:** (Text Input)

---

### Step 5: The Final Hook
අවසාන ප්‍රශ්නය.
*   **Question:** ඇයි අපි ඔබව මේ ප්‍රෝග්‍රෑම් එකට තෝරගන්න ඕනේ? (වචන කිහිපයකින් ලියන්න)
    *(Why should we select you?)* -> `Textarea`

**Final CTA Button (Submit වෙනුවට):** 
**"Yes! Unlock My AI Future"** (ඔව්! මගේ AI ගමන අරඹන්න)

---

## 3. TypeScript Database Schema (`types.ts`)

```typescript
export type PrimaryGoal = 
  | 'foundation_for_it' 
  | 'prep_for_degree' 
  | 'easier_campus_life' 
  | 'boost_job_productivity';

export type BiggestHurdle = 'fear_of_coding' | 'lack_of_guidance' | 'lack_of_time' | 'dont_know_where_to_start';
export type TimeCommitment = '1-2_hours' | '2-4_hours' | 'more_than_4';
export type CurrentStage = 'after_al' | 'university' | 'working';

export interface PsychologicalFormData {
  // Step 1: Lead
  firstName: string;
  lastName: string;
  whatsapp: string;
  email: string;

  // Step 2: The Core Desire
  primaryGoal: PrimaryGoal;

  // Step 3: Quiz
  biggestHurdle: BiggestHurdle;
  timeCommitment: TimeCommitment;

  // Step 4: Background
  currentStage: CurrentStage;
  
  // Conditional: After A/L
  alYear?: string;
  alStream?: string;

  // Conditional: Uni / Working
  universityOrInstitute?: string;
  javaInstituteBatch?: string; // If university === 'Java Institute for Advanced Technology'
  customInstituteName?: string; // If university === 'Other'

  // Step 5: Final Hook
  whySelectYou: string;
}
```