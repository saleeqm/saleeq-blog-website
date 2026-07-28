import Header from "@/components/layout/Header";
import PostsPageClient from "@/components/posts/PostsPageClient";
import { fetchCMSPosts } from "@/lib/cms";

const IMG_NATURE = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop';
const IMG_WRITING = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop';
const IMG_MIST = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop';
const IMG_COFFEE = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop';
const IMG_POETRY = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop';

const DUMMY_POSTS = [
  { id: 1,  category: 'യാത്രകൾ',       title: 'നൂറാടിപ്പുഴയുടെ തീരങ്ങളിലൂടെ',    date: 'May 18, 2025', imageUrl: IMG_NATURE,   slug: '' },
  { id: 2,  category: 'ലേഖനങ്ങൾ',       title: 'വായനയും എഴുത്തും: ഒരു പ്രവാഹം',   date: 'May 15, 2025', imageUrl: IMG_WRITING,  slug: '' },
  { id: 3,  category: 'കഥകൾ',          title: 'മഴുവില്‍ വീണ ഓര്‍മകള്‍',           date: 'May 14, 2025', imageUrl: IMG_MIST,     slug: '' },
  { id: 4,  category: 'കുറുംകവിതകൾ',   title: 'ചിതറിയ വളപ്പൊട്ടുകൾ',             date: 'May 12, 2025', imageUrl: IMG_POETRY,   slug: '' },
  { id: 5,  category: 'കവിതകൾ',        title: 'നിശബ്ദതയുടെ ഭാഷ',                 date: 'May 10, 2025', imageUrl: IMG_COFFEE,   slug: '' },
  { id: 6,  category: 'കഥകൾ',          title: 'ഒരു യാത്രയുടെ അന്ത്യം',            date: 'May 5, 2025',  imageUrl: IMG_NATURE,   slug: '' },
  { id: 7,  category: 'കവിതകൾ',        title: 'ചില വാക്കുകള്‍ മാത്രം',            date: 'Apr 28, 2025', imageUrl: IMG_WRITING,  slug: '' },
  { id: 8,  category: 'കഥകൾ',          title: 'അറിയാതെ മറന്നവര്‍',                date: 'Apr 22, 2025', imageUrl: IMG_MIST,     slug: '' },
  { id: 9,  category: 'യാത്രകൾ',       title: 'മലയോരങ്ങളിലെ മഞ്ഞുതുള്ളികൾ',     date: 'Apr 20, 2025', imageUrl: IMG_POETRY,   slug: '' },
  { id: 10, category: 'കുറുംകവിതകൾ',   title: 'നിഴലും നിലാവും',                   date: 'Apr 18, 2025', imageUrl: IMG_COFFEE,   slug: '' },
  { id: 11, category: 'കവിതകൾ',        title: 'മനസ്സിന്റെ പേജുകള്‍',              date: 'Apr 15, 2025', imageUrl: IMG_NATURE,   slug: '' },
  { id: 12, category: 'ലേഖനങ്ങൾ',       title: 'ചരിത്രം ഉറങ്ങാത്ത മോങ്ങം',        date: 'Apr 10, 2025', imageUrl: IMG_WRITING,  slug: '' },
];

export default async function PostsPage() {
  // Fetch CMS posts server-side; fall back to dummy data if none available
  const cmsPosts = await fetchCMSPosts();
  const posts = cmsPosts.length > 0 ? cmsPosts : DUMMY_POSTS;

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

        {/* Client component handles category filtering + grid rendering */}
        <PostsPageClient posts={posts} />
      </section>
    </main>
  );
}
