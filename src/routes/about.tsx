import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionHeading } from '../components/ui/SectionHeading'

export const Route = createFileRoute('/about')({ component: About })

const CLINICAL_FOCUS = [
  'Lifestyle disorders',
  'Prakriti analysis',
  'Musculoskeletal disorders',
  'Skin disorders',
  'Neurological disorders',
  'Stress and emotional wellbeing',
  'Depression management',
  'Digestive and metabolic health',
  'Personalized preventive healthcare',
]

const APPROACH_QUESTIONS = [
  'Why did this problem develop?',
  'Why are you more prone to it?',
  'What factors are maintaining it?',
  'What changes can help your body and lifestyle move towards better health?',
]

const PHILOSOPHY_VALUES = [
  {
    title: 'Compassion',
    description: 'Every patient deserves to be heard and understood.',
  },
  {
    title: 'Patient-centred care',
    description: 'Your concerns, goals and individual circumstances matter.',
  },
  {
    title: 'Ethical practice',
    description:
      'Healthcare should be guided by honesty, responsibility and professional ethics.',
  },
  {
    title: 'Classical Ayurveda',
    description:
      'We respect the foundational principles of Ayurveda and strive to apply them appropriately in clinical practice.',
  },
  {
    title: 'Evidence-informed healthcare',
    description:
      'Traditional knowledge should be approached responsibly alongside available scientific evidence and appropriate modern medical understanding.',
  },
]

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  )
}

function About() {
  return (
    <div className="section-pad">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold text-black sm:text-4xl">
          Ayurveda, Personalized for You
        </h1>
        <p className="mt-4 text-primary-dark/80">
          <strong>AyurGarima</strong> was created with a simple vision &mdash;
          to make authentic, personalized Ayurvedic healthcare accessible and
          within reach of everyone. We believe that every individual is
          different: your Prakriti, lifestyle, environment, habits, mental
          wellbeing, diet and life experiences all influence your health, so
          the same treatment cannot be expected to work equally for everyone.
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <img
          src="/images/bhanu-portrait.jpg"
          alt="Dr. Bhanu K Panchal"
          className="mx-auto h-64 w-64 rounded-full border-4 border-primary/15 object-cover lg:mx-0"
        />
        <div>
          <h2 className="font-display text-3xl font-semibold text-black sm:text-4xl">
            Dr. Bhanu K. Panchal
          </h2>
          <p className="mt-1 text-primary-dark/60">
            B.A.M.S., M.D. (Kayachikitsa)
          </p>

          <p className="mt-6 text-primary-dark/80">
            Dr. Bhanu K. Panchal is an Ayurvedic physician with{' '}
            <strong>5+ years of clinical experience</strong> and experience
            with <strong>1,000+ patients</strong>. His clinical approach
            combines the principles of classical Ayurveda with a modern
            understanding of disease, lifestyle and evidence-based healthcare.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/book-a-slot" className="btn-primary">
              Book Consultation
            </Link>
            <Link to="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading title="Areas of Clinical Focus" />
        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {CLINICAL_FOCUS.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 text-primary-dark/80"
            >
              <CheckIcon />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          title="Find the Root, Treat the Individual"
          subtitle="Treatment does not begin simply by asking, “What disease do you have?”"
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-primary-dark/80">
          <p>We try to understand:</p>
          <ul className="space-y-2">
            {APPROACH_QUESTIONS.map((question) => (
              <li key={question} className="flex items-start gap-2">
                <CheckIcon />
                {question}
              </li>
            ))}
          </ul>
          <p>
            We believe that deep history-taking is an important part of
            understanding the patient. Your symptoms, Prakriti, diet, sleep,
            daily routine, stress, habits and other relevant factors are
            considered to develop a more complete picture of your health.
            Based on this understanding, we work towards a personalized
            treatment plan, which may include appropriate Ayurvedic
            medicines, diet modification, lifestyle changes and other
            suitable Ayurvedic approaches.
          </p>
          <p>
            Your Prakriti can help us understand individual tendencies and
            why certain people may be more susceptible to particular health
            problems or may respond differently to lifestyle and treatment
            approaches. Instead of following a one-size-fits-all approach,
            AyurGarima aims to make Ayurveda more individualized, practical
            and understandable.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading title="Our Philosophy" />
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {PHILOSOPHY_VALUES.map((value) => (
            <div key={value.title}>
              <h3 className="font-semibold text-black">{value.title}</h3>
              <p className="mt-1 text-sm text-primary-dark/70">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          title="Our Vision"
          subtitle="Bringing Ayurveda closer to people"
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-primary-dark/80">
          <p>
            We want Ayurvedic healthcare to be accessible, understandable and
            within reach of everyone, while preserving the depth and wisdom
            of classical Ayurveda. Whether your goal is to better understand
            your health, improve your lifestyle, manage a chronic concern, or
            work towards preventive wellbeing, AyurGarima aims to provide a
            personalized and patient-centred Ayurvedic healthcare experience.
          </p>
          <blockquote className="rounded-2xl bg-primary/5 p-6 text-primary-dark/90">
            &ldquo;I believe healthcare should begin with understanding the
            person, not just identifying the disease. Every individual has a
            unique Prakriti, lifestyle and set of circumstances. My aim
            through AyurGarima is to understand these individual
            differences, identify the possible root causes of health
            problems, and guide each person towards a personalized path to
            better health through Ayurveda, appropriate diet and sustainable
            lifestyle changes.&rdquo;
            <footer className="mt-3 text-sm font-medium text-primary-dark/70">
              &mdash; Dr. Bhanu K. Panchal
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-primary-light/10 p-8 text-center sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-black">
          Understand Your Body. Understand Your Prakriti. Transform Your
          Health.
        </h2>
        <p className="mt-2 text-primary-dark/75">
          Your health is personal. Your approach to health should be personal
          too.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link to="/book-a-slot" className="btn-primary">
            Start Your AyurGarima Journey Today
          </Link>
        </div>
      </div>
    </div>
  )
}
