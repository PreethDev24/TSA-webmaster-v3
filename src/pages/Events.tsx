'use client';

import { useState, useMemo } from 'react';
import { motion } from '@/lib/motion-compat';
import { Calendar, List, LayoutGrid } from 'lucide-react';
import EventCard from '@/components/cards/EventCard';
import { events, eventCategories, eventDateFilters } from '@/data/events';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents = useMemo(() => {
    let filtered = [...events];
    if (activeCategory !== 'All') filtered = filtered.filter(e => e.category === activeCategory);
    const now = new Date();
    if (dateFilter === 'this-week') {
      const weekEnd = new Date(now); weekEnd.setDate(weekEnd.getDate() + 7);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= weekEnd);
    } else if (dateFilter === 'this-month') {
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= monthEnd);
    } else if (dateFilter === 'next-3-months') {
      const threeMonthsEnd = new Date(now); threeMonthsEnd.setMonth(threeMonthsEnd.getMonth() + 3);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= threeMonthsEnd);
    }
    if (sortBy === 'date') filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    else if (sortBy === 'popularity') filtered.sort((a, b) => b.attending - a.attending);
    return filtered;
  }, [activeCategory, dateFilter, sortBy]);

  const clearFilters = () => { setActiveCategory('All'); setDateFilter('all'); setSortBy('date'); };

  return (
    <main id="main-content">
      <CinematicScrollyHero
        tone="events"
        accent="#f59e0b"
        secondary="#f43f5e"
        background="linear-gradient(135deg, #100408 0%, #220817 42%, #120b02 100%)"
        textMode="light"
        icon={Calendar}
        showIcon={false}
        heightClassName="h-[170vh] md:h-[190vh]"
        images={[
          {
            url: 'https://www.cityoftracy.org/files/assets/city/v/1/parks-and-rec/images/images-26-b-summer-2026/park-amp-rec-events/2026-block-party-people-dancing-and-enoying.png',
            label: 'Community Events',
          },
        ]}
        chapters={[
          {
            eyebrow: 'Community Events',
            title: "What's Happening",
            accent: 'in Tracy',
            description: 'Festivals, workshops, markets, and community gatherings move through the city like a living calendar.',
          },
        ]}
      />

      <section id="nav-dark-start" className="py-16 pb-24 bg-gradient-to-b from-navy to-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 rounded-2xl border border-white/35 bg-white/12 p-5 shadow-[0_20px_60px_rgba(5,20,45,0.25)] backdrop-blur-sm sm:p-6"
          >
            <div className="mb-4 flex flex-wrap gap-3">
              {eventCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-white text-navy shadow-lg'
                      : 'border border-white/35 bg-white/10 text-white/85 hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky"
              >
                {eventDateFilters.map((f) => (
                  <option key={f.value} value={f.value} className="text-navy">
                    {f.label}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky"
              >
                <option value="date" className="text-navy">Sort by Date</option>
                <option value="popularity" className="text-navy">Sort by Popularity</option>
              </select>
              {(activeCategory !== 'All' || dateFilter !== 'all' || sortBy !== 'date') && (
                <button onClick={clearFilters} className="text-white/80 transition-colors hover:text-white">
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-end mb-8"
          >
            <div className="inline-flex bg-white rounded-xl overflow-hidden shadow-lg border border-border">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                  viewMode === 'grid' ? 'bg-navy text-white' : 'text-textsecondary hover:text-navy'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
                Grid
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                  viewMode === 'list' ? 'bg-navy text-white' : 'text-textsecondary hover:text-navy'
                }`}
              >
                <List className="w-5 h-5" />
                List
              </motion.button>
            </div>
          </motion.div>

          {filteredEvents.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    whileHover={{ y: -10, rotateX: 5 }}
                  >
                    <EventCard {...event} index={i % 6} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((event, i) => {
                  const dateObj = new Date(event.date + 'T00:00:00');
                  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 10 }}
                      className="bg-white rounded-2xl border border-border p-6 flex flex-col sm:flex-row gap-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="w-full sm:w-56 h-40 shrink-0 overflow-hidden rounded-xl">
                        <img src={event.image} alt={event.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold px-3 py-1 rounded-full bg-sky/10 text-sky">{event.category}</span>
                          <span className="text-textsecondary">{dateStr} • {event.time}</span>
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2">{event.name}</h3>
                        <p className="text-textsecondary mb-4 line-clamp-2">{event.description}</p>
                        <div className="flex items-center gap-4">
                          {event.rsvpUrl ? (
                            <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-success text-white font-bold px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
                              RSVP
                            </a>
                          ) : (
                            <span className="text-textsecondary font-medium">Open attendance</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Calendar className="w-16 h-16 text-textsecondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">No events found</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors">
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
