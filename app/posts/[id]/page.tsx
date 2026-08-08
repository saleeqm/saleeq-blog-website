import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { fetchCMSPost } from "@/lib/cms";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ShareButton from "@/components/posts/ShareButton";

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

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const idParam = resolvedParams.id;

  const cmsPost = await fetchCMSPost(idParam);

  const numericId = parseInt(idParam, 10);
  const dummyPost = !isNaN(numericId)
    ? DUMMY_POSTS.find((p) => p.id === numericId)
    : undefined;

  const post = cmsPost ?? (dummyPost as any);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = post.excerpt || (post.content ? post.content.substring(0, 160) + '...' : "Read this post on Mongatthukaran's Journal");

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `/posts/${idParam}`,
      images: post.imageUrl ? [post.imageUrl] : [],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

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
    <main className="relative w-full flex flex-col min-h-screen bg-[var(--color-sand)]">
      <Header />
      
      <article className="w-full max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Link href="/#latest-posts" className="inline-flex items-center text-[var(--color-ink-light)] hover:text-[var(--color-laterite)] font-medium mb-8 transition-colors">
          <span className="mr-2">←</span> തിരികെ പോകുക
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-transparent border border-[var(--color-laterite)] text-[var(--color-laterite)] text-xs font-semibold tracking-widest mb-2 uppercase">
              {post.category}
            </span>
            <time className="text-[var(--color-ink-light)] font-medium font-body">{post.date}</time>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[var(--color-ink)] font-bold leading-tight mb-8">
            {post.title}
          </h1>
          <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden shadow-lg bg-[var(--color-ink)]">
            {post.imageUrl ? (
              <Image 
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--color-ink)] p-8 text-center">
                <span className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-[var(--color-sand)] opacity-40 tracking-widest uppercase">
                  {post.category}
                </span>
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-lg md:prose-xl max-w-none text-[var(--color-ink-light)] leading-relaxed font-body">
          {cmsPost ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ children, ...props }) => (
                  <p className="mb-6 leading-relaxed text-[var(--color-ink-light)]" {...props}>
                    {children}
                  </p>
                ),
                h1: ({ children, ...props }) => (
                  <h1 className="text-3xl md:text-4xl font-bold font-display text-[var(--color-ink)] mt-10 mb-4" {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-[var(--color-ink)] mt-8 mb-3" {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="text-xl md:text-2xl font-semibold font-display text-[var(--color-ink)] mt-6 mb-2" {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 className="text-lg font-semibold font-display text-[var(--color-ink-light)] mt-5 mb-2" {...props}>
                    {children}
                  </h4>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote className="border-l-4 border-[var(--color-laterite)] pl-6 my-6 italic text-[var(--color-ink-light)] text-xl font-display" {...props}>
                    {children}
                  </blockquote>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="list-disc list-inside mb-6 space-y-1 text-[var(--color-ink-light)]" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="list-decimal list-inside mb-6 space-y-1 text-[var(--color-ink-light)]" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li className="leading-relaxed" {...props}>
                    {children}
                  </li>
                ),
                strong: ({ children, ...props }) => (
                  <strong className="font-bold text-[var(--color-ink)]" {...props}>
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em className="italic text-[var(--color-ink-light)]" {...props}>
                    {children}
                  </em>
                ),
                hr: (props) => (
                  <hr className="my-8 border-t border-[var(--color-ink)]/10" {...props} />
                ),
                a: ({ children, href, ...props }) => (
                  <a
                    href={href}
                    className="text-[var(--color-laterite)] underline underline-offset-4 hover:text-[var(--color-ink)] transition-colors"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                ),
                code: ({ children, ...props }) => (
                  <code className="bg-[var(--color-ink)]/5 text-[var(--color-ink)] px-1.5 py-0.5 font-mono text-sm" {...props}>
                    {children}
                  </code>
                ),
                pre: ({ children, ...props }) => (
                  <pre className="bg-[var(--color-ink)] text-[var(--color-sand)] p-6 overflow-x-auto my-6 text-sm font-mono" {...props}>
                    {children}
                  </pre>
                ),
              }}
            >
              {post.content || post.excerpt || ''}
            </ReactMarkdown>
          ) : (
            <>
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-[var(--color-laterite)] first-letter:mr-3 first-letter:float-left first-letter:font-display mb-6 leading-relaxed">
                {post.content || post.excerpt}
              </p>
              <p className="mt-6 leading-relaxed">
                ഇതൊരു ഡെമോ പോസ്റ്റ് ആയതുകൊണ്ട് കൂടുതൽ വിവരങ്ങൾ ഇവിടെ ലഭ്യമല്ല. എങ്കിലും ഈ ഡിസൈൻ നിങ്ങൾക്ക് ഇഷ്ടമായെന്ന് കരുതുന്നു. തുടർന്നും വായിക്കാൻ താല്പര്യമുണ്ടെങ്കിൽ തിരികെ പോയി മറ്റ് ലേഖനങ്ങൾ വായിക്കാവുന്നതാണ്.
              </p>
            </>
          )}
        </div>
      </article>
      <ShareButton title={post.title} />
    </main>
  );
}
