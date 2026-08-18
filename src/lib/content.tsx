import {
  ArthritisIcon,
  CounsellingIcon,
  HolisticIcon,
  IntestineIcon,
  KneeIcon,
  LiverIcon,
  PersonIcon,
  PrakritiIcon,
  RootCauseIcon,
  RunningIcon,
  SciaticaIcon,
  ShoulderIcon,
  SlipDiscIcon,
  SpineIcon,
  StomachIcon,
  SustainableIcon,
  TreatmentPlanIcon,
} from '../components/icons'

export const APPROACH_STEPS = [
  {
    icon: <PrakritiIcon />,
    title: 'Prakriti Analysis',
    description:
      'Know your body type (Vata, Pitta, Kapha) through expert analysis.',
  },
  {
    icon: <RootCauseIcon />,
    title: 'Root Cause Analysis',
    description: 'We identify the real cause of your health concerns.',
  },
  {
    icon: <TreatmentPlanIcon />,
    title: 'Personalized Plan',
    description: 'Diet, lifestyle, herbs & therapies curated just for you.',
  },
  {
    icon: <HolisticIcon />,
    title: 'Holistic Healing',
    description: 'Treating body, mind & emotions for long-term wellness.',
  },
  {
    icon: <SustainableIcon />,
    title: 'Sustainable Health',
    description: 'Prevent recurrence and achieve balanced well-being.',
  },
]

export const FEATURE_HIGHLIGHTS = [
  { icon: <PrakritiIcon />, title: 'Prakriti Analysis' },
  { icon: <RootCauseIcon />, title: 'Root Cause Healing' },
  { icon: <TreatmentPlanIcon />, title: 'Personalized Treatment Plan' },
  { icon: <HolisticIcon />, title: 'Holistic Wellness' },
  { icon: <CounsellingIcon />, title: 'Counselling Support' },
]

export interface Service {
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
}

export const SERVICES: Service[] = [
  {
    slug: 'prakriti-analysis',
    title: 'Prakriti Analysis',
    description:
      'Detailed assessment of your body-mind constitution to understand your unique Prakriti.',
    longDescription:
      'Every individual has a unique mind-body constitution (Prakriti) made of Vata, Pitta, and Kapha. Through a detailed consultation, we assess your Prakriti to understand your natural tendencies, susceptibilities, and the foundation for every recommendation that follows.',
    image: '/images/service-prakriti-analysis.webp',
  },
  {
    slug: 'diet-lifestyle-plan',
    title: 'Personalized Diet & Lifestyle Plan',
    description:
      'Customized diet, daily routine & lifestyle according to your Prakriti and imbalance.',
    longDescription:
      'Food and daily routine are medicine in Ayurveda. We design a diet and lifestyle plan tailored to your constitution and current imbalance — practical, sustainable, and rooted in classical Ayurvedic principles.',
    image: '/images/service-diet-plan.webp',
  },
  {
    slug: 'treatment-plans',
    title: 'Treatment Plans',
    description:
      'Ayurvedic medicines, herbs, therapies and detox plans for long lasting results.',
    longDescription:
      'Combining classical herbal formulations, therapies, and detox protocols, our treatment plans address the root cause of your condition rather than just the symptoms — built for lasting results.',
    image: '/images/service-treatment-plans.webp',
  },
  {
    slug: 'panchakarma-therapies',
    title: 'Panchakarma Therapies',
    description:
      'Detoxification therapies to cleanse toxins and restore dosha balance.',
    longDescription:
      "Panchakarma is Ayurveda's signature detoxification system — a set of therapeutic procedures that cleanse accumulated toxins (Ama) from the body and restore balance between the three doshas.",
    image: '/images/service-panchakarma.webp',
  },
  {
    slug: 'counselling-sessions',
    title: 'Counselling Sessions',
    description:
      'Expert psychological counselling for mental wellness and emotional balance.',
    longDescription:
      'Physical health and mental well-being are deeply connected. Our counselling sessions offer a supportive space to work through stress, anxiety, and emotional challenges alongside your physical treatment.',
    image: '/images/service-counselling.webp',
  },
]

export const MUSCULOSKELETAL_CONDITIONS = [
  { icon: <SpineIcon />, title: 'Cervical Spondylosis' },
  { icon: <SpineIcon />, title: 'Lower Back Pain' },
  { icon: <KneeIcon />, title: 'Knee Pain / Osteoarthritis' },
  { icon: <ShoulderIcon />, title: 'Frozen Shoulder' },
  { icon: <SciaticaIcon />, title: 'Sciatica' },
  { icon: <SlipDiscIcon />, title: 'Slip Disc' },
  { icon: <ArthritisIcon />, title: 'Arthritis' },
  { icon: <RunningIcon />, title: 'Sports Injury' },
]

export const SKIN_CONDITIONS = [
  {
    image: '/images/condition-psoriasis.webp',
    title: 'Psoriasis',
    description:
      'Autoimmune condition causing red, scaly patches, silvery white scales.',
  },
  {
    image: '/images/condition-eczema.webp',
    title: 'Eczema',
    description: 'Itchy, inflamed, dry and sensitive skin.',
  },
  {
    image: '/images/condition-acne.webp',
    title: 'Acne / Pimples',
    description: 'Clogged pores causing acne and inflammation.',
  },
  {
    image: '/images/condition-fungal-infection.webp',
    title: 'Fungal Infection',
    description: 'Itching, redness, ring-like patches on skin.',
  },
  {
    image: '/images/condition-vitiligo.webp',
    title: 'Vitiligo',
    description: 'Loss of skin color in patches.',
  },
  {
    image: '/images/condition-urticaria.webp',
    title: 'Urticaria',
    description: 'Hives or welts due to allergic reactions.',
  },
  {
    image: '/images/condition-dandruff.webp',
    title: 'Dandruff / Seborrheic Dermatitis',
    description: 'Flaky, itchy scalp with irritation.',
  },
]

export const PSYCHOLOGICAL_CONDITIONS = [
  { title: 'Stress', description: 'Chronic stress affecting mind & body.' },
  {
    title: 'Anxiety Disorders',
    description: 'Excessive worry, restlessness, irritability.',
  },
  {
    title: 'Depression',
    description: 'Persistent sadness, lack of motivation, low energy.',
  },
  { title: 'Insomnia', description: 'Difficulty falling or staying asleep.' },
  {
    title: 'Panic Disorder',
    description: 'Sudden episodes of fear & palpitations.',
  },
  { title: 'OCD', description: 'Intrusive thoughts and repetitive behaviors.' },
  {
    title: 'ADHD',
    description: 'Difficulty in attention, focus & impulse control.',
  },
  {
    title: 'Bipolar Disorder',
    description: 'Mood swings between highs & lows.',
  },
  {
    title: 'Post Traumatic Stress (PTSD)',
    description: 'Emotional distress after trauma.',
  },
  {
    title: 'Social Anxiety',
    description: 'Fear in social situations & low confidence.',
  },
].map((item) => ({ ...item, icon: <PersonIcon /> }))

export const GUT_CONDITIONS = [
  {
    icon: <IntestineIcon />,
    title: 'IBS (Irritable Bowel Syndrome)',
    description: 'Abdominal pain, bloating, gas, irregular bowel movements.',
  },
  {
    icon: <LiverIcon />,
    title: 'Fatty Liver',
    description:
      'Fat accumulation in liver leading to fatigue & digestion issues.',
  },
  {
    icon: <StomachIcon />,
    title: 'GERD',
    description: 'Acid reflux causing heartburn & discomfort.',
  },
  {
    icon: <StomachIcon />,
    title: 'Gastritis',
    description: 'Inflammation of stomach lining causing pain & indigestion.',
  },
  {
    icon: <IntestineIcon />,
    title: 'Chronic Constipation',
    description: 'Infrequent bowel movements, bloating & heaviness.',
  },
]

export const WHY_CHOOSE_US = [
  'Authentic Ayurvedic Treatments',
  'Experienced Ayurvedic Doctors',
  'Personalized Care & Guidance',
  'Holistic Approach to Healing',
]
