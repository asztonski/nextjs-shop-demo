import Image from "next/image";
import { Button } from "@/components/ui/button/Button";
import {
  DiscordIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/svg/Socials";

const charts = [
  { value: "240k+", label: "volume" },
  { value: "100k+", label: "nfts sold" },
  { value: "240k+", label: "followers" },
];

const socials = [
  {
    name: "Discord",
    icon: <DiscordIcon />,
    href: "https://discord.com",
  },
  {
    name: "Youtube",
    icon: <YoutubeIcon />,
    href: "https://youtube.com",
  },
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    href: "https://x.com",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    href: "https://instagram.com",
  },
];

export default function ProfilePage() {
  return (
    <div className="pb-16">
      <div className="w-full h-64 sm:h-72 xl:h-80 bg-fixed bg-[url('/images/profile-bg.jpg')] bg-no-repeat bg-position-[center_top] sm:bg-position-[0_20%] sm:bg-contain" />
      <div className="w-full flex items-center sm:items-start flex-col max-w-sm md:max-w-xl xl:max-w-5xl px-2 mx-auto -mt-16">
        <div className="rounded-xl relative border-2 border-background overflow-hidden w-30 h-30">
          <Image fill src="/images/avatar.webp" alt="User's Avatar" />
        </div>
        <div className="mt-8 w-full">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col xl:flex-row gap-4 w-full justify-between">
              <h2 className="font-semibold text-3xl xl:text-6xl">Animakid</h2>
              <Button className="py-4 h-max !w-full sm:!w-max">
                Edit Profile
              </Button>
            </div>

            <div className="flex gap-1 xl:w-1/2 justify-between">
              {charts.map(({ value, label }) => (
                <div key={label}>
                  <h3 className="text-xl sm:text-3xl font-bold font-space-mono">
                    {value}
                  </h3>
                  <p className="sm:text-2xl capitalize mt-1">{label}</p>
                </div>
              ))}
            </div>
            <div className="sm:text-xl">
              <p className="font-space-mono text-celeste-dark font-bold">Bio</p>
              <p className="mt-4">
                The Internet&#39;s Friendliest Designer Kid.
              </p>
            </div>
            <div className="text-xl">
              <p className="font-space-mono text-celeste-dark font-bold">
                Links
              </p>
              <ul className="flex items-center gap-3 mt-3">
                {socials.map(({ name, href, icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex hover:text-accent"
                      aria-label={name}
                    >
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
