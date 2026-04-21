import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Edit, Download, Trash2, Plus, Loader2, Calendar, Code } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

interface ATEItem {
  accessCode: string;
  createdAt: Date;
  updatedAt: Date;
  data: Record<string, unknown>;
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [ates, setAtes] = useState<ATEItem[]>([]);
  const [filteredAtes, setFilteredAtes] = useState<ATEItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Query para obtener todos los ATE del usuario
  const { data: atesData, isLoading, refetch } = trpc.ate.list.useQuery(undefined, {
    enabled: !!user && !authLoading,
  });

  useEffect(() => {
    if (atesData) {
      setAtes(atesData);
      setFilteredAtes(atesData);
    }
  }, [atesData]);

  // Filtrar ATEs por búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAtes(ates);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredAtes(
        ates.filter((ate) => {
          const projectName = (ate.data?.projectName as string || "").toLowerCase();
          const code = (ate.accessCode || "").toLowerCase();
          return projectName.includes(term) || code.includes(term);
        })
      );
    }
  }, [searchTerm, ates]);

  const handleEdit = (ate: ATEItem) => {
    localStorage.setItem("ateFormData", JSON.stringify(ate.data));
    localStorage.setItem("isEditMode", "true");
    window.location.href = "/creator";
  };

  const handleDownload = (ate: ATEItem) => {
    const projectName = (ate.data?.projectName as string || "Proyecto").replace(/\s+/g, "_");
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ate.data))
    );
    element.setAttribute("download", `${projectName}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Trabajo descargado correctamente");
  };

  const handleDelete = async (accessCode: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este trabajo? Esta acción no se puede deshacer.")) {
      return;
    }

    setIsDeleting(accessCode);
    try {
      // Aquí iría la llamada a una mutación para eliminar
      // Por ahora, solo removemos del estado local
      setAtes(ates.filter(ate => ate.accessCode !== accessCode));
      toast.success("Trabajo eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el trabajo");
    } finally {
      setIsDeleting(null);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-25 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando trabajos...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-25 to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Requerido</h2>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tus trabajos guardados.</p>
          <Link href="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Volver al Inicio
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-25 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Mis Trabajos</h1>
          </div>
          <Link href="/creator">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Nuevo ATE
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Buscar por nombre de proyecto o código de acceso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-200 focus:border-blue-600 rounded-lg"
          />
        </div>

        {/* ATEs Grid */}
        {filteredAtes.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay trabajos guardados</h3>
            <p className="text-gray-600 mb-6">Comienza creando tu primer ATE</p>
            <Link href="/creator">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Crear Nuevo ATE
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAtes.map((ate) => (
              <Card key={ate.accessCode} className="p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                {/* Project Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                  {(ate.data?.projectName as string) || "Sin nombre"}
                </h3>

                {/* Access Code */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Code className="w-4 h-4" />
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">
                    {ate.accessCode}
                  </code>
                </div>

                {/* Dates */}
                <div className="space-y-1 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Creado: {new Date(ate.createdAt).toLocaleDateString("es-ES")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Actualizado: {new Date(ate.updatedAt).toLocaleDateString("es-ES")}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm text-gray-700">
                  <p><strong>Área:</strong> {(ate.data?.disciplinaryArea as string) || "-"}</p>
                  <p><strong>Grado:</strong> {(ate.data?.grade as string) || "-"}</p>
                  <p><strong>Duración:</strong> {(ate.data?.totalDuration as string) || "-"} min</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(ate)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDownload(ate)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </Button>
                  <Button
                    onClick={() => handleDelete(ate.accessCode)}
                    disabled={isDeleting === ate.accessCode}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 gap-2 disabled:opacity-50"
                  >
                    {isDeleting === ate.accessCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Eliminar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
