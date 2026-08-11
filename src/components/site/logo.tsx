import logoAsset from "@/assets/dosa-ganesh-logo.asset.json";

export function Logo({
  className = "",
  size = 40,
  alt = "Ganesh Dosa — Live Dosa, Melbourne",
}: {
  className?: string;
  size?: number;
  alt?: string;
}) {
  return (
    <img
      src={logoAsset.url}
      alt={alt}
      width={size}
      height={size}
      loading="eager"
      className={className}
    />
  );
}

export const logoUrl = logoAsset.url;
