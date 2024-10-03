'use client'
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { img } from "framer-motion/client";

export const Navbar = ({children}) => {
  return (
    <div className="bg-neutral-950 z-[9999]">
      <RoundedDrawerNav
        links={[
          {
            title: "Product",
            sublinks: [
              {
                title: "Issues",
                href: "#",
              },
              {
                title: "Kanban",
                href: "#",
              },
              {
                title: "Gantt",
                href: "#",
              },
              {
                title: "Mind Maps",
                href: "#",
              },
            ],
          },
          {
            title: "Solutions",
            sublinks: [
              {
                title: "Product Management",
                href: "#",
              },
              {
                title: "Marketing",
                href: "#",
              },
              {
                title: "IT",
                href: "#",
              },
            ],
          },
          {
            title: "Documentation",
            sublinks: [
              {
                title: "API Docs",
                href: "#",
              },
              {
                title: "University",
                href: "#",
              },
            ],
          },
          {
            title: "Media",
            sublinks: [
              {
                title: "Videos",
                href: "#",
              },
              {
                title: "Socials",
                href: "#",
              },
              {
                title: "Blog",
                href: "#",
              },
            ],
          },
          {
            title: "Pricing",
            sublinks: [
              {
                title: "Startup",
                href: "#",
              },
              {
                title: "Smalls Business",
                href: "#",
              },
              {
                title: "Enterprise",
                href: "#",
              },
            ],
          },
        ]}
        navBackground="bg-neutral-950"
        bodyBackground="bg-white"
      >
        <div className="flex flex-col items-center justify-center px-1 py-1">
          {children}
        </div>
      </RoundedDrawerNav>
    </div>
  );
};

const RoundedDrawerNav = ({
  children,
  navBackground,
  bodyBackground,
  links,
}) => {
  const [hovered, setHovered] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeSublinks = useMemo(() => {
    if (!hovered) return [];
    const link = links.find((l) => l.title === hovered);

    return link ? link.sublinks : [];
  }, [hovered]);

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        className={`${navBackground} p-4`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Logo />
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
            />
          </div>
          
          <button
            onClick={() => setMobileNavOpen((pv) => !pv)}
            className="mt-0.5 block text-2xl text-neutral-50 md:hidden"
          >
            <FiMenu />
          </button>
        </div>
        <MobileLinks links={links} open={mobileNavOpen} />
      </nav>
      <motion.main layout className={`${navBackground} px-2 pb-2`}>
        <div className={`${bodyBackground} rounded-3xl`}>{children}</div>
      </motion.main>
    </>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
 <img src="/moyo-logo-white.png" className=" aspect-auto w-[40%] md:w-[15%]" alt="LOGO" />
  );
};

const DesktopLinks = ({ links, setHovered, hovered, activeSublinks }) => {
  return (
    <div className="ml-9 mt-0.5 hidden md:block">
      <div className="flex gap-6">
        {links.map((l) => (
          <TopLink key={l.title} setHovered={setHovered} title={l.title}>
            {l.title}
          </TopLink>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <a
                className="block text-2xl font-semibold text-neutral-50 transition-colors hover:text-neutral-400"
                href={l.href}
                key={l.title}
              >
                {l.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLinks = ({ links, open }) => {
  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            return (
              <div key={l.title} className="space-y-1.5">
                <span className="text-md block font-semibold text-neutral-50">
                  {l.title}
                </span>
                {l.sublinks.map((sl) => (
                  <a
                    className="text-md block text-neutral-300"
                    href={sl.href}
                    key={sl.title}
                  >
                    {sl.title}
                  </a>
                ))}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TopLink = ({ children, setHovered, title }) => (
  <span
    onMouseEnter={() => setHovered(title)}
    className="cursor-pointer text-neutral-50 transition-colors hover:text-neutral-400"
  >
    {children}
  </span>
);
