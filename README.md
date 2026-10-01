# AntamScript Documentation

Documentation site for AntamScript.

## Development

Run the development server:

```bash
pnpm dev
```

Then open http://localhost:3000.

## Project Structure

- `app/(home)` contains the landing page and home routes.
- `app/docs` contains the documentation routes.
- `app/api/search/route.ts` provides documentation search.
- `content/docs` contains the documentation content.
- `lib/source.ts` configures the documentation content source.

## Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm types:check
pnpm lint
```
