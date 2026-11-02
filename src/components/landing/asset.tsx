import { withBasePath } from "@/lib/base-path";

type AssetProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

export function Asset({ src, alt = "", width, height, className }: AssetProps) {
  return (
    <img
      src={withBasePath(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={false}
    />
  );
}
