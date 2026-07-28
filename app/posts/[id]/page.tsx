import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCMSPost } from "@/lib/cms";

// Fallback dummy data for when CMS has no content
const SINGLE_IMAGE = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop';

const DUMMY_POSTS = [
  {
    id: 1,
    category: 'കഥ',
    title: 'മഴുവില്‍ വീണ ഓര്‍മകള്‍',
    date: 'May 14, 2025',
    imageUrl: SINGLE_IMAGE,
    content: 'ഇതൊരു സാങ്കൽപ്പിക കഥയാണ്. ജീവിതത്തിലെ ചില ഏടുകൾ ഓർമ്മകളായി മാറുമ്പോൾ നമ്മൾ അറിയാതെ തന്നെ ഒരു പുഞ്ചിരി വിടരും. ആ ഓർമ്മകളുടെ മഴവില്ലഴകാണ് ഈ കഥയുടെ ഇതിവൃത്തം...',
  },
  {
    id: 2,
    category: 'കവിത',
    title: 'നിശബ്ദതയുടെ ഭാഷ',
    date: 'May 10, 2025',
    imageUrl: SINGLE_IMAGE,
    content: 'വാക്കുകൾക്ക് പറയാൻ കഴിയാത്തത് പലപ്പോഴും നിശബ്ദത പറയും. ആഴമേറിയ ചിന്തകളും വികാരങ്ങളും പങ്കുവെക്കാൻ ഒരു വാക്കുപോലും ആവശ്യമില്ലാത്ത ചില നിമിഷങ്ങളെക്കുറിച്ചുള്ള കവിത.',
  },
  {
    id: 3,
    category: 'കഥ',
    title: 'ഒരു യാത്രയുടെ അന്ത്യം',
    date: 'May 5, 2025',
    imageUrl: SINGLE_IMAGE,
    content: 'ഓരോ യാത്രക്കും ഒരു അവസാനമുണ്ട്, എന്നാൽ ആ യാത്ര സമ്മാനിക്കുന്ന അനുഭവങ്ങൾക്ക് അവസാനമില്ല. പുതിയ തീരങ്ങളിലേക്കുള്ള യാത്രയുടെ അന്ത്യം നൽകുന്ന പുതിയ തുടക്കങ്ങളെക്കുറിച്ച്.',
  },
  {
    id: 4,
    category: 'കവിത',
    title: 'ചില വാക്കുകള്‍ മാത്രം',
    date: 'Apr 28, 2025',
    imageUrl: SINGLE_IMAGE,
    content: 'ജീവിതത്തിൽ നമ്മൾ കേൾക്കുന്ന ചില വാക്കുകൾക്ക് വലിയ അർത്ഥങ്ങളുണ്ടാകും. ആ വാക്കുകൾ എങ്ങനെ നമ്മെ സ്വാധീനിക്കുന്നു എന്നതിനെക്കുറിച്ചുള്ള വരികൾ.',
  },
  {
    id: 5,
    category: 'കഥ',
    title: 'അറിയാതെ മറന്നവര്‍',
    date: 'Apr 22, 2025',
    imageUrl: SINGLE_IMAGE,
    content: 'കാലപ്രവാഹത്തിൽ നമ്മൾ മറന്നുപോയ ചിലരുണ്ട്. ഓർമ്മകളുടെ പിന്നാമ്പുറങ്ങളിൽ അവർ ഇപ്പോഴും കാത്തിരിക്കുന്നുണ്ടാകാം. അവരെ തേടിയുള്ള ഒരു യാത്ര.',
  },
  {
    id: 6,
    category: 'കവിത',
    title: 'മനസ്സിന്റെ പേജുകള്‍',
    date: 'Apr 15, 2025',
    imageUrl: SINGLE_IMAGE,
    content: 'ഓരോ മനുഷ്യന്റെയും മനസ്സ് ഒരു പുസ്തകമാണ്. ആ പുസ്തകത്തിലെ പേജുകളിൽ എഴുതപ്പെട്ട രഹസ്യങ്ങളും സ്വപ്നങ്ങളും നിറഞ്ഞ ഒരു കവിത.',
  },
];

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const idParam = resolvedParams.id;

  // Try fetching from CMS first (works for both string UUIDs and numeric IDs)
  const cmsPost = await fetchCMSPost(idParam);

  // Fall back to dummy data using numeric id match
  const numericId = parseInt(idParam, 10);
  const dummyPost = !isNaN(numericId)
    ? DUMMY_POSTS.find((p) => p.id === numericId)
    : undefined;

  const post = cmsPost ?? (dummyPost
    ? {
        id: dummyPost.id,
        title: dummyPost.title,
        category: dummyPost.category,
        date: dummyPost.date,
        imageUrl: dummyPost.imageUrl,
        content: dummyPost.content,
        slug: '',
        excerpt: '',
      }
    : null);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative w-full flex flex-col min-h-screen bg-[#e2d1bf]">
      <Header />
      
      <article className="w-full max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Link href="/#latest-posts" className="inline-flex items-center text-[#5a483a] hover:text-[#362a22] font-medium mb-8 transition-colors">
          <span className="mr-2">←</span> തിരികെ പോകുക
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-[#362a22] text-[#e2d1bf] text-sm font-semibold tracking-widest rounded-full uppercase">
              {post.category}
            </span>
            <time className="text-[#7a6552] font-medium">{post.date}</time>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#362a22] font-bold leading-tight mb-8">
            {post.title}
          </h1>
          {post.imageUrl && (
            <div className="w-full h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden shadow-lg">
              <Image 
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg md:prose-xl prose-stone max-w-none text-[#4a3f35] leading-relaxed font-serif">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#362a22] first-letter:mr-3 first-letter:float-left">
            {post.content || post.excerpt}
          </p>
          {!cmsPost && (
            <p className="mt-6">
              ഇതൊരു ഡെമോ പോസ്റ്റ് ആയതുകൊണ്ട് കൂടുതൽ വിവരങ്ങൾ ഇവിടെ ലഭ്യമല്ല. എങ്കിലും ഈ ഡിസൈൻ നിങ്ങൾക്ക് ഇഷ്ടമായെന്ന് കരുതുന്നു. തുടർന്നും വായിക്കാൻ താല്പര്യമുണ്ടെങ്കിൽ തിരികെ പോയി മറ്റ് ലേഖനങ്ങൾ വായിക്കാവുന്നതാണ്.
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
