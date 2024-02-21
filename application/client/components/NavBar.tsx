"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Image from "next/image";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathName = usePathname();

  const router = useRouter();

  const menuItems = [
    { id: 0, display: "Courses", href: "/courses" },
    { id: 1, display: "Analyzers", href: "/analyzers" },
    { id: 2, display: "Search", href: "/search" },
    { id: 3, display: "About", href: "/about" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            width={170}
            height={35.86}
            alt="GitSpect logo"
            src="/gitspect_logo1.png"
          ></Image>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.id} isActive={pathName.startsWith(item.href)}>
            <Link color="foreground" href={item.href}>
              {item.display}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarItem>
        <Button as={Link} color="primary" href="/admin" variant="flat">
          Profile
        </Button>
      </NavbarItem>
      <NavbarMenu className="mt-5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={"foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.display}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
