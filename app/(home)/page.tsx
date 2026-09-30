import Link from 'next/link';

const features = [
  ['01', 'Beyond forging', 'More than a toolchain. A whole way to build.'],
  ['02', 'Big by design', 'Designed to leave tiny thinking at the door.'],
  ['03', 'Antam mode', 'Sharp syntax, serious power, zero apology.'],
];

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 font-antam text-[22rem] leading-none text-white/[0.025] select-none lg:block"
      >
        A
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-10 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
          <span className="h-px w-10 bg-white" />
          <span>AntamScript / 001</span>
        </div>

        <section className="max-w-5xl">
          <h1 className="text-balance text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Meet{' '}
            <span className="font-antam font-medium tracking-[-0.035em]">
              AntamScript
            </span>
          </h1>

          <div className="mt-10 grid max-w-4xl gap-8 border-t border-white pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="text-balance text-xl leading-8 text-white sm:text-2xl">
              Basically ForgeScript, but <strong>B I G</strong>. 69 times more
              powerful, maaaaaan das ist crazy!
            </p>

            <p className="max-w-xs text-sm leading-6 text-white/60 sm:text-right">
              Think beyond forging. Think <span className="text-white">Antam</span>.
              A language built for ideas that refuse to stay small.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/docs"
              className="group inline-flex h-12 items-center gap-8 rounded-full bg-white px-6 text-sm font-medium text-black transition-all hover:pr-5"
            >
              Read the docs
              <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <span className="inline-flex h-12 items-center rounded-full border border-white px-6 text-sm font-medium">
              Coming soon
            </span>
          </div>
        </section>

        <section className="mt-20 grid border-y border-white sm:grid-cols-3">
          {features.map(([number, title, description], index) => (
            <div
              key={title}
              className={`group min-h-44 p-6 transition-colors hover:bg-white hover:text-black sm:p-7 ${
                index > 0 ? 'border-t border-white sm:border-l sm:border-t-0' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-[0.2em]">
                  {number}
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ↗
                </span>
              </div>
              <h2 className="mt-12 text-lg font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 max-w-xs text-sm leading-6 opacity-60">{description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
