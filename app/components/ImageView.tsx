import React from "react";
import { IMAGE_PLACEHOLDER, TMDB_BASE_IMAGE } from "~/lib/service";

type BackdropImageProps = {
  path: string | null;
  alt?: string;
  width?: number;
  height?: number;
  baseSize?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function ImageView({
  path,
  alt = "Backdrop image",
  width = 1920,
  height = 1080,
  baseSize = "/w1920_and_h1080_multi_faces/",
  className = "",
  style = {},
}: BackdropImageProps) {
  return (
    <img
      src={path !== null ? `${TMDB_BASE_IMAGE}${baseSize}${path}` : IMAGE_PLACEHOLDER}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover w-full h-full ${className}`}
      style={{ aspectRatio: `${width}/${height}`, objectFit: "cover", ...style }}
    />
  );
}
