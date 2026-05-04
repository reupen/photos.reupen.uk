{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
      nodejs_22
      pkg-config
      stdenv.cc
      vips
  ];
}
