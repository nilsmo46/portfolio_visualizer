"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX, HiChevronDown, HiUserCircle } from "react-icons/hi";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/constants";

interface NavLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface NavSection {
    header: string;
    links: NavLink[];
}

interface NavItem {
    name: string;
    type: 'link' | 'dropdown';
    href?: string;
    dropdown: boolean;
    position?: 'right' | 'left';
    sections?: NavSection[];
}

const navItems: NavItem[] = [
    {
        name: 'Analysis',
        type: 'link',
        href: '/analysis',
        dropdown: false
    },
    {
        name: 'Markets',
        type: 'link',
        href: '/markets',
        dropdown: false
    },
    {
        name: 'Docs',
        type: 'link',
        href: '/docs',
        dropdown: false
    },
    {
        name: 'Region',
        type: 'dropdown',
        dropdown: true,
        sections: [
            {
                header: 'Active: North America',
                links: [
                    { label: 'Change', href: '#' }
                ]
            }
        ]
    },
    {
        name: 'Tools',
        type: 'dropdown',
        dropdown: true,
        sections: [
            {
                header: 'Portfolio Analysis',
                links: [
                    { label: 'Backtest Asset Class Allocation', href: '#' },
                    { label: 'Backtest Portfolio', href: '#' },
                    { label: 'Manager Performance Analysis', href: '#' }
                ]
            },
            {
                header: 'Portfolio Simulation',
                links: [
                    { label: 'Monte Carlo Simulation', href: '#' },
                    { label: 'Financial Goals', href: '#' }
                ]
            },
            {
                header: 'Optimization',
                links: [
                    { label: 'Efficient Frontier', href: '#' },
                    { label: 'Portfolio Optimization', href: '#' },
                    { label: 'Black-Litterman Model', href: '#' },
                    { label: 'Rolling Optimization', href: '#' }
                ]
            },
            {
                header: 'Asset Analytics',
                links: [
                    { label: 'Fund Screener', href: '#' },
                    { label: 'Fund Performance', href: '#' },
                    { label: 'Asset Correlations', href: '#' }
                ]
            },
            {
                header: 'Factor Analysis',
                links: [
                    { label: 'Factor Regression', href: '#' },
                    { label: 'Risk Factor Allocation', href: '#' },
                    { label: 'Fund and ETF Factor Regressions', href: '#' },
                    { label: 'Factor Performance Attribution', href: '#' }
                ]
            },
            {
                header: 'Tactical Allocation',
                links: [
                    { label: 'Tactical Allocation Models', href: '#' }
                ]
            },
            {
                header: 'Other',
                links: [
                    { label: 'Show All', href: '#' }
                ]
            }
        ]
    },
    {
        name: 'Sign Up',
        type: 'link',
        href: '/signup',
        dropdown: false,
        position: 'right'
    },
    {
        name: 'Log In',
        type: 'link',
        href: '/login',
        dropdown: false,
        position: 'right'
    },
];

const Navbar = () => {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        async function verifyLogin() {
            const token = localStorage.getItem("token");
            if (token) {
                setLoading(true);
                try {
                    const res = await axios.get(`${baseURL}/auth/verify`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.data) {
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        }
        verifyLogin();
    }, []);

    useEffect(() => {
        dropdownRefs.current = dropdownRefs.current.slice(0, navItems.length);

        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown !== null &&
                dropdownRefs.current[activeDropdown] &&
                dropdownRefs.current[activeDropdown] &&
                !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, [activeDropdown]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleDropdownToggle = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleMouseEnter = (index: number) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setActiveDropdown(index);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 300);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    const mainNavItems = navItems.filter(item => item.position !== 'right');
    const rightNavItems = isLoggedIn ? [] : navItems.filter(item => item.position === 'right');

    return (
        <div className="flex flex-col">
            {/* Sticky Navbar */}
            <nav className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 px-6 flex items-center justify-between shadow-lg sticky top-0 z-50">
                <div className="font-bold text-xl text-indigo-800">
                    <Link href={"/"} className="hover:text-indigo-600 transition-colors duration-300 flex items-center">
                        <span className="bg-indigo-600 text-white p-1 rounded-md mr-2">PV</span>
                        Portfolio Visualizer
                    </Link>
                </div>

                {/* Desktop Menu - Main Items */}
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex space-x-6">
                        {mainNavItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative"
                                ref={el => { dropdownRefs.current[index] = el }}
                                onMouseEnter={() => item.dropdown ? handleMouseEnter(index) : null}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.dropdown ? (
                                    <button
                                        onClick={() => handleDropdownToggle(index)}
                                        className={`text-gray-700 hover:text-indigo-600 text-sm font-medium py-2 px-3 rounded-md transition-all duration-300 flex items-center
                                            ${activeDropdown === index ? 'bg-indigo-50 text-indigo-600' : ''}`}
                                    >
                                        {item.name}
                                        <HiChevronDown
                                            className={`ml-1 h-4 w-4 inline-block transition-transform duration-300 
                                                ${activeDropdown === index ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href as string}
                                        className="text-gray-700 hover:text-indigo-600 text-sm font-medium py-2 px-3 rounded-md transition-all duration-300 inline-block"
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {item.dropdown && activeDropdown === index && (
                                    <div
                                        className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn"
                                        style={{
                                            width: item.name === 'Tools' ? '300px' : '220px',
                                            maxHeight: '80vh',
                                            overflowY: 'auto',
                                            transform: `translateX(${item.name === 'Tools' ? '-25%' : '0'})`,
                                        }}
                                        onMouseEnter={() => { if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); } }}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item.sections?.map((section, sIdx) => (
                                            <div key={sIdx} className="py-1">
                                                {section.header && (
                                                    <h4 className="px-4 py-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 border-b border-indigo-100">
                                                        {section.header}
                                                    </h4>
                                                )}
                                                <div className="py-1">
                                                    {section.links.map((link, lIdx) => (
                                                        <Link
                                                            key={lIdx}
                                                            href={link.href}
                                                            className="px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-200 flex items-center"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            {link.icon && <span className="mr-2 text-indigo-500">{link.icon}</span>}
                                                            {link.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Menu - Right Items or User Avatar */}
                <div className="hidden md:flex space-x-4">
                    {isLoggedIn ? (
                        <div className="relative" ref={el => { dropdownRefs.current[mainNavItems.length] = el; }}>
                            <button
                                onClick={() => handleDropdownToggle(mainNavItems.length)}
                                className="flex items-center text-sm font-medium py-2 px-4 rounded-md transition-all duration-300 text-indigo-600 hover:bg-indigo-50"
                            >
                                <HiUserCircle className="h-6 w-6 mr-1" />
                                <span>Account</span>
                                <HiChevronDown
                                    className={`ml-1 h-4 w-4 inline-block transition-transform duration-300 
                                        ${activeDropdown === mainNavItems.length ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {activeDropdown === mainNavItems.length && (
                                <div
                                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-48 animate-fadeIn"
                                    onMouseEnter={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-200"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-200"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition duration-200"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        rightNavItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href as string}
                                className={`text-sm font-medium py-2 px-4 rounded-md transition-all duration-300 
                                    ${item.name === 'Sign Up' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'text-indigo-600 hover:bg-indigo-50'}`}
                            >
                                {item.name}
                            </Link>
                        ))
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-700 hover:text-indigo-600 transition duration-300"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-slideDown">
                    {navItems.filter(item => !isLoggedIn || item.position !== 'right').map((item, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-b-0">
                            {item.dropdown ? (
                                <>
                                    <button
                                        className="w-full px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 flex items-center justify-between"
                                        onClick={() => handleDropdownToggle(index)}
                                    >
                                        <span>{item.name}</span>
                                        <HiChevronDown
                                            className={`h-4 w-4 transition-transform duration-300 
                                                ${activeDropdown === index ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {activeDropdown === index && (
                                        <div className="bg-gray-50 border-l-2 border-indigo-400 ml-6">
                                            {item.sections?.map((section, sIdx) => (
                                                <div key={sIdx} className="py-1">
                                                    {section.header && (
                                                        <h4 className="px-4 py-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                                                            {section.header}
                                                        </h4>
                                                    )}
                                                    {section.links.map((link, lIdx) => (
                                                        <Link
                                                            key={lIdx}
                                                            href={link.href}
                                                            className="px-6 py-2.5 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition duration-300 flex items-center"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {link.icon && <span className="mr-2 text-indigo-500">{link.icon}</span>}
                                                            {link.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href as string}
                                    className={`block w-full px-6 py-3 transition duration-300 
                                        ${item.position === 'right' && item.name === 'Sign Up' 
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}

                    {/* Add logout button for mobile when logged in */}
                    {isLoggedIn && (
                        <div className="border-t border-gray-200 mt-2">
                            <Link
                                href="/profile"
                                className="block w-full px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="block w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 transition duration-300"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Loading indicator */}
            {loading && (
                <div className="fixed top-0 left-0 w-full h-1 bg-indigo-100">
                    <div className="h-full bg-indigo-600 animate-pulse" style={{ width: '30%' }}></div>
                </div>
            )}
        </div>
    );
};

export default Navbar;