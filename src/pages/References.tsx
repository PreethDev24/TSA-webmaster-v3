'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion-compat';
import { Download, FileText, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';

interface SourceGroup {
  title: string;
  sources: string[];
}

const sourceGroups: SourceGroup[] = [
  {
    title: 'Community Resources & Organizations',
    sources: [
      'Tracy Interfaith Ministries. (2026). Emergency food and clothing services. https://tracyinterfaith.org',
      'Tracy Community Connections Center. (2026). Homelessness services in Tracy, CA. https://tracyccc.org',
      'City of Tracy. (2026). Parks, recreation, and community services. https://www.cityoftracy.org',
      'Lolly Hansen Senior Center. (2026). Senior programs and resources. https://www.cityoftracy.org/Departments/Parks-Recreation-Community-Services/Lolly-Hansen-Senior-Center',
      'Tracy Fire Department. (2026). Stations and emergency operations. https://www.sjcfire.org/operations/stations',
      'Tracy Police Department. (2026). Department information and services. https://tracypd.com/',
      'Tracy African American Association. (2026). Community programs and initiatives. https://taaa.net/',
      'San Joaquin County Human Services Agency. (2026). Community support services. https://www.sjgov.org/hsa',
    ],
  },
  {
    title: 'Mental Health Resources',
    sources: [
      'A To Z Psychotherapy. (2025). Mental health services for women and children. https://www.atozpsychotherapy.org',
      'Mindpath Health. (2026). Psychiatrists and therapists in Tracy, CA. https://www.mindpath.com/provider/psychiatrist/ca/tracy',
      'Psychology Today. (2026). Verified therapists in Tracy, CA. https://www.psychologytoday.com/us/therapists/ca/tracy',
      "Razan's Therapy Services. (2026). Individual and couples counseling in Tracy, CA. https://razanstherapeuticservices.com",
      'Harvard Health Publishing. (2024, July 29). Recognizing and easing the physical symptoms of anxiety. https://www.health.harvard.edu/mind-and-mood/recognizing-and-easing-the-physical-symptoms-of-anxiety',
      'Mayo Clinic. (2023, April 5). Depression: Supporting a family member or friend. https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression/art-20045943',
      'World Health Organization. (2025, September 1). Mental health of adolescents. https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health',
      'UNICEF North Macedonia. (n.d.). Mental health: When to seek professional support. https://www.unicef.org/northmacedonia/stories/mental-health-when-seek-professional-support',
      '988 Suicide & Crisis Lifeline. (2026). https://988lifeline.org',
      'Crisis Text Line. (2026). https://www.crisistextline.org',
    ],
  },
  {
    title: 'Events & Activities',
    sources: [
      'City of Tracy. (2026). City calendar and events. https://www.cityoftracy.org/I-Want-To/View/City-Calendar',
      'Tracy Earth Project. (2026). Annual Earth Day event. https://tracyearthproject.org',
      'Tracy Unity. (2026). Community resource fair. https://www.tracyconnects.com',
      'Eventbrite. (2026). Tracy, CA events and calendar. https://www.eventbrite.com/d/ca--tracy/events',
      'Tracy Community Band. (2026). Concert schedule. https://atthegrand.org/events/tracy-community-band',
    ],
  },
  {
    title: 'Volunteer & Nonprofit Organizations',
    sources: [
      'Animal Rescue of Tracy. (2026). Volunteer programs. https://www.animalrescuetracy.org/volunteering',
      'Tracy Interfaith Ministries. (2026). Volunteer opportunities. https://tracyinterfaith.org',
      'Tracy Grand Theater Center for the Arts. (2026). Volunteer program. https://atthegrand.org',
      'GreatNonprofits. (2026). Nonprofits and charities in Tracy, CA. https://greatnonprofits.org/city/tracy/CA',
      'Tracy Community Connections Center. (2026). Volunteer and donation information. https://tracyccc.org/get-involved',
      'Tracy Earth Project. (2026). Volunteer opportunities. https://tracyearthproject.org',
    ],
  },
  {
    title: 'Youth & Education Programs',
    sources: [
      'Boys & Girls Club of Tracy. (2026). After-school programs and tutoring. https://www.bgca.org',
      'Give Every Child a Chance. (2026). Free tutoring services. https://www.gecac.net',
      'Tracy Unified School District. (2026). Community education programs. https://www.tracy.k12.ca.us',
    ],
  },
  {
    title: 'Images & Media',
    sources: [
      'City of Tracy Parks, Recreation & Community Services media pages (event/program imagery). https://www.cityoftracy.org',
      'Wikimedia Commons photos related to Tracy, California (civic and historical imagery). https://commons.wikimedia.org',
      'Icons sourced from Lucide React (open-source, MIT license). https://lucide.dev',
      'Select animation and UI interaction elements are adapted from React Bits component patterns. https://reactbits.dev/',
      'All selected media assets are publicly accessible and directly tied to Tracy, CA context.',
    ],
  },
];

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-border rounded-2xl overflow-hidden mb-5 shadow-lg hover:shadow-xl transition-shadow"
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white hover:bg-lightgray transition-colors text-left"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-lg text-navy">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <ChevronUp className="w-6 h-6 text-textsecondary" /> : <ChevronDown className="w-6 h-6 text-textsecondary" />}
        </motion.div>
      </motion.button>
      <motion.div
        initial={false}
        animate={{
          maxHeight: isOpen ? 1200 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <div className="p-6 bg-white border-t border-border">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function References() {
  return (
    <main id="main-content">
      <CinematicScrollyHero
        tone="references"
        accent="#fbbf24"
        secondary="#818cf8"
        background="linear-gradient(135deg, #04060d 0%, #0d1020 56%, #07040d 100%)"
        textMode="light"
        icon={BookOpen}
        showIcon={false}
        heightClassName="h-[170vh] md:h-[190vh]"
        images={[
          {
            url: 'https://commons.wikimedia.org/wiki/Special:FilePath/West_Side_Bank_-_Tracy,_CA.jpg',
            label: 'Archive',
          },
        ]}
        chapters={[
          {
            eyebrow: '',
            title: 'Referances',
            accent: '',
            description: '',
          },
        ]}
      />

      <motion.section
        id="nav-dark-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-b from-navy to-lightgray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Student Copyright Checklist',
                desc: 'Required TSA document confirming all content permissions and original work.',
                href: 'https://drive.google.com/file/d/1ZtOlj-KlchqeXLVccOsZA_YjFoMZM1i3/view?usp=sharing',
              },
              {
                title: 'Work Log',
                desc: 'Complete development timeline and team member contributions.',
                href: 'https://drive.google.com/file/d/169wdCNg4_r_0kedYSONCT7ZtWkRcnH5G/view?usp=sharing',
              },
            ].map((doc, i) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, rotateX: 5 }}
                className="bg-white rounded-2xl border border-border p-10 text-center shadow-xl hover:shadow-2xl transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-2xl bg-navy-light flex items-center justify-center mx-auto mb-6"
                >
                  <FileText className="w-10 h-10 text-navy" />
                </motion.div>
                <h3 className="text-2xl font-bold text-navy mb-3">{doc.title}</h3>
                <p className="text-textsecondary mb-6">{doc.desc}</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-navy-dark transition-all hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-20 bg-gradient-to-b from-offwhite via-white to-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
              Sources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              References by Category
            </h2>
          </motion.div>
          
          <div>
            {sourceGroups.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <AccordionItem title={group.title}>
                  <ul className="space-y-4">
                    {group.sources.map((source, j) => (
                      <motion.li 
                        key={j} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.05 }}
                        className="text-sm text-textsecondary pl-4 border-l-3 border-sky/30"
                      >
                        {source}
                      </motion.li>
                    ))}
                  </ul>
                </AccordionItem>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
