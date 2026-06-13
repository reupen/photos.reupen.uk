# photos.reupen.uk

This repo contains the source for [photos.reupen.uk](https://photos.reupen.uk),
a website I created for displaying photos I’ve taken.

The site was built using [Astro](https://astro.build) and uses
[sharp](https://sharp.pixelplumbing.com/) to convert images.

Most source images are stored as downscaled lossless 8-bit WebP files, which are
converted to lossy AVIF and WebP images when building the site.

[Git Large File Storage (LFS)](https://git-lfs.com/) is used to manage large
files.

## Building the site

A recent version of [libvips](https://github.com/libvips/libvips/) (including
the `vips` binary) is required. This can be installed, for example, using
[Pixi](https://pixi.prefix.dev/latest/). Unfortunately, Windows is unlikely to
work as `vips.exe` appears to have problems accepting AVIF files via standard
input there.

To build the site (on Linux):

1. Install [Node.js](https://nodejs.org/en/)
2. Install [Python](https://www.python.org/)
3. Install libvips, for example
   [as a global tool](https://pixi.prefix.dev/latest/global_tools/introduction/)
   using [Pixi](https://pixi.prefix.dev/latest/).
4. Install JavaScript dependencies:

   ```shell
   npm install
   ```

5. Build the site:

   ```shell
   npm run build
   ```

6. Run the preview server:

   ```shell
   npm run preview
   ```

[See the Astro documentation](https://docs.astro.build/en/) for more information
on using Astro.
