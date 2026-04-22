import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Download, Edit, Plus, BookOpen, Lightbulb, Zap, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Welcome() {
  const [accessCode, setAccessCode] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [searchMode, setSearchMode] = useState<"create" | "search" | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { data: ateData, isLoading: isLoadingAte } = trpc.ate.getByCode.useQuery(
    { accessCode: accessCode.trim() },
    { enabled: false }
  );

  const handleSearch = async () => {
    if (!accessCode.trim()) {
      toast.error("Por favor ingresa un código de acceso");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/trpc/ate.getByCode?input=${JSON.stringify({ accessCode: accessCode.trim() })}`, {
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Código de acceso incorrecto o no encontrado");
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      if (result.result.data) {
        toast.success("Trabajo encontrado. Cargando...");
        localStorage.setItem("ateFormData", JSON.stringify(result.result.data.data));
        localStorage.setItem("isEditMode", "true");
        window.location.href = "/creator";
      } else {
        toast.error("Código de acceso incorrecto");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error al buscar el trabajo:", error);
      toast.error("Error al buscar el trabajo");
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!accessCode.trim()) {
      toast.error("Por favor ingresa un código de acceso");
      return;
    }
    if (!downloadName.trim()) {
      toast.error("Por favor ingresa un nombre para descargar");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/trpc/ate.getByCode?input=${JSON.stringify({ accessCode: accessCode.trim() })}`, {
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Código de acceso incorrecto o no encontrado");
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      if (result.result.data) {
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result.result.data.data))
        );
        element.setAttribute("download", `${downloadName}.json`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success("Trabajo descargado correctamente");
      } else {
        toast.error("Código de acceso incorrecto");
      }
    } catch (error) {
      console.error("Error al descargar el trabajo:", error);
      toast.error("Error al descargar el trabajo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold">ATE-TPACK Creator</h2>
                  <p className="text-blue-100 text-lg mt-2">Diseñador de Actividades Tecnológicas Escolares</p>
                </div>
              </div>
            </div>
            
            <div className="p-12 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">¿Qué deseas hacer?</h3>
                <p className="text-gray-600 text-lg">Elige una opción para comenzar</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Create Option */}
                <button
                  onClick={() => {
                    setShowWelcomeModal(false);
                    setSearchMode("create");
                  }}
                  className="group p-8 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Plus className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Crear Nueva ATE</h4>
                  </div>
                  <p className="text-gray-600 text-left">Diseña una nueva Actividad Tecnológica Escolar desde cero</p>
                </button>

                {/* Search Option */}
                <button
                  onClick={() => {
                    setShowWelcomeModal(false);
                    setSearchMode("search");
                  }}
                  className="group p-8 rounded-xl border-2 border-green-200 hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Search className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Acceder a Trabajo</h4>
                  </div>
                  <p className="text-gray-600 text-left">Carga un trabajo guardado usando su código de acceso</p>
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Link href="/learn">
                  <Button variant="outline" className="w-full justify-center gap-2 py-6 text-base">
                    <BookOpen className="w-5 h-5" />
                    Aprender sobre TPACK
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {searchMode === null ? (
          // Hero Section
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              ATE-TPACK Creator
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Diseña experiencias de aprendizaje transformadoras integrando el modelo TPACK. 
              Combina Conocimiento de Contenido, Pedagógico y Tecnológico de forma coherente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/creator">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-lg gap-2 shadow-lg">
                  <Plus className="w-5 h-5" />
                  Crear Nueva ATE
                </Button>
              </Link>
              <button
                onClick={() => setSearchMode("search")}
                className="px-8 py-6 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Acceder a Trabajo
              </button>
            </div>
          </div>
        ) : searchMode === "create" ? (
          // Create Section
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setSearchMode(null)}
              className="mb-8 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Volver
            </button>
            <Card className="bg-white border-0 shadow-xl rounded-2xl p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Crear Nueva ATE</h2>
              </div>
              <p className="text-gray-600 mb-8 text-lg">
                Comienza a diseñar tu Actividad Tecnológica Escolar. Completa los campos requeridos y guarda tu trabajo.
              </p>
              <Link href="/creator">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-lg">
                  Ir al Creator
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </Card>
          </div>
        ) : (
          // Search Section
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setSearchMode(null)}
              className="mb-8 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Volver
            </button>
            <Card className="bg-white border-0 shadow-xl rounded-2xl p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Acceder a Trabajo</h2>
              </div>

              <div className="space-y-8">
                {/* Search Mode */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Código de Acceso
                    </label>
                    <div className="relative">
                      <Input
                        type={showAccessCode ? "text" : "password"}
                        placeholder="Ingresa el código de acceso"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        className="pr-12 py-6 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-0"
                      />
                      <button
                        onClick={() => setShowAccessCode(!showAccessCode)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showAccessCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg rounded-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Buscar y Editar
                      </>
                    )}
                  </Button>
                </div>

                {/* Download Mode */}
                <div className="border-t-2 border-gray-200 pt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">O descargar como JSON</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Código de Acceso
                      </label>
                      <div className="relative">
                        <Input
                          type={showAccessCode ? "text" : "password"}
                          placeholder="Ingresa el código de acceso"
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                          className="pr-12 py-6 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0"
                        />
                        <button
                          onClick={() => setShowAccessCode(!showAccessCode)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showAccessCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del archivo
                      </label>
                      <Input
                        type="text"
                        placeholder="Ej: mi-ate-2024"
                        value={downloadName}
                        onChange={(e) => setDownloadName(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleDownload()}
                        className="py-6 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0"
                      />
                    </div>
                    <Button
                      onClick={handleDownload}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Descargando...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Descargar JSON
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Info Cards */}
        {searchMode === null && (
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aprender</h3>
              <p className="text-gray-600 mb-4">Comprende el modelo TPACK y los 6 componentes de una ATE</p>
              <Link href="/learn">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                  Más información →
                </Button>
              </Link>
            </Card>

            <Card className="bg-white border-0 shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ejemplo</h3>
              <p className="text-gray-600 mb-4">Observa un caso práctico completo: Drones para monitoreo de erosión</p>
              <Link href="/example">
                <Button variant="ghost" className="text-green-600 hover:text-green-700 p-0">
                  Ver ejemplo →
                </Button>
              </Link>
            </Card>

            <Card className="bg-white border-0 shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Crear</h3>
              <p className="text-gray-600 mb-4">Diseña tu propia ATE con nuestro wizard interactivo</p>
              <Link href="/creator">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 p-0">
                  Comenzar →
                </Button>
              </Link>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
