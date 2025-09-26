import { LogoLink } from "../link/LogoLink";
import { NavLink } from "../link/Link";
import {
  DiscordIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/svg/Socials";
import { InputGroup } from "../input/InputGroup";

export const Footer = () => {
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

  const links = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Rankings", href: "/rankings" },
    { name: "Connect a wallet", href: "/wallet" },
  ];

  const BoxContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col">{children}</div>
  );

  const BoxTitle = ({ title }: { title: string }) => (
    <h3 className="text-box-title font-semibold font-space-mono">{title}</h3>
  );

  const BoxContent = ({ children }: { children: React.ReactNode }) => (
    <div className="text-base text-celeste flex flex-col gap-6 mt-7">
      {children}
    </div>
  );

  return (
    <footer className="w-full bg-background-muted py-8 px-4">
      <div className="container-compact flex flex-col mx-auto p-3">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-3 m-auto lg:px-9 pb-6">
          <BoxContainer>
            <LogoLink fullyVisible />
            <BoxContent>
              <p>
                NFT marketplace UI created
                <br className="hidden lg:block" />
                with Anima for Figma.
              </p>
              <div>
                <p>Join our community</p>
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
            </BoxContent>
          </BoxContainer>

          <BoxContainer>
            <BoxTitle title="Explore" />
            <BoxContent>
              <ul className="flex flex-col gap-5">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <NavLink href={href}>{name}</NavLink>
                  </li>
                ))}
              </ul>
            </BoxContent>
          </BoxContainer>

          <BoxContainer>
            <BoxTitle title="Join Our Weekly Digest" />
            <BoxContent>
              <p>
                Get exclusive promotions & updates
                <br className="hidden lg:block" />
                straight to your inbox.
              </p>
              <InputGroup
                buttonText="Subscribe"
                buttonIcon="/buttons/envelope.svg"
                textFieldPlaceholder="Enter your email here"
                textFieldValue=""
              />
            </BoxContent>
          </BoxContainer>
        </div>
        <div className="border-t border-celeste-dark">
          <p className="text-xs text-celeste mt-4">
            © 2025 NFT Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
