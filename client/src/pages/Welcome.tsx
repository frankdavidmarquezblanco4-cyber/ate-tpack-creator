import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Download, Edit, Plus } from "lucide-react";
import { toast } from "sonner";

/**
 * Welcome Page
 * 
 * Design Philosophy: Constructivista Moderno
 * - Welcome message with clear call-to-action
 * - Search/access functionality for existing ATE
 * - Options to create new or manage existing work
 */
export default function Welcome() {
  const [accessCode, setAccessCode] = useState("");
  const [searchMode, setSearchMode] = useState<"create" | "search" | null>(null);

  const handleSearch = () => {
    if (!accessCode.trim()) {
      toast.error("Por favor ingresa un código de acceso");
      return;
    }

    const saved = localStorage.getItem("ateFormData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.secretCode === accessCode) {
          toast.success("Trabajo encontrado. Cargando...");
          // Redirect to creator with edit mode
          window.location.href = "/creator?edit=true";
        } else {
          toast.error("Código de acceso incorrecto");
        }
      } catch (error) {
        toast.error("Error al buscar el trabajo");
      }
    } else {
      toast.error("No hay trabajos guardados");
    }
  };

  const handleDownload = () => {
    if (!accessCode.trim()) {
      toast.error("Por favor ingresa un código de acceso");
      return;
    }

    const saved = localStorage.getItem("ateFormData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.secretCode === accessCode) {
          // Download as JSON
          const element = document.createElement("a");
          element.setAttribute(
            "href",
            "data:text/json;charset=utf-8," + encodeURIComponent(saved)
          );
          element.setAttribute("download", `${data.projectName || "ATE"}.json`);
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          toast.success("Trabajo descargado correctamente");
        } else {
          toast.error("Código de acceso incorrecto");
        }
      } catch (error) {
        toast.error("Error al descargar el trabajo");
      }
    } else {
      toast.error("No hay trabajos guardados");
    }
  };

  const heroImage =
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663346110887/mUVW2Zqd3icGMZExmrW5z6/hero-tpack-construction-V4qpmtEU6SvR9uH3SB8ZBc.webp";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.75), rgba(22, 163, 74, 0.75)), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
            ¡Bienvenido a ATE-TPACK Creator!
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Diseña experiencias de aprendizaje transformadoras integrando el modelo TPACK.
            Combina Conocimiento de Contenido, Pedagógico y Tecnológico de forma coherente.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Message */}
          {searchMode === null && (
            <div className="mb-12">
              <Card className="p-8 bg-white border-l-4 border-l-blue-600">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ¿Qué deseas hacer?
                </h2>
                <p className="text-gray-600 mb-8">
                  Elige si quieres crear una nueva Actividad Tecnológica Escolar o
                  acceder a un trabajo que ya has comenzado.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Create New */}
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Crear Nueva ATE
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Comienza desde cero con nuestro wizard interactivo paso a paso.
                    </p>
                    <Link href="/creator">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        Comenzar <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Access Existing */}
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Acceder a Trabajo Existente
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Usa tu código de acceso para editar o descargar un trabajo anterior.
                    </p>
                    <Button
                      onClick={() => setSearchMode("search")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      Buscar <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Search/Access Mode */}
          {searchMode === "search" && (
            <div className="mb-12">
              <Card className="p-8 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    onClick={() => setSearchMode(null)}
                    variant="outline"
                    className="gap-2"
                  >
                    ← Atrás
                  </Button>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Acceder a tu Trabajo
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Código de Acceso *
                    </label>
                    <Input
                      type="password"
                      placeholder="Ingresa tu código de acceso secreto"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="w-full"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Este es el código que creaste cuando iniciaste tu ATE.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Button
                      onClick={handleSearch}
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </Button>
                    <Button
                      onClick={() => {
                        setSearchMode(null);
                        setAccessCode("");
                      }}
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Aprender el Modelo
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Comprende los 6 componentes esenciales de una ATE.
              </p>
              <Link href="/learn">
                <Button
                  variant="outline"
                  className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Ir a Aprender
                </Button>
              </Link>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ver Ejemplo
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Observa un ejemplo completo de ATE estructurada.
              </p>
              <Link href="/example">
                <Button
                  variant="outline"
                  className="w-full text-green-600 border-green-600 hover:bg-green-50"
                >
                  Ver Ejemplo
                </Button>
              </Link>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-orange-600">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Crear Nueva ATE
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Comienza a diseñar tu propia actividad ahora.
              </p>
              <Link href="/creator">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Crear ATE
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
