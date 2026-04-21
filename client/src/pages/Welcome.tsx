import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Download, Edit, Plus, BookOpen, Lightbulb, Zap, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Welcome() {
  const [accessCode, setAccessCode] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [searchMode, setSearchMode] = useState<"create" | "search" | null>("create");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Query para cargar ATE por código de acceso
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
      // Buscar en la base de datos
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
        // Guardar en localStorage para que Creator pueda cargar
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white border-2 border-blue-200 shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-t-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8" />
                <h2 className="text-3xl font-bold">¡Bienvenido!</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">ATE-TPACK Creator</h3>
                <p className="text-slate-700 leading-relaxed">
                  Diseña experiencias de aprendizaje transformadoras integrando el modelo TPACK. 
                  Combina Conocimiento de Contenido, Pedagógico y Tecnológico de forma coherente.
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-slate-700 font-semibold mb-2">💡 Consejos Importantes:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✓ Todos los campos con * son obligatorios</li>
                  <li>✓ Tu trabajo se guarda automáticamente en la nube</li>
                  <li>✓ Guarda tu código de acceso en un lugar seguro</li>
                  <li>✓ Usa el asistente virtual (chat) para resolver dudas</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900">¿Qué deseas hacer?</p>
                <div className="flex flex-col gap-3">
                  <Link href="/creator">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 font-semibold gap-2 h-auto" onClick={() => setShowWelcomeModal(false)}>
                      <Plus className="w-5 h-5" />
                      Crear Nueva ATE
                    </Button>
                  </Link>
                  
                  <Button 
                    onClick={() => setShowWelcomeModal(false)}
                    variant="outline" 
                    className="w-full border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 py-3 font-semibold"
                  >
                    Explorar Primero
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-orange-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
              ATE-TPACK Creator
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Diseña experiencias de aprendizaje transformadoras integrando el modelo TPACK. 
              Combina Conocimiento de Contenido, Pedagógico y Tecnológico de forma coherente.
            </p>

            {/* Main CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/creator">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all gap-2 h-auto">
                  <Plus className="w-5 h-5" />
                  Crear Nueva ATE
                </Button>
              </Link>
              
              <Button
                onClick={() => setSearchMode(searchMode === "search" ? null : "search")}
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 h-auto"
              >
                <Search className="w-5 h-5" />
                Acceder a Trabajo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Access Code Section */}
      {searchMode === "search" && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 border-2 border-slate-200 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Acceder a tu Trabajo</h2>
            <p className="text-slate-600 mb-6">
              Ingresa el código de acceso que creaste para recuperar tu ATE guardada.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showAccessCode ? "text" : "password"}
                  placeholder="Código de acceso"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSearch()}
                  className="py-3 px-4 pr-12 text-base border-2 border-slate-300 focus:border-blue-600"
                  disabled={isLoading}
                />
                <button
                  onClick={() => setShowAccessCode(!showAccessCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  type="button"
                  disabled={isLoading}
                >
                  {showAccessCode ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              <div>
                <Input
                  type="text"
                  placeholder="Nombre para descargar (ej: Mi_ATE_Matemáticas)"
                  value={downloadName}
                  onChange={(e) => setDownloadName(e.target.value)}
                  className="py-3 px-4 text-base border-2 border-slate-300 focus:border-blue-600"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Editar
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleDownload}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1 border-2 border-slate-300 hover:border-orange-600 hover:bg-orange-50 py-3 font-semibold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Descargando...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Descargar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-lg text-slate-600">
            Tres pasos simples para crear una ATE profesional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-md group-hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Información del Grupo
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Completa los datos de tu equipo, área disciplinar y grado escolar.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-md group-hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Diseña tu ATE
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Completa el problema pedagógico, tecnología y secuencia didáctica.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-orange-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-md group-hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Exporta y Comparte
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Descarga tu ATE en PDF, Word o PowerPoint para compartir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
