# FEVER — Honored Guest

A production-minded, mobile-first private invitation for an exclusive FEVER event.
The demo invitation is available at `/invitation/AGUS0017`.

## Local development

```bash
npm install
npm run dev
```

Use `npm run build` for a production build, `npm run lint` for static checks,
and `npm run format` to apply the included Prettier configuration.

## Personalization

Guest, membership, and event information lives in
`data/invitations.ts`. Add a new typed record keyed by its invitation token;
the matching private link is `/invitation/TOKEN`.

The first version stores acceptance in the browser. `useInvitationState.ts` is
the seam for a future database integration, with future environment keys listed
in `.env.example`.

## Replacing assets

- **Logo:** The FEVER wordmark is intentionally text-only until the official
  asset is supplied. Guidance is in `public/brand/README.md`.
- **Photos and video:** Replace `public/media/fever-atmosphere.webp` and follow
  `public/media/README.md` for sizes and formats.
- **Card texture:** Adjust the physical material in `GuestCardScene.tsx` and the
  matching CSS surface in `GuestCardFallback.tsx`.
- **Social preview:** Replace `public/og.png` with a 1200 × 630 approved campaign
  image if needed.
- **Event details:** Update the typed invitation record’s date, time, venue, and
  address.

## Production notes

The invitation route is marked `noindex`. Heavy 3D code is lazy-loaded, WebGL
has a CSS fallback, reduced-motion preferences are honored, and low-powered
devices use a simplified render path. Wallet buttons are prepared for a future
pass endpoint but intentionally do not issue unsigned wallet passes.

The project includes `vercel.json` for Vercel and `.openai/hosting.json` for
OpenAI Sites deployment.
