# assets-src

Put your **original** photos and screenshots here. Nothing in this folder is
deployed directly — `yarn images` reads it and writes optimized WebP files to
`public/img/`, which is what the site actually uses.

## Where things go

```
assets-src/
  portrait/                                 your photo
  projects/mero-loksewa/                    screenshots for this project
  projects/mero-loksewa-backend/
  projects/max-media-survey-app/
  projects/max-media-admin-dashboard/
  projects/max-media-backend/
  projects/invoice-app/
  projects/invoice-app-backend/
```

## File types

`png`, `jpg`, `jpeg` or `webp`. Nothing else.

## File names

Lowercase, hyphens instead of spaces, no spaces at all. For example:

```
01-home.png
02-checkout.jpg
```

The portrait is special: it must be named `portrait.jpg`, `portrait.png` or
`portrait.webp` (one of the three, whichever format you have).

## Sizing and cropping

- **Portrait:** crop it to roughly a 4:5 ratio (a bit taller than wide), with
  your face in the upper half of the frame.
- **Phone screenshots:** leave them at their original size, straight off the
  device.
- **Dashboard/desktop screenshots:** at least 1440 px wide.

## What does not go here

Screen recordings and videos never go here — those are not deployed at all
from the repo. They live on Cloudflare R2 instead.

## After adding or changing images

Run:

```
yarn images
```

This regenerates the optimized files in `public/img/`.

## Never overwrite a published image

If an image has already shipped (it is referenced from a page and has been
deployed), do not replace its file. Add a new file with a new name instead,
so old cached copies never end up mismatched with new content.
