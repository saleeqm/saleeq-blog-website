'use client';

import React, { useState } from 'react';
import Header from "@/components/layout/Header";
import PostCard from "@/components/home/PostCard";

const IMG_NATURE = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop';
const IMG_WRITING = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop';
const IMG_MIST = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop';
const IMG_COFFEE = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop';
const IMG_POETRY = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop';

const CATEGORIES = [
  'എല്ലാം',
  'യാത്രകൾ',
  'കഥകൾ',
  'കവിതകൾ',
  'കുറുംകവിതകൾ',
  'ലേഖനങ്ങൾ',
];

const DUMMY_POSTS = [
  {
    id: 1,
    category: 'യാത്രകൾ',
    title: 'നൂറാടിപ്പുഴയുടെ തീരങ്ങളിലൂടെ',
    date: 'May 18, 2025',
    imageUrl: IMG_NATURE,
  },
  {
    id: 2,
    category: 'ലേഖനങ്ങൾ',
    title: 'വായനയും എഴുത്തും: ഒരു പ്രവാഹം',
    date: 'May 15, 2025',
    imageUrl: IMG_WRITING,
  },
  {
    id: 3,
    category: 'കഥകൾ',
    title: 'മഴുവില്‍ വീണ ഓര്‍മകള്‍',
    date: 'May 14, 2025',
    imageUrl: IMG_MIST,
  },
  {
    id: 4,
    category: 'കുറുംകവിതകൾ',
    title: 'ചിതറിയ വളപ്പൊട്ടുകൾ',
    date: 'May 12, 2025',
    imageUrl: IMG_POETRY,
  },
  {
    id: 5,
    category: 'കവിതകൾ',
    title: 'നിശബ്ദതയുടെ ഭാഷ',
    date: 'May 10, 2025',
    imageUrl: IMG_COFFEE,
  },
  {
    id: 6,
    category: 'കഥകൾ',
    title: 'ഒരു യാത്രയുടെ അന്ത്യം',
    date: 'May 5, 2025',
    imageUrl: IMG_NATURE,
  },
  {
    id: 7,
    category: 'കവിതകൾ',
    title: 'ചില വാക്കുകള്‍ മാത്രം',
    date: 'Apr 28, 2025',
    imageUrl: IMG_WRITING,
  },
  {
    id: 8,
    category: 'കഥകൾ',
    title: 'അറിയാതെ മറന്നവര്‍',
    date: 'Apr 22, 2025',
    imageUrl: IMG_MIST,
  },
  {
    id: 9,
    category: 'യാത്രകൾ',
    title: 'മലയോരങ്ങളിലെ മഞ്ഞുതുള്ളികൾ',
    date: 'Apr 20, 2025',
    imageUrl: IMG_POETRY,
  },
  {
    id: 10,
    category: 'കുറുംകവിതകൾ',
    title: 'നിഴലും നിലാവും',
    date: 'Apr 18, 2025',
    imageUrl: IMG_COFFEE,
  },
  {
    id: 11,
    category: 'കവിതകൾ',
    title: 'മനസ്സിന്റെ പേജുകള്‍',
    date: 'Apr 15, 2025',
    imageUrl: IMG_NATURE,
  },
  {
    id: 12,
    category: 'ലേഖനങ്ങൾ',
    title: 'ചരിത്രം ഉറങ്ങാത്ത മോങ്ങം',
    date: 'Apr 10, 2025',
    imageUrl: IMG_WRITING,
  },
];

export default function PostsPage() {
  const [selectedCategory, setSelectedCategory] = useState('എല്ലാം');

  const filteredPosts =
    selectedCategory === 'എല്ലാം'
      ? DUMMY_POSTS
      : DUMMY_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <main className="relative w-full flex flex-col min-h-screen bg-[#e2d1bf]">
      <Header />

      <section className="w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto py-24 md:py-32">
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#362a22] font-bold mb-4">
            എല്ലാ ലേഖനങ്ങളും
          </h1>
          <div className="w-16 h-1 bg-[#362a22]/30 rounded-full mb-6"></div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-lg sm:text-xl font-bold text-[#5a483a] tracking-wide">
              യാത്രകൾ • കഥകൾ • കവിതകൾ • കുറുംകവിതകൾ • ലേഖനങ്ങൾ
            </p>
            <p className="text-md text-[#7a6552] font-medium max-w-sm leading-relaxed italic">
              ഇതുവരെ എഴുതിയ എല്ലാ സൃഷ്ടികളും ഇവിടെ വായിക്കാം.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4 mb-12 px-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-serif tracking-wide transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#362a22] text-[#e2d1bf] font-bold shadow-md scale-105'
                  : 'bg-[#362a22]/10 text-[#5a483a] hover:bg-[#362a22]/20 hover:text-[#362a22] font-medium'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              category={post.category}
              title={post.title}
              date={post.date}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>

        {/* Empty State fallback */}
        {filteredPosts.length === 0 && (
          <div className="py-16 text-center text-[#7a6552] font-serif text-lg italic">
            ഈ വിഭാഗത്തിൽ പുതിയ സൃഷ്ടികൾ ഉടൻ പ്രതീക്ഷിക്കാം...
          </div>
        )}
      </section>
    </main>
  );
}
