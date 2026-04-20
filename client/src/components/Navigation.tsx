import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Zap, Plus } from "lucide-react";

/**
 * Navigation Component
 * 
 * Design Philosophy: Constructivista Moderno
 * - Clean header with clear navigation structure
 * - TPACK color palette (Blue: CK, Green: PK, Orange: TK)
 * - Poppins font for titles, Inter for body text
 * - Subtle shadows and smooth transitions
 */
export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">ATE-TPACK</h1>
              <p className="text-xs text-gray-500">Diseñador de Actividades</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/learn" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Aprender
            </Link>
            <Link href="/example" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Ejemplo
            </Link>
          </div>

          {/* CTA Button */}
          <Link href="/creator">
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white gap-2 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Crear ATE</span>
              <span className="sm:hidden">Crear</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
