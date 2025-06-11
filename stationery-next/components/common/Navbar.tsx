import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import { ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getCategories } from "@/lib/tools/api";
import { capitalizeFirstLetter } from "@/lib/utils/helperFunctions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { CategoryNav, INavConfig } from "@/lib/types/navbar.type";
import LogoutBtn from "./buttons/LogoutBtn";

const NavListDesktop = ({ navigation }: { navigation: INavConfig[] }) => {
  return (
    <div className="hidden sm:ml-6 sm:flex items-center">
      <div className="flex space-x-4">
        {navigation.map((item) =>
          item?.dropdown ? (
            <Menu as="div" key={item.name} className="relative">
              <MenuButton className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none">
                {item.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </MenuButton>
              <MenuItems className="absolute z-10 mt-2 w-40 rounded-md bg-popover shadow-lg ring-1 ring-border focus:outline-none">
                {item.items?.map((subItem) => (
                  <MenuItem key={subItem.name}>
                    <Link
                      href={subItem.href}
                      className={"block px-4 py-2 text-sm text-popover-foreground"}
                    >
                      {subItem.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          ) : (
            <Link
              key={item.name}
              href={item.href || "/products"}
              className={"text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium"}
            >
              {item.name}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

const NavListMobile = ({ navigation }: { navigation: INavConfig[] }) => {
  return (
    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) =>
          item.dropdown ? (
            <Disclosure key={item.name} as="div" className="space-y-1">
              <>
                <DisclosureButton className="flex w-full items-center rounded-md px-3 py-2 text-left text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none">
                  <span>{item.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DisclosureButton>
                <DisclosurePanel className="space-y-1 pl-5">
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </DisclosurePanel>
              </>
            </Disclosure>
          ) : (
            <DisclosureButton
              key={item.name}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Link href={item.href || "/products"}>{item.name}</Link>
            </DisclosureButton>
          )
        )}
      </div>
    </DisclosurePanel>
  );
};

const AuthMenu = ({ session }: { session: Session | null }) => {
  const user = session?.user;

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {user ? (
        <>
          <Link
            href={"/cart"}
            className="relative rounded-full bg-background p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-offset-2 focus:ring-offset-background"
          >
            <span className="sr-only">View cart</span>
            <ShoppingCartIcon aria-hidden="true" className="size-6" />
          </Link>

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex rounded-full text-sm bg-background focus:outline-none focus:ring-offset-2 focus:ring-offset-background">
                <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.firstName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-popover py-1 shadow-lg ring-1 ring-border focus:outline-none transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <MenuItem>
                <Link
                  href="/user/profile"
                  className={
                    "block px-4 py-2 text-sm text-popover-foreground data-focus:outline-hidden"
                  }
                >
                  Your Profile
                </Link>
              </MenuItem>
              <LogoutBtn />
            </MenuItems>
          </Menu>
        </>
      ) : (
        <div>
          <Link
            href="/auth/login"
            className={
              "text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className={
              "text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const categories = await getCategories();

  const categoryNav: CategoryNav[] = categories.data.map((category) => ({
    name: capitalizeFirstLetter(category.name),
    href: `/products?category=${category._id}`,
  }));

  const navigation: INavConfig[] = [
    { name: "Products", href: "/products" },
    { name: "Categories", dropdown: true, items: categoryNav },
  ];

  return (
    <Disclosure as="nav" className="bg-background text-foreground shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-offset-2 focus:ring-offset-background">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                src="/logo.png"
                alt="ATE logo"
                height={100}
                width={100}
                priority
                className="h-14 w-auto"
              />
            </div>
            <NavListDesktop navigation={navigation} />
          </div>

          <AuthMenu session={session} />
        </div>
      </div>

      {/* Mobile panel */}
      <NavListMobile navigation={navigation} />
    </Disclosure>
  );
}