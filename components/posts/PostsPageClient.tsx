'use client';

import React, { useState } from 'react';
import PostCard from '@/components/home/PostCard';
import { CMSPost } from '@/lib/cms';

const CATEGORIES = [
  'എല്ലാം',
  'യാത്രകൾ',
  'കഥകൾ',
  'കവിതകൾ',
  'കുറുംകവിതകൾ',
  'ലേഖനങ്ങൾ',
];

interface PostsPageClientProps {
  posts: CMSPost[];
}

export default function PostsPageClient({ posts }: PostsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('എല്ലാം');

  const filteredPosts =
    selectedCategory === 'എല്ലാം'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
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
            date={post.date || ''}
            imageUrl={post.imageUrl || ''}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="py-16 text-center text-[#7a6552] font-serif text-lg italic">
          ഈ വിഭാഗത്തിൽ പുതിയ സൃഷ്ടികൾ ഉടൻ പ്രതീക്ഷിക്കാം...
        </div>
      )}
    </>
  );
}
