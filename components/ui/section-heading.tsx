export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <span className="mb-4 inline-flex rounded-full border border-mocha/10 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.3em] text-mocha/70">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-mocha/75 sm:text-lg">{description}</p>
    </div>
  );
}
