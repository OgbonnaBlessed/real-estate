"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, LayoutDashboardIcon, LogOut, MessageCircle, Plus, Search, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();

    const isDashboardPage =
        pathname.includes("/managers") || pathname.includes("/tenants");

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/";
    };

    return (
        <div
            className="fixed top-0 left-0 w-full z-50 shadow-xl"
            style={{ height: `${NAVBAR_HEIGHT}px` }}
        >
            <div className="flex justify-between items-center w-full py-3 px-8 bg-(--primary-700) text-white">
                <div className="flex items-center gap-4 md:gap-6">
                    {isDashboardPage && (
                        <div className="md:hidden">
                            <SidebarTrigger />
                        </div>
                    )}
                    <Link
                        href="/"
                        scroll={false}
                    >
                        <Image
                            src="/logo.png"
                            alt="Terra Haven Logo"
                            width={96}
                            height={96}
                        />
                    </Link>
                    {isDashboardPage && authUser && (
                        <Button
                            variant="secondary"
                            className="md:ml-4 bg-(--primary-50) text-(--primary-700) hover:bg-(--secondary-500) hover:text-(--primary-50)"
                            onClick={() =>
                                router.push(
                                authUser.userRole?.toLowerCase() === "manager"
                                    ? "/managers/newproperty"
                                    : "/search"
                                )
                            }
                        >
                        {authUser.userRole?.toLowerCase() === "manager" ? (
                            <>
                                <Plus className="h-4 w-4" />
                                <span className="hidden md:block ml-2">Add New Property</span>
                            </>
                        ) : (
                            <>
                                <Search className="h-4 w-4" />
                                <span className="hidden md:block ml-2">
                                    Search Properties
                                </span>
                            </>
                        )}
                        </Button>
                    )}
                </div>
                {!isDashboardPage && (
                    <p className="text-(--primary-200) hidden md:block">
                        Discover your perfect rental apartment with our advanced search
                    </p>
                )}
                <div className="flex items-center gap-5">
                {authUser ? (
                    <>
                    <div className="relative hidden md:block">
                        <MessageCircle className="w-6 h-6 cursor-pointer text-(--primary-200) hover:text-(--primary-400)" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-(--secondary-700) rounded-full"></span>
                    </div>
                    <div className="relative hidden md:block">
                        <Bell className="w-6 h-6 cursor-pointer text-(--primary-200) hover:text-(--primary-400)" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-(--secondary-700) rounded-full"></span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none cursor-pointer">
                        <Avatar>
                            <AvatarImage src={authUser.userInfo?.image} />
                            <AvatarFallback className="bg-(--primary-600)">
                            {authUser.userRole?.[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-(--primary-200) hidden md:block">
                            {authUser.userInfo?.name}
                        </p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white text-(--primary-700)">
                            <DropdownMenuItem
                                className="cursor-pointer hover:!bg-(--primary-700) hover:!text-(--primary-100) font-bold flex items-center gap-5 transition-all duration-300 ease-in-out"
                                onClick={() =>
                                    router.push(
                                        authUser.userRole?.toLowerCase() === "manager"
                                            ? "/managers/properties"
                                            : "/tenants/favorites",
                                        { scroll: false }
                                    )
                                }
                            >
                                <LayoutDashboardIcon />
                                <p>Go to Dashboard</p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-(--primary-200)" />
                            <DropdownMenuItem
                                className="cursor-pointer hover:!bg-(--primary-700) hover:!text-(--primary-100) flex items-center gap-5 transition-all duration-300 ease-in-out"
                                onClick={() =>
                                    router.push(
                                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                                        { scroll: false }
                                    )
                                }
                            >
                                <Settings />
                                <p>Settings</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer hover:!bg-(--primary-700) hover:!text-(--primary-100) flex items-center gap-5 transition-all duration-300 ease-in-out"
                                onClick={handleSignOut}
                            >
                                <LogOut />
                                <p>Sign out</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </>
                ) : (
                    <>
                    <Link href="/signin">
                        <Button
                            variant="outline"
                            className="text-white border-white bg-transparent hover:bg-white hover:text-(--primary-700) rounded-lg"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button
                            variant="secondary"
                            className="text-white bg-(--secondary-600) hover:bg-white hover:text-(--primary-700) rounded-lg cursor-pointer"
                        >
                            Sign Up
                        </Button>
                    </Link>
                    </>
                )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;