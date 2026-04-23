const instagramProfileUrl = "https://www.instagram.com/fogoco.au";

const curatedPosts = [
  {
    imageUrl: "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/1.png",
  },
  {
    imageUrl: "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/2.png",
  },
  {
    imageUrl: "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/3.png",
  },
  {
    imageUrl: "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/4.png",
  },
  {
    imageUrl: "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/5.png",
  },
  {
    imageUrl: "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/6.png",
  },
] as const;

type InstagramCard = {
  imageUrl: string;
};

export function InstagramTimeline() {
  const cards = curatedPosts.map<InstagramCard>((post) => ({
    imageUrl: post.imageUrl,
  }));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0908]/85 p-6 backdrop-blur-sm md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">Instagram</p>
          <p className="mt-1 text-sm text-white/70">Follow @fogoco.au and see more on Instagram</p>
        </div>
        <a
          href={instagramProfileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 transition hover:text-white"
        >
          View profile →
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((post) => (
          <a
            key={post.imageUrl}
            href={instagramProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-white/10 bg-black/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt="Instagram post"
              className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <span className="sr-only">Open post on Instagram</span>
          </a>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href={instagramProfileUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-bronze-soft inline-flex items-center rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.16em]"
        >
          See more on Instagram
        </a>
      </div>
    </div>
  );
}
