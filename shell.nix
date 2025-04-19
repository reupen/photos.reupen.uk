{ pkgs ? import <nixpkgs> {} }:

let
  deps = with pkgs; [
    expat
    lcms
    libaom
    libexif
    libheif
    libjpeg
    libjxl
    libwebp
    glib
  ];

  libvipsSrc = pkgs.fetchFromGitHub {
    owner = "libvips";
    repo = "libvips";
    rev = "v8.16.1";
    sha256 = "sha256-8d//45oBBkCB/9hIrSjX99pkIifpz+B9RgfeCCm+zFs=";
  };

in pkgs.mkShell {
  buildInputs = deps;

  nativeBuildInputs = with pkgs; [
      cmake
      gcc
      pkg-config
      meson
      ninja
  ];

  shellHook = ''
    export LOCAL_PREFIX="$HOME/vips"
    export PKG_CONFIG_PATH="$LOCAL_PREFIX/lib/pkgconfig:$PKG_CONFIG_PATH"
    export LD_LIBRARY_PATH="$LOCAL_PREFIX/lib:${pkgs.lib.makeLibraryPath deps}:$LD_LIBRARY_PATH"
    export PATH="$LOCAL_PREFIX/bin:$PATH"

    build_libvips() {
      meson setup --prefix $LOCAL_PREFIX --libdir lib --buildtype release -Dintrospection=disabled ${libvipsSrc} .vips-build/build/
      meson compile -C .vips-build/build/
      meson install -C .vips-build/build/
    }

    mkdir -p $LOCAL_PREFIX
  '';
}
