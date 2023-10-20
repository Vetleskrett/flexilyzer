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

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathName = usePathname();

  const router = useRouter();

  const menuItems = [
    { display: "Courses", href: "/courses" },
    { display: "Analyzers", href: "/analyzers" },
    { display: "Search", href: "/search" },
    { display: "About", href: "/about" },
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
          <p className="font-bold text-inherit">GitSpect</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem isActive={pathName.startsWith(item.href)}>
            <Link color="foreground" href={item.href}>
              {item.display}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarItem>
        <Button as={Link} color="primary" href="/admin" variant="flat">
          Admin
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
