import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, Share2, Heart } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Gallery Page - Galería de trabajos públicos compartibles
 * 
 * Permite a los docentes ver y descargar ATE creados por otros
 */

interface SharedATE {
  id: string;
  projectName: string;
  disciplinaryArea: string;
  grade: string;
  author: string;
  description: string;
  downloads: number;
  likes: number;
  createdAt: string;
  accessCode: string;
}

export default function Gallery() {
  const [sharedATEs, setSharedATEs] = useState<SharedATE[]>([]);
  const [filteredATEs, setFilteredATEs] = useState<SharedATE[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulación de datos de ATE compartidos
  // En producción, esto vendría de la base de datos
  const mockSharedATEs: SharedATE[] = [
    {
      id: "1",
      projectName: "Drones para Monitoreo de Erosión Costera",
      disciplinaryArea: "Geografía, Tecnología",
      grade: "10-11",
      author: "Prof. María García",
      description: "Actividad completa sobre uso de drones para análisis de erosión costera en el Caribe",
      downloads: 234,
      likes: 45,
      createdAt: "2026-04-15",
      accessCode: "DRONES-CARIBE-001"
    },
    {
      id: "2",
      projectName: "Videojuegos Educativos en Scratch",
      disciplinaryArea: "Matemáticas, Programación",
      grade: "8-10",
      author: "Prof. Juan López",
      description: "Diseño de juegos educativos para enseñar álgebra de forma lúdica",
      downloads: 156,
      likes: 32,
      createdAt: "2026-04-10",
      accessCode: "GAME-MATH-001"
    },
    {
      id: "3",
      projectName: "Extracción de ADN en el Laboratorio",
      disciplinaryArea: "Biología, Química",
      grade: "9-11",
      author: "Prof. Ana Rodríguez",
      description: "Práctica de laboratorio con análisis digital de secuencias genéticas",
      downloads: 189,
      likes: 38,
      createdAt: "2026-04-08",
      accessCode: "DNA-LAB-001"
    },
    {
      id: "4",
      projectName: "Podcast en Inglés sobre Sostenibilidad",
      disciplinaryArea: "Lengua Inglesa, Sostenibilidad",
      grade: "7-9",
      author: "Prof. Carlos Martínez",
      description: "Producción de podcast para mejorar fluidez en inglés y conciencia ambiental",
      downloads: 112,
      likes: 24,
      createdAt: "2026-04-05",
      accessCode: "PODCAST-ENG-001"
    },
    {
      id: "5",
      projectName: "Arte Interactivo con Realidad Aumentada",
      disciplinaryArea: "Artes, Tecnología",
      grade: "8-11",
      author: "Prof. Laura Fernández",
      description: "Creación de obras de arte que cobran vida mediante AR",
      downloads: 98,
      likes: 28,
      createdAt: "2026-04-01",
      accessCode: "ART-AR-001"
    },
    {
      id: "6",
      projectName: "Recreación de la Revolución Francesa en VR",
      disciplinaryArea: "Historia, Tecnología",
      grade: "9-11",
      author: "Prof. Roberto Sánchez",
      description: "Experiencia inmersiva de eventos históricos clave",
      downloads: 145,
      likes: 41,
      createdAt: "2026-03-28",
      accessCode: "HISTORY-VR-001"
    },
  ];

  useEffect(() => {
    // Simular carga de datos
    setIsLoading(true);
    setTimeout(() => {
      setSharedATEs(mockSharedATEs);
      setFilteredATEs(mockSharedATEs);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = sharedATEs;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(ate =>
        ate.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ate.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ate.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por disciplina
    if (selectedDiscipline !== "all") {
      filtered = filtered.filter(ate =>
        ate.disciplinaryArea.toLowerCase().includes(selectedDiscipline.toLowerCase())
      );
    }

    setFilteredATEs(filtered);
  }, [searchTerm, selectedDiscipline, sharedATEs]);

  const handleDownload = (ate: SharedATE) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ate))
    );
    element.setAttribute("download", `${ate.id}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`ATE "${ate.projectName}" descargada`);
  };

  const handleShare = (ate: SharedATE) => {
    const shareUrl = `${window.location.origin}/gallery?code=${ate.accessCode}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Enlace copiado al portapapeles");
  };

  const disciplines = [
    "all",
    "Geografía",
    "Matemáticas",
    "Biología",
    "Lengua Inglesa",
    "Artes",
    "Historia",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-25 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Galería de ATE</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Galería Comunitaria de ATE
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explora y descarga Actividades Tecnológicas Escolares creadas por docentes de toda la comunidad. 
            Comparte tus propias ATE para inspirar a otros educadores.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow p-6 border border-blue-200">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar ATE
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre, autor o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Discipline Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filtrar por Disciplina
              </label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {disciplines.map(discipline => (
                  <option key={discipline} value={discipline}>
                    {discipline === "all" ? "Todas las disciplinas" : discipline}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-gray-600">
          <p>Mostrando <span className="font-bold text-gray-900">{filteredATEs.length}</span> ATE de <span className="font-bold text-gray-900">{sharedATEs.length}</span> disponibles</p>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando galería...</p>
          </div>
        ) : filteredATEs.length === 0 ? (
          <Card className="p-12 text-center border-2 border-blue-200">
            <p className="text-gray-600 text-lg">No se encontraron ATE que coincidan con tu búsqueda</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredATEs.map((ate) => (
              <Card 
                key={ate.id} 
                className="overflow-hidden border-2 border-blue-200 hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
                  <h3 className="text-lg font-bold mb-1">{ate.projectName}</h3>
                  <p className="text-sm text-blue-100">por {ate.author}</p>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-4 flex-1">
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-600">Disciplina</p>
                      <p className="text-sm text-gray-900">{ate.disciplinaryArea}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-600">Grado</p>
                      <p className="text-sm text-gray-900">{ate.grade}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">Descripción</p>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {ate.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mb-4 py-3 border-t border-b border-gray-200">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Download className="w-4 h-4" />
                      {ate.downloads}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Heart className="w-4 h-4" />
                      {ate.likes}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Eye className="w-4 h-4" />
                      {new Date(ate.createdAt).toLocaleDateString('es-ES')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(ate)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm"
                      size="sm"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </Button>
                    <Button 
                      onClick={() => handleShare(ate)}
                      variant="outline"
                      className="flex-1 gap-2 text-sm"
                      size="sm"
                    >
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 border-0">
            <h2 className="text-3xl font-bold mb-4">¿Quieres compartir tu ATE?</h2>
            <p className="text-lg mb-6 text-orange-50">
              Crea tu ATE y comparte con la comunidad para inspirar a otros docentes
            </p>
            <Link href="/creator">
              <Button className="bg-white hover:bg-gray-100 text-orange-600 text-lg px-8 py-3 font-bold">
                Crear y Compartir ATE
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
