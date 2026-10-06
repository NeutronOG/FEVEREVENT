# Project verification

- Run `npm run lint`, `npx --no-install tsc --noEmit --incremental false`, and `npm run build` for static and production checks.
- `tests/rendered-html.test.mjs` still tests the removed starter skeleton and expects `dist/server/index.js` and `app/_sites-preview/SkeletonPreview.tsx`. The current Next.js build does not produce these files, so this suite is not a working regression check for the FEVER invitation.
- For browser layout checks, mock `/api/guests` before submitting the guest form. Do not create real guest records just to test presentation.
- The invitation content appears after holding the entry button for one second, completing the guest form, and waiting for the recognition sequence.
