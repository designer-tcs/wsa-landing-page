import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  MapPin,
  Brain,
  Dumbbell,
  HeartHandshake,
  Palette,
  Mic2,
  Compass,
  Trophy,
  Users,
  Cpu,
  MonitorPlay,
  BookOpen,
  Trees,
  Navigation,
} from "lucide-react";
import { CallbackForm, VisitForm } from "@/components/landing/LeadForm";
import { LeadCta as Cta } from "@/components/landing/LeadFormModal";
import { PHONE_DISPLAY, PHONE_TEL } from "./__root";

import heroImg from "@/assets/photos/home-01-hero.webp";
import thinkImg from "@/assets/photos/home-02-think.webp";
import buildImg from "@/assets/photos/home-03-build.webp";
import belongImg from "@/assets/photos/home-04-belong.webp";
import artRoom from "@/assets/glimpses/The_Art_Room.webp";
import firstSolo from "@/assets/glimpses/A_First_Solo.webp";
import handsAtWork from "@/assets/glimpses/Hands_at_Work.webp";
import onTheField from "@/assets/glimpses/On_the_Field.webp";
import experiment from "@/assets/glimpses/A_Small_Experiment.webp";
import roboticsLab from "@/assets/photos/home-09-robotics.webp";
import campusGreen from "@/assets/photos/home-09-campus.webp";
import closingCircle from "@/assets/glimpses/Closing_Circle.webp";
import classroomTeacher from "@/assets/photos/home-10-classroom.webp";
import campusAerial from "@/assets/photos/campus-aerial.jpg";
import quietMorning from "@/assets/glimpses/A_Quiet_morning.webp";
import readingCorner from "@/assets/glimpses/The_Reading_Corner.webp";
import secondaryImg from "@/assets/photos/home-07-secondary.webp";
import swimImg from "@/assets/photos/home-08-swim.webp";
import campusA from "@/assets/photos/life-01-hero.webp";
import campusB from "@/assets/photos/curr-01-hero.webp";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Wellsprings+Academy+Mugalur+Sarjapura+Bengaluru+562125";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      {
        title: "Wellsprings Academy — Colour Variant | CBSE School in Sarjapur",
      },
      {
        name: "description",
        content:
          "A CBSE school in Sarjapur, Bengaluru where children think, build and belong. Nursery to Grade 9, 15:1 ratio, 10-acre campus. Book a campus visit.",
      },
      {
        property: "og:title",
        content: "A CBSE School in Sarjapur Where Children Think, Build and Belong",
      },
      {
        property: "og:description",
        content:
          "Nursery to Grade 9 · CBSE curriculum · Admissions open for AY 2027-28. Spacious classrooms, smart boards, innovation and robotics, 10-acre campus.",
      },
    ],
  }),
  component: LandingV2,
});

/* ---------- small building blocks ---------- */

function Eyebrow({ children, tone = "ink" }: { children: React.ReactNode; tone?: string }) {
  return (
    <p
      className="font-mono text-[11px] uppercase tracking-[0.24em]"
      style={{ color: tone === "paper" ? "rgba(251,248,241,0.75)" : "var(--grey-600)" }}
    >
      {children}
    </p>
  );
}

function Section({
  id,
  children,
  className = "",
  style,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-20 md:px-8 md:py-28 ${className}`} style={style}>
      <div className="mx-auto w-full max-w-[1320px]">{children}</div>
    </section>
  );
}

/* ---------- 1. HERO ---------- */

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[var(--sage-1000)]">
      <img
        src={heroImg}
        alt="Wellsprings Academy students in class on the Sarjapur campus"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(15,33,24,0.94) 0%, rgba(15,33,24,0.86) 46%, rgba(15,33,24,0.55) 100%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1320px] gap-12 px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-[var(--sun-400)]/50 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--sun-300)]">
            <span>Nursery – Grade 9</span>
            <span className="text-[var(--sun-400)]/50">·</span>
            <span>CBSE</span>
            <span className="text-[var(--sun-400)]/50">·</span>
            <span>Admissions open AY 2027-28</span>
          </div>

          <h1 className="mt-7 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.04] text-[var(--ws-paper)]">
            A CBSE school in Sarjapur where children{" "}
            <span className="text-[var(--coral-400)]">think</span>,{" "}
            <span className="text-[var(--sun-400)]">build</span> and{" "}
            <span className="text-[var(--sage-400)]">belong</span>.
          </h1>

          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.7] text-[var(--ws-paper)]/85">
            A learning environment where children are encouraged to ask questions, create with
            confidence and grow with care.
          </p>

        </div>

        {/* Form card */}
        <div className="lg:pl-6">
          <div className="border border-[var(--grey-300)] bg-[var(--ws-paper)] p-6 shadow-[0_40px_90px_-30px_rgba(10,13,17,0.7)] md:p-8">
            <h2 className="text-2xl md:text-3xl">Let's start with a conversation.</h2>
            <div className="mt-6">
              <CallbackForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. WHY WELLSPRINGS ---------- */

const PILLARS = [
  {
    key: "Think",
    icon: Brain,
    line: "Question, understand and apply.",
    color: "var(--coral-600)",
    tint: "var(--coral-200)",
    img: thinkImg,
  },
  {
    key: "Build",
    icon: Dumbbell,
    line: "Strength, grit and a life built beyond books.",
    color: "var(--sun-700)",
    tint: "var(--sun-200)",
    img: buildImg,
  },
  {
    key: "Belong",
    icon: HeartHandshake,
    line: "Together, more becomes possible.",
    color: "var(--sage-700)",
    tint: "var(--sage-200)",
    img: belongImg,
  },
];

function Why() {
  return (
    <Section id="why" className="bg-[var(--ws-paper)]">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Eyebrow>Why Wellsprings</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.08]">
            What will be different for my child here?
          </h2>
        </div>
        <div className="flex flex-col justify-end">
          <p className="max-w-[62ch] text-[17px] leading-[1.75] text-[var(--grey-800)]">
            At our school, your child will actively participate in rigorous academics, competitive
            sports and a wide range of co-curricular activities. The daily routine is designed to
            build competence across disciplines, teamwork, leadership and creativity, supported by
            well-equipped classrooms and labs, sports facilities and dedicated spaces for the arts
            and clubs. Study, practice and exploration sit together — so parents see tangible
            outcomes: sharper problem-solving, confident communication, strong collaboration and a
            well-rounded set of skills that carries into the real world.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-px border border-[var(--sage-300)] bg-[var(--sage-300)]">
            {[
              { n: "15:1", l: "Student-teacher ratio" },
              { n: "10", l: "Acre campus" },
              { n: "CBSE", l: "Curriculum" },

            ].map((s) => (
              <div key={s.l} className="bg-[var(--ws-paper)] px-4 py-5">
                <p className="font-serif text-3xl leading-none">{s.n}</p>
                <p className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-[var(--grey-600)]">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-px border border-[var(--sage-300)] bg-[var(--sage-300)] md:grid-cols-3">
        {PILLARS.map(({ key, icon: Icon, line, color, tint, img }) => (
          <article key={key} className="group bg-[var(--ws-paper)]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={img}
                alt={`${key} at Wellsprings Academy`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center"
                style={{ background: color }}
              >
                <Icon size={19} strokeWidth={1.8} color="#fff" />
              </span>
            </div>
            <div className="p-6" style={{ borderTop: `3px solid ${color}` }}>
              <p
                className="font-mono text-[12px] uppercase tracking-[0.26em]"
                style={{ color }}
              >
                {key}
              </p>
              <p className="mt-3 font-serif text-2xl leading-snug">{line}</p>
              <span
                className="mt-4 inline-block h-1 w-10"
                style={{ background: tint }}
                aria-hidden
              />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Cta form="visit" variant="outline">
          See Wellsprings in Person
        </Cta>
      </div>
    </Section>
  );
}

/* ---------- 3. ACADEMICS ---------- */



const STAGES = [
  {
    name: "Foundation",
    grades: "Nursery – Grade 2",
    img: quietMorning,
    color: "var(--coral-600)",
    c: "Learning through play, stories, sound and movement. The years where curiosity, language and comfort in school are built.",
  },
  {
    name: "Preparatory",
    grades: "Grade 3 – Grade 5",
    img: readingCorner,
    color: "var(--sun-700)",
    c: "Reading, numbers and reasoning become steady. Children begin to work independently and explain their thinking.",
  },
  {
    name: "Middle",
    grades: "Grade 6 – Grade 8",
    img: experiment,
    color: "var(--sage-700)",
    c: "Subjects deepen, with labs, projects and discussion. Children learn to question, connect ideas and work in teams.",
  },
  {
    name: "Secondary",
    grades: "Grade 9 – Grade 10",
    img: secondaryImg,
    color: "var(--sage-1000)",
    c: "Focused board preparation with regular practice and feedback, alongside sports, arts and leadership.",
  },
];

function Academics() {
  return (
    <Section id="academics" className="bg-[var(--v2-blush)]">
      <div className="max-w-[62ch]">
        <Eyebrow>Academics</Eyebrow>
        <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.1]">
          A CBSE education with purpose, designed for the whole child
        </h2>
        <p className="mt-4 text-[16.5px] leading-[1.75] text-[var(--grey-800)]">
          Practicing brilliance at every stage
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((s) => (
          <article key={s.name}>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={s.img}
                alt={`${s.name} stage at Wellsprings Academy`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="pt-5" style={{ borderTop: `3px solid ${s.color}` }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--grey-600)]">
                {s.grades}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-snug">{s.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--grey-700)]">{s.c}</p>
            </div>
          </article>
        ))}
      </div>


      <div className="mt-14 flex flex-col items-start justify-between gap-6 bg-[var(--sage-1000)] px-6 py-10 md:flex-row md:items-center md:px-12">
        <div>
          <p className="max-w-[34ch] font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-tight text-[var(--ws-paper)]">
            Check open seats for 2026&ndash;27.
          </p>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[var(--ws-paper)]/70">
            Tell us your child&rsquo;s grade and we&rsquo;ll call you back with the seats available at that stage.
          </p>
        </div>
        <Cta form="callback" variant="paper">
          Request a call
        </Cta>
      </div>

    </Section>
  );
}

/* ---------- 4. BEYOND THE CLASSROOM ---------- */

const BEYOND = [
  {
    k: "Create",
    icon: Palette,
    color: "var(--coral-600)",
    items: ["Creative Arts Studio", "Art Lab", "Skill & Innovation Lab"],
    img: artRoom,
  },
  {
    k: "Perform",
    icon: Mic2,
    color: "var(--sun-700)",
    items: ["Music & Performance Studio", "Dance & Movement Studio", "Theatre & Expression Studio"],
    img: firstSolo,
  },
  {
    k: "Explore",
    icon: Compass,
    color: "var(--sage-700)",
    items: ["Interest-based clubs", "Public speaking", "Hands-on making"],
    img: handsAtWork,
  },
];

function Beyond() {
  return (
    <Section id="beyond">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>Beyond the classroom</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.1]">
            Some learning needs more than a classroom.
          </h2>
        </div>
        <p className="self-end text-[16.5px] leading-[1.75] text-[var(--grey-800)]">
          Confidence may begin on a stage. Teamwork may begin on a field. A new interest may begin
          simply because a child was given the chance to try. Wellsprings brings these experiences
          into the school day through dedicated creative, performance and skill-based spaces.
        </p>
      </div>


      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {BEYOND.map(({ k, icon: Icon, color, items, img }) => (
          <article key={k} className="group relative isolate overflow-hidden bg-[var(--sage-1000)]">
            <img
              src={img}
              alt={`${k} spaces at Wellsprings Academy`}
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(44,15,11,0.15) 0%, rgba(44,15,11,0.9) 65%)",
              }}
            />
            <div className="relative flex min-h-[24rem] flex-col justify-end p-6">
              <span
                className="mb-4 inline-flex h-10 w-10 items-center justify-center"
                style={{ background: color }}
              >
                <Icon size={18} strokeWidth={1.8} color="#fff" />
              </span>
              <h3 className="font-mono text-[13px] uppercase tracking-[0.26em] text-[var(--ws-paper)]">
                {k}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {items.map((i) => (
                  <li key={i} className="text-[15px] text-[var(--ws-paper)]/85">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Cta form="visit" variant="outline">
          Explore Wellsprings on Campus
        </Cta>
      </div>
    </Section>
  );
}

/* ---------- 5. SPORTS ---------- */

const SPORTS = [
  "Football",
  "Cricket",
  "Basketball",
  "Volleyball",
  "Throwball",
  "Swimming",
  "Taekwondo",
  "Gymnastics",
  "Padel",
  "Tennis",
  "Yoga",
  "Chess",
];

function Sports() {
  return (
    <Section id="sports" className="bg-[var(--coral-1000)] text-[var(--ws-paper)]">
      <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Eyebrow tone="paper">Sports</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.1] text-[var(--ws-paper)]">
            There is more than one way to find what you’re good at.
          </h2>
        </div>
        <p className="text-[16.5px] leading-[1.75] text-[var(--ws-paper)]/80">
          Some children find their confidence on the field. Others discover it through the quiet
          discipline of a swim lane, a yoga mat or a chessboard, and at Wellsprings, every one of
          those paths is treated as sport.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-px bg-[var(--ws-paper)]/15 sm:grid-cols-3 lg:grid-cols-6">
        {SPORTS.map((s) => (
          <li
            key={s}
            className="flex min-w-0 items-center gap-2.5 bg-[var(--coral-1000)] px-4 py-5 text-[15px] text-[var(--ws-paper)]/90"
          >
            <Trophy size={14} strokeWidth={1.8} className="shrink-0 text-[var(--sun-700)]" />
            <span className="truncate">{s}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[onTheField, swimImg].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Wellsprings Academy students playing sport"
            className="h-56 w-full object-cover md:h-[22rem]"
          />
        ))}
      </div>

      <div className="mt-10">
        <Cta form="visit" variant="paper">
          Book a Campus Visit
        </Cta>
      </div>
    </Section>
  );
}

/* ---------- 6. CAMPUS ---------- */

const CAMPUS_LABELS = [
  { icon: MonitorPlay, l: "Tech-enabled smart classrooms" },
  { icon: Users, l: "15:1 student-teacher ratio" },
  { icon: BookOpen, l: "Competency-based CBSE curriculum" },
  { icon: Trophy, l: "Full-spectrum sports program" },
  { icon: Palette, l: "Creative & performance studios" },
  { icon: Cpu, l: "Innovation & robotics lab" },
  { icon: Trees, l: "Open, green outdoor campus" },
  { icon: Compass, l: "Interest-based clubs" },
  { icon: Mic2, l: "Public speaking & life skills" },
];

function Campus() {
  return (
    <Section id="campus" className="bg-[var(--v2-mist)]">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <p className="order-2 text-[16.5px] leading-[1.75] text-[var(--grey-800)] lg:order-1">
          A school day moves through classrooms, creative studios, sports spaces and places built for
          exploration. The Wellsprings campus brings academics, co-curricular learning and sport
          together in one environment, giving children room to learn in more than one way.
        </p>
        <div className="order-1 lg:order-2">
          <Eyebrow>The campus</Eyebrow>
          <h2 className="mt-4 flex flex-wrap items-baseline gap-x-4">
            <span className="font-serif text-[clamp(3.5rem,9vw,7rem)] leading-none text-[var(--coral-600)]">
              10
            </span>
            <span className="text-[clamp(1.7rem,3.2vw,2.7rem)] leading-tight">
              acres. Endless possibilities.
            </span>
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <img
          src={campusA}
          alt="Wellsprings Academy campus"
          className="h-56 w-full object-cover md:h-72"
        />
        <img
          src={campusB}
          alt="A learning space at Wellsprings Academy"
          className="h-56 w-full object-cover md:h-72"
        />
        <img
          src={campusGreen}
          alt="Green open campus and playing field at Wellsprings Academy"
          className="h-56 w-full object-cover md:h-72"
        />
      </div>

      <ul className="mt-10 grid gap-px bg-[var(--sage-300)] sm:grid-cols-2 lg:grid-cols-3">
        {CAMPUS_LABELS.map(({ icon: Icon, l }) => (
          <li
            key={l}
            className="flex min-w-0 items-center gap-3 bg-[var(--ws-paper)] px-5 py-5"
          >
            <Icon size={18} strokeWidth={1.7} className="shrink-0 text-[var(--sage-700)]" />
            <span className="text-[15px]">{l}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Cta form="visit" variant="solid">
          Schedule a Campus Tour
        </Cta>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 border border-[var(--ws-ink)] px-6 py-4 text-sm font-medium transition-colors hover:bg-[var(--ws-ink)] hover:text-[var(--ws-paper)]"
        >
          <Phone size={15} strokeWidth={1.8} /> Call: {PHONE_DISPLAY}
        </a>
      </div>
    </Section>
  );
}


/* ---------- 7. QUICK FACTS ---------- */

const QUICK_FACTS = [
  {
    img: classroomTeacher,
    label: "15:1 Student-Teacher Ratio",
    copy: "Small groups, so effort, progress and mood are noticed early — and acted on.",
  },
  {
    img: campusAerial,
    label: "10-Acre Campus",
    copy: "Open ground, shaded corners and space to move between one lesson and the next.",
  },
  {
    img: onTheField,
    label: "12+ Sports on Offer",
    copy: "From athletics and football to the courts — movement is part of the day, not an add-on.",
  },
  {
    img: roboticsLab,
    label: "5 Labs & Studios",
    copy: "Science, computers, STEM, art and music rooms children use every week.",
  },
  {
    img: readingCorner,
    label: "Nursery to Grade 9",
    copy: "One continuous CBSE journey from the early years through secondary school.",
  },
];

function QuickFacts() {
  return (
    <Section id="facts" className="bg-[var(--v2-blush)]">
      <h2 className="text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1]">
        Quick facts about Wellsprings
      </h2>
      <div className="mt-10 -mx-6 flex gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:px-0">
        {QUICK_FACTS.map((f) => (
          <article key={f.label} className="w-[280px] shrink-0 md:w-[320px]">
            <img src={f.img} alt={f.label} className="h-56 w-full object-cover" />
            <p className="mt-5 font-serif text-xl">{f.label}</p>
            <p className="mt-2 text-[15px] leading-[1.7] text-[var(--grey-700)]">{f.copy}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- PARENT TRUST (hidden for now) ---------- */

function Trust() {

  return (
    <Section id="trust" className="bg-[var(--ws-paper)]">
      <div className="grid items-center gap-10 border border-[var(--sage-300)] bg-[var(--ws-paper)] p-6 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

        <div>
          <Eyebrow>For parents</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1]">
            Every child should be known, not just enrolled.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[16.5px] leading-[1.75] text-[var(--grey-800)]">
            A 15:1 student-teacher ratio supports an environment where teachers have greater
            opportunity to observe, guide and respond to individual learning needs.
          </p>
          <div className="mt-8">
            <Cta form="visit" variant="outline">
              Meet Us on Campus
            </Cta>
          </div>
        </div>

        {/* 15:1 infographic */}
        <div className="border border-[var(--sage-300)] bg-[var(--v2-mist)] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--grey-600)]">
            One classroom, illustrated
          </p>
          <div className="mt-5 flex items-start gap-6">
            <div className="grid grid-cols-5 gap-2.5">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className="block h-6 w-6 rounded-full"
                  style={{ background: "var(--sage-400)" }}
                  aria-hidden
                />
              ))}
            </div>
            <div className="flex flex-col items-center">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: "var(--coral-600)" }}
                aria-hidden
              >
                <Users size={17} strokeWidth={1.8} color="#fff" />
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--grey-700)]">
                1 teacher
              </span>
            </div>
          </div>
          <p className="mt-6 font-serif text-3xl">15 children · 1 teacher</p>
          <p className="mt-2 text-sm text-[var(--grey-700)]">
            Small enough that progress, effort and mood are noticed — and acted on.
          </p>
          <img
            src={closingCircle}
            alt="A teacher with a small group of Wellsprings students"
            className="mt-6 h-40 w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}

/* ---------- 8. ADMISSIONS + LOCATION ---------- */

function Admissions() {
  return (
    <Section id="visit" className="bg-[var(--sage-1000)] text-[var(--ws-paper)]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Eyebrow tone="paper">Admissions</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] text-[var(--ws-paper)]">
            Admissions open for AY 2027-28
          </h2>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.24em] text-[var(--sun-300)]">
            Nursery to Grade 9
          </p>
          <p className="mt-6 max-w-[52ch] text-[16.5px] leading-[1.75] text-[var(--ws-paper)]/85">
            We're here to answer your questions and welcome you to our community.

          </p>


          <div className="mt-8 border-t border-[var(--ws-paper)]/20 pt-6">
            <p className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--ws-paper)]/85">
              <MapPin size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-[var(--sage-400)]" />
              <span>
                <span className="block font-serif text-xl text-[var(--ws-paper)]">
                  Wellsprings Academy
                </span>
                No. 146/1, 2, 3, Mugalur Village, Sarjapura – Chikka Thirupathi Main Road,
                <br />
                Anekal Taluk, Bengaluru, Karnataka 562125.
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 border border-[var(--ws-paper)]/50 px-5 py-3 text-sm transition-colors hover:bg-[var(--ws-paper)] hover:text-[var(--ws-ink)]"
              >
                <Phone size={15} strokeWidth={1.8} /> Call {PHONE_DISPLAY}
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--ws-paper)]/50 px-5 py-3 text-sm transition-colors hover:bg-[var(--ws-paper)] hover:text-[var(--ws-ink)]"
              >
                <Navigation size={15} strokeWidth={1.8} /> Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[var(--ws-paper)] p-6 text-[var(--ws-ink)] md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--coral-600)]">
            {"\n"}
          </p>
          <h3 className="mt-3 text-2xl md:text-3xl">Book a campus visit</h3>
          <p className="mt-2 text-sm text-[var(--grey-700)]">
            Experience Wellsprings and discover where your child can learn and grow 
          </p>
          <div className="mt-6">
            <VisitForm />
          </div>
        </div>
      </div>
    </Section>
  );
}

function LandingV2() {
  return (
    <>
      <Hero />
      <Why />
      <Academics />
      <Beyond />
      <Sports />
      <Campus />
      <QuickFacts />
      <Admissions />
    </>
  );
}
