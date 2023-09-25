# photos.reupen.uk

This repo contains the source for [photos.reupen.uk](https://photos.reupen.uk),
a website I created for displaying photos I’ve taken.

The site was built using [Astro](https://astro.build) and uses
[Sharp](https://sharp.pixelplumbing.com/) to convert images.

Most source images are stored as downscaled lossless 8-bit WebP files, which are
converted to lossy AVIF and WebP images when building the site.

[Git Large File Storage (LFS)](https://git-lfs.com/) is used to manage large
files.

## Building the site

To build the site:

1. Install [Node.js](https://nodejs.org/en/)
2. Install [Python](https://www.python.org/)
3. Run `npm install`
4. Run `npm run build`

[See the Astro documentation](https://docs.astro.build/en/) for more information
on using Astro.
