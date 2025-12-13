import Image from "next/image";
import Link from "next/link";
import { generateRandomHeroData } from "@/helpers/assetGenerator";
import { ButtonLink } from "@/components/ui/link/Link";
import RocketIcon from "@/public/buttons/rocket.svg";

const charts = [
  { value: "240k+", label: "total sell" },
  { value: "100k+", label: "auctions" },
  { value: "240k+", label: "artists" },
];

const HeroCard = ({ className }: { className?: string }) => {
  // all logic runs on the server at request time
  const data = generateRandomHeroData();

  return (
    <Link
      href="/"
      className={`flex justify-center items-center max-w-56 md:max-w-none w-full mx-auto h-72 sm:h-96 md:h-150 perspective-midrange ${className}`}
    >
      <div className="bg-background-muted relative overflow-hidden rounded-2xl p-4 flex flex-col gap-4 w-full md:w-3/4 h-full sm:h-4/5 mx-auto origin-center transform-gpu will-change-transform transform-3d wobble">
        {/* --- Main NFT image --- */}
        <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 relative">
          <Image
            src={data.nftUrl}
            alt={`Generated art`}
            fill
            className="object-cover w-full h-full relative"
            unoptimized
            priority
          />
        </div>

        {/* --- Author row --- */}
        <div className="flex gap-2 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 relative">
            {/* Skeleton placeholder (always visible until image is ready client-side) */}
            <div className="absolute inset-0 animate-pulse bg-gray-300" />
            <Image
              src={data.avatarUrl}
              alt={`Generated avatar`}
              width={48}
              height={48}
              className="object-cover relative"
              unoptimized
              priority
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">{data.author}</h3>
            <p className="flex gap-2 items-center text-sm">
              <span className="capitalize text-celeste-dark">total sales:</span>
              <span className="font-semibold">{data.sales}</span>
            </p>
          </div>
        </div>
        {/* Radial Gradient Background (tylko dekoracja) */}
        <div className="absolute -z-10 w-[300%] h-full top-0 -left-full right-0 mx-auto rounded-2xl pointer-events-none reflection" />
      </div>
    </Link>
  );
};

export const Hero = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-x-2 gap-y-8 sm:gap-y-0">
      <div className="gap-2 md:gap-7 flex flex-col h-max">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold">
          Discover Digital Art & Collect Nfts
        </h1>
        <h2 className="text-base md:text-2xl">
          Nft Marketplace Ui Created With Anima For Figma. Collect, Buy And Sell
          Art From More Than 20k Nft Artists.
        </h2>
      </div>
      <HeroCard className="row-span-2" />
      <div className="flex flex-col gap-8">
        <ButtonLink
          href="/sign-up"
          alt="Icon of a rocket"
          className="py-4 px-10 !w-full md:!w-max"
          icon={RocketIcon}
        >
          Get Started
        </ButtonLink>
        <div className="flex w-full justify-between px-2 gap-1">
          {charts.map(({ value, label }) => (
            <div key={label}>
              <h3 className="text-xl md:text-3xl font-bold font-space-mono">
                {value}
              </h3>
              <p className="md:text-2xl capitalize mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
