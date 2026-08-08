import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  id: string | number;
  category: string;
  title: string;
  date: string;
  imageUrl?: string;
}

export default function PostCard({ id, category, title, date, imageUrl }: PostCardProps) {
  return (
    <Link href={`/posts/${id}`} className="group bg-[var(--color-sand-light)] border border-[var(--color-ink)]/10 flex flex-col h-[380px] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 block relative overflow-hidden">
      {/* Image Container */}
      <div className="w-full h-[55%] relative overflow-hidden bg-[var(--color-ink)]">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--color-ink)] p-4 text-center transition-transform duration-700 group-hover:scale-110">
            <span className="text-3xl md:text-4xl font-display font-bold text-[var(--color-sand)] opacity-40 tracking-wider">
              {category}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sand-light)] via-transparent to-transparent opacity-80"></div>
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col justify-between p-6 flex-1 bg-[var(--color-sand-light)] relative z-10">
        <div>
          <span className="inline-block px-3 py-1 bg-transparent border border-[var(--color-laterite)] text-[var(--color-laterite)] text-xs font-semibold tracking-widest mb-4">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold leading-tight line-clamp-2 text-[var(--color-ink)] font-display group-hover:text-[var(--color-laterite)] transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-[var(--color-ink-light)] font-medium font-body">{date}</span>
          <span className="text-sm font-bold text-[var(--color-ink)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            വായിക്കുക ➔
          </span>
        </div>
      </div>
    </Link>
  );
}
