import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 py-20">

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          Meet <span className="font-antam font-medium">AntamScript</span>
        </h1>

        <p className="mt-6 max-w-3xl text-balance text-lg leading-8 text-fd-muted-foreground sm:text-xl">
          Basically ForgeScript, but <strong className="text-fd-foreground">B I G</strong>.
          69 times more powerful, maaaaaan das ist crazy!
        </p>

        <p className="mt-3 max-w-2xl text-base leading-7 text-fd-muted-foreground">
          Think beyond forging. Think <span className="font-semibold text-fd-foreground">Antam</span>.
          A language built for ideas that refuse to stay small.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-fd-foreground px-6 text-sm font-medium text-fd-background transition-opacity hover:opacity-90"
          >
            Read the docs
          </Link>
          <span className="inline-flex h-11 items-center justify-center rounded-xl border border-fd-border px-6 text-sm font-medium text-fd-muted-foreground">
            Coming soon 😏
          </span>
        </div>

        <div className="mt-16 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
          {[
            ['⚒️', 'Beyond forging', 'More than a toolchain. A whole way to build.'],
            ['📦', 'Big by design', 'Designed to leave tiny thinking at the door.'],
            ['🕶️', 'Antam mode', 'Sharp syntax, serious power, zero apology.'],
          ].map(([icon, title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-fd-border bg-fd-card/70 p-5 backdrop-blur"
            >
              <div className="text-xl" aria-hidden="true">
                {icon}
              </div>
              <h2 className="mt-4 text-sm font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
