'use client'
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, LogOutIcon } from "lucide-react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"
import Link from "next/link"
// import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/authAPI';
import { useToast } from '@/hooks/use-toast';

export default function CustomNavigation(props: { isMobile: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  // const { theme, setTheme } = useTheme()
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    async function logout() {
      try {
        const response = await authAPI.logout();
        if (response) {
          toast({
            title: 'Logout',
            description: 'You have been logged out successfully',
            variant: 'success',
          });
          router.push('/');
        }
      } catch (error) {
        toast({
          title: 'Logout',
          description: 'An error occurred while logging out',
          variant: 'destructive',
        });
        console.error(error);
      }
    }
    logout();
  }

  // const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`sticky ${props.isMobile? 'px-2': 'px-8'} top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
      <div className="flex h-14 items-center">
        <div className="cursor-pointer">
        <div className="flex items-center gap-x-2">
            <Link className="text-md flex items-center" href="/dashboard">
              <img
                src="/mytwoney-light.png"
                // height={46}
                // width={150}
                alt="Logo"
                className="w-[120px] lg:w-[150px]"
              />
            </Link>
          </div>
        </div>
        <div className="ml-2 hidden md:block">
          {/* <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Components
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>
        <div className="ml-auto cursor-pointer flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={localStorage.getItem('avatar')? '/avatars/'+localStorage.getItem('avatar'):undefined} alt="User avatar" className="rounded-full" />
                <AvatarFallback>{localStorage.getItem('username')?.charAt(0).toUpperCase() || 'NA'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />Profile
              </DropdownMenuItem>
                </Link>
              {/* <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                  <SunIcon className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> Theme
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => handleLogout()}><LogOutIcon className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          <Link href="/" className="px-2 py-1 hover:bg-accent transition-colors duration-200">
            Home
          </Link>
          <Link href="/" className="px-2 py-1 hover:bg-accent transition-colors duration-200">
            Components
          </Link>
          <Link href="/docs" className="px-2 py-1 hover:bg-accent transition-colors duration-200">
            Documentation
          </Link>
        </nav>
      </div> */}
    </div>
  );
}