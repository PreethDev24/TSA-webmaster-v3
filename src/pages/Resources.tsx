'use client';

import { useState, useMemo } from 'react';
import { motion } from '@/lib/motion-compat';
import { Search, X, Building2, LayoutGrid, List } from 'lucide-react';
import { resources, resourceCategories } from '@/data/resources';
import ResourceCard from '@/components/cards/ResourceCard';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';

export default function Resources() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'name' | 'description' | 'categories'>('all');
  const [sortMode, setSortMode] = useState<'relevance' | 'az' | 'za'>('relevance');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact'>('grid');

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = (resource: (typeof resources)[number]) => {
      if (!query) return true;

      if (searchScope === 'name') return resource.name.toLowerCase().includes(query);
      if (searchScope === 'description') return resource.description.toLowerCase().includes(query);
      if (searchScope === 'categories') return resource.categories.some(cat => cat.toLowerCase().includes(query));
      return (
        resource.name.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.categories.some(cat => cat.toLowerCase().includes(query))
      );
    };

    const results = resources.filter((resource) => {
      const matchesCategory =
        activeFilters.length === 0 || resource.categories.some(cat => activeFilters.includes(cat));
      return matchesCategory && matchesQuery(resource);
    });

    if (sortMode === 'az') {
      return [...results].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortMode === 'za') {
      return [...results].sort((a, b) => b.name.localeCompare(a.name));
    }
    return results;
  }, [activeFilters, searchQuery, searchScope, sortMode]);

  const toggleFilter = (category: string) => {
    if (category === 'All') {
      setActiveFilters([]);
      return;
    }
    setActiveFilters(prev =>
      prev.includes(category) ? prev.filter(f => f !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    setSearchScope('all');
    setSortMode('relevance');
    setLayoutMode('grid');
  };

  return (
    <main id="main-content">
      <CinematicScrollyHero
        tone="resources"
        accent="#22d3ee"
        secondary="#55efc4"
        background="linear-gradient(135deg, #010b18 0%, #03192b 52%, #020910 100%)"
        heightClassName="h-[170vh] md:h-[190vh]"
        icon={Building2}
        showIcon={false}
        textMode="light"
        images={[
          {
            url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Downtown_Tracy_(cropped).jpg',
            label: 'Downtown Tracy',
          },
        ]}
        chapters={[
          {
            eyebrow: 'Community Resources',
            title: 'Find the Help',
            accent: 'You Need',
            description: 'Housing, food, healthcare, legal aid, and local support are connected into one searchable civic network.',
          },
        ]}
      />

      <section id="nav-dark-start" className="py-16 pb-24 bg-gradient-to-b from-[#4f81ba] via-[#5a8ec6] to-[#6ca0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 overflow-hidden rounded-[1.75rem] border border-white/45 bg-white/10 p-5 shadow-[0_20px_80px_rgba(2,8,26,0.3)] backdrop-blur-sm sm:p-7">
            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full rounded-2xl border border-white/40 bg-white/20 py-3.5 pl-12 pr-4 text-base text-white placeholder-white/75 outline-none backdrop-blur-md focus:border-white focus:ring-2 focus:ring-white/45"
              />
            </div>

            <div className="mb-6 flex flex-wrap gap-2.5">
              {resourceCategories.map((cat) => {
                const isActive = cat === 'All' ? activeFilters.length === 0 : activeFilters.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    className={`rounded-full border px-5 py-2 text-base font-semibold transition-all ${
                      isActive
                        ? 'border-white bg-white text-[#23507d] shadow-[0_8px_24px_rgba(10,25,46,0.25)]'
                        : 'border-white/45 bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Sort
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as 'relevance' | 'az' | 'za')}
                  className="rounded-xl border border-white/35 bg-white/20 px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-white outline-none backdrop-blur-sm focus:border-white"
                >
                  <option value="relevance" className="text-slate-900">Relevance</option>
                  <option value="az" className="text-slate-900">Name A-Z</option>
                  <option value="za" className="text-slate-900">Name Z-A</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Format
                <div className="inline-flex w-full overflow-hidden rounded-2xl border border-white/50 bg-white/20 p-1 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setLayoutMode('grid')}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold normal-case tracking-normal transition-colors ${
                      layoutMode === 'grid'
                        ? 'bg-[#1f5d98] text-white'
                        : 'text-white/75 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutMode('compact')}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold normal-case tracking-normal transition-colors ${
                      layoutMode === 'compact'
                        ? 'bg-[#1f5d98] text-white'
                        : 'text-white/75 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    <List className="h-4 w-4" />
                    List
                  </button>
                </div>
              </label>
            </div>

            {(activeFilters.length > 0 || searchQuery || searchScope !== 'all' || sortMode !== 'relevance' || layoutMode !== 'grid') && (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" /> Clear filters
              </button>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <div className={`grid grid-cols-1 gap-8 ${layoutMode === 'compact' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredResources.map((resource, i) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: 5 }}
                  className="h-full"
                >
                  <ResourceCard
                    name={resource.name}
                    categories={resource.categories}
                    description={resource.description}
                    phone={resource.phone}
                    email={resource.email}
                    website={resource.website}
                    address={resource.address}
                    hours={resource.hours}
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
              <Building2 className="w-16 h-16 text-textsecondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">No resources match your search</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
