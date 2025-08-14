import * as React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Check token on mount & whenever it changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);

    // Listen to storage changes (for other tabs)
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);

    // Listen for login events in the same tab
    const handleLoginEvent = () => {
      setLoggedIn(true);
    };
    const handleLogoutEvent = () => {
      setLoggedIn(false);
    };
    window.addEventListener("userLoggedIn", handleLoginEvent);
    window.addEventListener("userLoggedOut", handleLogoutEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", handleLoginEvent);
      window.removeEventListener("userLoggedOut", handleLogoutEvent);
    };
  }, [loggedIn]);

  // Theme handling
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.dispatchEvent(new Event("userLoggedOut")); // trigger event for other components
    navigate("/");
  };

  return (
    <>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 z-40 h-full w-64 bg-[#00B5C9] shadow-xl dark:bg-gray-950"
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-primary">Sidebar</h2>

              <button
                onClick={() => setSidebarOpen(false)}
                className="text-xl font-bold text-gray-600 dark:text-gray-300"
              >
                ✕
              </button>
            </div>
            <nav className="p-4 space-y-4">
              <Link
                to="/"
                className="block text-base font-medium text-gray-900 hover:text-[#00B5C9] dark:text-gray-200"
              >
                Home
              </Link>
              <Link
                to="/doctors"
                className="block text-base font-medium text-gray-800 hover:text-[#00B5C9] dark:text-gray-200"
              >
                Doctors
              </Link>
              <Link
                to="/about"
                className="block text-base font-medium text-gray-800 hover:text-[#00B5C9] dark:text-gray-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-base font-medium text-gray-800 hover:text-[#00B5C9] dark:text-gray-200"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#00B5C9] shadow-md" : "bg-transparent"
        } px-4 py-3`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link
            to="/"
            className="text-2xl font-extrabold text-shadow-md shadow-orange-300 text-[#003366] tracking-tight"
          >
            Medi<strong className="text-orange-400 text-pretty">vara</strong>
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold underline underline-offset-4"
                  : "text-white hover:text-primary"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold underline underline-offset-4"
                  : "text-white hover:text-primary"
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold underline underline-offset-4"
                  : "text-white hover:text-primary"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 underline underline-offset-4"
                  : "text-white hover:text-primary"
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {loggedIn ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button onClick={handleLogin}>Login</Button>
                <Button variant="link" onClick={handleLogin}>
                  Sign Up
                </Button>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="md:hidden">
                <Menu className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/doctors">Doctors</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {loggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
