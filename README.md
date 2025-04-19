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

Linux is required to build the site, due to the use of a custom build of
[libvips](https://github.com/libvips/libvips/) with
[sharp](https://github.com/lovell/sharp).

To build the site:

1. Install [Node.js](https://nodejs.org/en/)
2. Install [Python](https://www.python.org/)
3. Install [Nix](https://nixos.org/download/)
4. Start a Nix shell:

   ```shell
   nix-shell
   ```

5. Install JavaScript dependencies:

   ```shell
   npm install
   ```

6. Build the site:

   ```shell
   npm run build
   ```

7. Run the preview server:

   ```shell
   npm run preview
   ```

[See the Astro documentation](https://docs.astro.build/en/) for more information
on using Astro.
