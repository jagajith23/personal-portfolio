import Image from "next/image";

/**
 * A company's wordmark set inline with running text, standing in for its name.
 * Sized in `em` so it scales with the surrounding type. Both the link and the
 * image stay plain inline boxes so the image's bottom edge lands exactly on the
 * text baseline (an inline-block wrapper pushes it down to the line bottom),
 * and 1.05em makes the wordmark's lowercase match the text's x-height.
 */
export default function CompanyMark({
  name,
  href,
  logo,
  width,
  height,
}: {
  name: string;
  href: string;
  logo: string;
  width: number;
  height: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group"
    >
      <Image
        src={logo}
        alt=""
        width={width}
        height={height}
        className="inline h-[1.05em] w-auto align-baseline origin-bottom-left transition-transform duration-200 ease-out group-hover:-rotate-3 group-hover:scale-105"
      />
    </a>
  );
}

export const XOME = {
  name: "Xome",
  href: "https://www.xome.com/",
  logo: "/xome-mark.png",
  width: 860,
  height: 406,
};
