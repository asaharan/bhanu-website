import { createFileRoute, Link } from '@tanstack/react-router'
import { ConditionPhotoCard } from '../components/ui/ConditionCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import {
  GUT_CONDITIONS,
  MUSCULOSKELETAL_CONDITIONS,
  PSYCHOLOGICAL_CONDITIONS,
  SKIN_CONDITIONS,
} from '../lib/content'

export const Route = createFileRoute('/conditions')({ component: Conditions })

function Conditions() {
  return (
    <div className="section-pad space-y-20">
      <div>
        <SectionHeading
          title="Conditions We Treat"
          subtitle="Natural, holistic Ayurvedic solutions across four key areas."
        />
      </div>

      <section>
        <SectionHeading
          id="musculoskeletal"
          title="We Specialize In Musculoskeletal Disorders"
          subtitle="Ayurveda offers natural and effective solutions for joint, muscle, bone & spine problems."
        />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {MUSCULOSKELETAL_CONDITIONS.map((item) => (
            <ConditionPhotoCard
              key={item.title}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading id="skin" title="Skin Disorders We Treat" />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {SKIN_CONDITIONS.map((item) => (
            <ConditionPhotoCard
              key={item.title}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          id="psychological"
          title="Psychological Disorders We Address"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PSYCHOLOGICAL_CONDITIONS.map((item) => (
            <div key={item.title} className="card flex items-start gap-4 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light/15 text-primary [&>svg]:h-5 [&>svg]:w-5">
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-black">{item.title}</h3>
                <p className="text-sm text-primary-dark/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          id="gut-digestive"
          title="Gut & Digestive Issues We Treat"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUT_CONDITIONS.map((item) => (
            <div key={item.title} className="card flex items-start gap-4 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light/15 text-primary [&>svg]:h-5 [&>svg]:w-5">
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-black">{item.title}</h3>
                <p className="text-sm text-primary-dark/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link to="/book-a-slot" className="btn-primary">
          Book Consultation
        </Link>
      </div>
    </div>
  )
}
