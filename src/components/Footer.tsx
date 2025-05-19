import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#dee2e6] w-full min-h-12 py-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-gray-600 text-sm px-6">
        <span className="text-left">© 2025 SRL Global</span>
        <div className="flex flex-col md:flex-row space-x-6 text-left md:text-right">
          <Link href="/contact" className="cursor-pointer hover:text-gray-800 transition-colors duration-300">
            Contact
          </Link>
          <Link href="/pricing" className="cursor-pointer hover:text-gray-800 transition-colors duration-300">
            Pricing
          </Link>
          <Link href="/affiliates" className="cursor-pointer hover:text-gray-800 transition-colors duration-300">
            Affiliates
          </Link>
          <Link href="/terms" className="cursor-pointer hover:text-gray-800 transition-colors duration-300">
            Terms of Service
          </Link>
          <Link href="/privacy" className="cursor-pointer hover:text-gray-800 transition-colors duration-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
