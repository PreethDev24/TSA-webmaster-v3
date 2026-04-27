'use client';

import { useState, useMemo } from 'react';
import { motion } from '@/lib/motion-compat';
import { Info, ExternalLink, Dumbbell } from 'lucide-react';
import ProgramCard from '@/components/cards/ProgramCard';
import { programs, programAgeGroups, programCategories, programCosts } from '@/data/programs';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';

export default function Programs() {
  const [ageFilter, setAgeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [costFilter, setCostFilter] = useState('All');

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchAge = ageFilter === 'All' || p.ageGroup === ageFilter;
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchCost = costFilter === 'All' ||
        (costFilter === 'Free' && p.cost === 'Free') ||
        (costFilter === 'Paid' && p.cost !== 'Free');
      return matchAge && matchCategory && matchCost;
    });
  }, [ageFilter, categoryFilter, costFilter]);

  const clearFilters = () => { setAgeFilter('All'); setCategoryFilter('All'); setCostFilter('All'); };
  const hasFilters = ageFilter !== 'All' || categoryFilter !== 'All' || costFilter !== 'All';
  return (
    <main id="main-content">
      <CinematicScrollyHero
        tone="programs"
        accent="#a855f7"
        secondary="#22c55e"
        background="linear-gradient(135deg, #070214 0%, #16072b 46%, #021507 100%)"
        textMode="light"
        icon={Dumbbell}
        showIcon={false}
        heightClassName="h-[170vh] md:h-[190vh]"
        images={[
          {
            url: 'https://www.cityoftracy.org/files/assets/city/v/1/parks-and-rec/images/images-26-b-summer-2026/recreation-programs/summer-adventure-camp.jpg',
            label: 'Summer Camp',
          },
        ]}
        chapters={[
          {
            eyebrow: 'Community Programs',
            title: 'Programs for',
            accent: 'Every Age',
            description: 'Sports, arts, STEM, and fitness run like colorful lanes across the Tracy Community Center calendar.',
          },
        ]}
      />

      <section id="nav-dark-start" className="py-16 pb-24 bg-gradient-to-b from-navy to-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 rounded-2xl border border-white/35 bg-white/12 p-5 shadow-[0_20px_60px_rgba(5,20,45,0.25)] backdrop-blur-sm sm:p-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Age Group
                <select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm font-medium normal-case tracking-normal text-white focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {programAgeGroups.map((age) => (
                    <option key={age} value={age} className="text-navy">
                      {age}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Category
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm font-medium normal-case tracking-normal text-white focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {programCategories.map((category) => (
                    <option key={category} value={category} className="text-navy">
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Cost
                <select
                  value={costFilter}
                  onChange={(e) => setCostFilter(e.target.value)}
                  className="rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm font-medium normal-case tracking-normal text-white focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {programCosts.map((cost) => (
                    <option key={cost} value={cost} className="text-navy">
                      {cost}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="mt-4 text-sm font-semibold text-white/80 transition-colors hover:text-white">
                Clear Filters
              </button>
            )}
          </motion.div>

          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: 5 }}
                >
                  <ProgramCard
                    name={program.name}
                    ageGroup={program.ageGroup}
                    category={program.category}
                    schedule={program.schedule}
                    startDate={program.startDate}
                    cost={program.cost}
                    spotsLeft={program.spotsLeft}
                    totalSpots={program.totalSpots}
                    description={program.description}
                    image={program.image}
                    registerUrl={program.registerUrl}
                    index={i % 6}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Info className="w-16 h-16 text-textsecondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">No programs found</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors">
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-navy-light via-white to-navy-light py-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Info className="w-6 h-6 text-navy" />
              <h3 className="text-2xl font-bold text-navy">How to Register</h3>
            </div>
          </motion.div>
          
          <p className="text-navy/80 mb-6 text-lg">
            Most programs can be registered online at tracyartsandrec.com or by calling 123-456-7890. 
            Walk-in registration is also available at the Tracy Community Center.
          </p>
          <a
            href="https://tracyartsandrec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-navy-dark transition-all hover:scale-105 hover:shadow-2xl hover:shadow-navy/30"
          >
            Visit TracyArtsandRec.com
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </motion.section>
    </main>
  );
}
