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
    <Link href={`/posts/${id}`} className="group bg-[#d8c5b3]/40 border border-[#c0ab90]/40 rounded-2xl overflow-hidden flex flex-col h-[380px] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 block">
      {/* Image Container */}
      <div className="w-full h-[55%] relative overflow-hidden bg-[#362a22]">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4a3f35] to-[#2a201a] p-4 text-center transition-transform duration-700 group-hover:scale-110">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#e2d1bf] opacity-80 mix-blend-overlay tracking-wider uppercase drop-shadow-md">
              {category}
            </span>
          </div>
        )}
        {/* Subtle gradient overlay to smoothly transition to content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#d8c5b3] via-transparent to-transparent opacity-60"></div>
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col justify-between p-6 flex-1 bg-gradient-to-b from-[#d8c5b3]/40 to-transparent relative z-10">
        <div>
          <span className="inline-block px-3 py-1 bg-[#362a22] text-[#e2d1bf] text-xs font-semibold tracking-widest rounded-full mb-3 uppercase">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold leading-tight line-clamp-2 text-[#362a22] font-serif group-hover:text-[#5a483a] transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-[#7d6854] font-medium">{date}</span>
          <span className="text-sm font-bold text-[#362a22] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            വായിക്കുക ➔
          </span>
        </div>
      </div>
    </Link>
  );
}
