import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Target, BookOpen, Play, Lightbulb, CheckCircle, ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

/**
 * Example Page - Ejemplo Práctico de ATE
 * 
 * Design Philosophy: Constructivista Moderno
 * - Complete example: Drones for coastal erosion monitoring
 * - Shows how each component is developed
 * - Real-world context and authentic learning
 */
export default function Example() {
  const exampleData = {
    projectName: "Drones para Monitoreo de Erosión Costera",
    secretCode: "DRONES-CARIBE-001",
    disciplinaryArea: "Geografía, Tecnología, Sostenibilidad",
    grade: "10-11",
    members: ["Estudiante 1", "Estudiante 2", "Estudiante 3"],
    learningObjective: "Los estudiantes analizarán datos de erosión costera obtenidos mediante tecnología de drones, identificarán patrones y factores causales, y propondrán estrategias de mitigación basadas en evidencia científica.",
    pedagogicalStrategy: "Aprendizaje basado en proyectos con construccionismo",
    strategyJustification: "Permite que los estudiantes construyan soluciones reales a problemas auténticos",
    technology: "Drones DJI, Software de análisis de imágenes, Tablets",
    technologyType: "Herramientas de captura y análisis de datos",
    technologyCost: "Medio (requiere inversión en drones)",
    contentRepresentation: "Visual y práctica",
    strategyPotentiation: "Alta - integra múltiples disciplinas",
    totalDuration: "60",
    openingDuration: "10",
    openingTeacherRole: "Facilitador",
    openingStudentRole: "Observador y reflexionador",
    developmentDuration: "40",
    developmentTeacherRole: "Guía",
    developmentStudentRole: "Constructor y analista",
    closingDuration: "10",
    closingTeacherRole: "Evaluador",
    closingStudentRole: "Presentador y reflexionador",
    technicalResources: [
      { type: "Drones DJI Phantom", accessCost: "Alto", technicalRequirement: "Piloto certificado", urlReference: "https://www.dji.com" },
      { type: "Software de análisis", accessCost: "Medio", technicalRequirement: "Computadora potente", urlReference: "https://www.agisoft.com" },
    ],
    referenceFiles: [],
  };

  const handleDownloadExample = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exampleData))
    );
    element.setAttribute("download", "ejemplo-ate-drones.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Ejemplo descargado. Puedes importarlo en el Creator");
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Ejemplo Práctico</h1>
          </div>
          <Button onClick={handleDownloadExample} className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Download className="w-4 h-4" />
            Descargar Ejemplo
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Drones para Monitoreo de Erosión Costera
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Uso de tecnología de drones para el monitoreo y prevención de la erosión costera 
            en la región Caribe
          </p>
          <div className="inline-block bg-blue-100 border-2 border-blue-300 rounded-lg px-6 py-3">
            <p className="text-sm text-blue-900 font-semibold">Código de Acceso: <code className="bg-white px-2 py-1 rounded">DRONES-CARIBE-001</code></p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663346110887/mUVW2Zqd3icGMZExmrW5z6/drone-coastal-monitoring-RxnjEUMkeSatDGGFywEZTi.webp"
            alt="Drones monitoreando erosión costera"
            className="w-full rounded-lg shadow-lg border-2 border-blue-200"
          />
        </div>

        {/* Quick Info */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 font-semibold">Grado</p>
            <p className="text-xl font-bold text-gray-900">10-11</p>
          </Card>
          <Card className="p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 font-semibold">Duración</p>
            <p className="text-xl font-bold text-gray-900">60 minutos</p>
          </Card>
          <Card className="p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 font-semibold">Disciplinas</p>
            <p className="text-lg font-bold text-gray-900">3+</p>
          </Card>
          <Card className="p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 font-semibold">Complejidad</p>
            <p className="text-xl font-bold text-gray-900">Alta</p>
          </Card>
        </div>

        {/* Tabs for Components */}
        <Tabs defaultValue="problema" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white border-2 border-blue-200">
            <TabsTrigger value="problema" className="text-xs sm:text-sm data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Problema</span>
            </TabsTrigger>
            <TabsTrigger value="objetivos" className="text-xs sm:text-sm data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Target className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Objetivos</span>
            </TabsTrigger>
            <TabsTrigger value="contenidos" className="text-xs sm:text-sm data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <BookOpen className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Contenidos</span>
            </TabsTrigger>
            <TabsTrigger value="secuencia" className="text-xs sm:text-sm data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              <Play className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Secuencia</span>
            </TabsTrigger>
            <TabsTrigger value="recursos" className="text-xs sm:text-sm data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
              <Lightbulb className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Recursos</span>
            </TabsTrigger>
            <TabsTrigger value="evaluacion" className="text-xs sm:text-sm data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Evaluación</span>
            </TabsTrigger>
          </TabsList>

          {/* Situación Problema */}
          <TabsContent value="problema">
            <Card className="p-8 border-l-4 border-l-red-500 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Situación Problema</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">El Problema</h3>
                  <p className="text-gray-700 leading-relaxed bg-red-50 p-4 rounded-lg">
                    La región Caribe colombiana enfrenta una crisis de erosión costera que amenaza 
                    comunidades, infraestructura y ecosistemas. Cada año se pierden metros de playa 
                    debido a factores como cambio climático, actividades humanas y dinámicas marinas. 
                    Las comunidades locales necesitan datos precisos para tomar decisiones informadas 
                    sobre mitigación y adaptación.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">¿Por qué es importante?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-red-50 p-3 rounded-lg">
                      <span className="text-red-600 font-bold flex-shrink-0">•</span>
                      <span>Afecta directamente a comunidades locales y sus medios de vida</span>
                    </li>
                    <li className="flex gap-3 bg-red-50 p-3 rounded-lg">
                      <span className="text-red-600 font-bold flex-shrink-0">•</span>
                      <span>Requiere soluciones tecnológicas innovadoras</span>
                    </li>
                    <li className="flex gap-3 bg-red-50 p-3 rounded-lg">
                      <span className="text-red-600 font-bold flex-shrink-0">•</span>
                      <span>Conecta con objetivos de desarrollo sostenible (ODS 13, 14)</span>
                    </li>
                    <li className="flex gap-3 bg-red-50 p-3 rounded-lg">
                      <span className="text-red-600 font-bold flex-shrink-0">•</span>
                      <span>Integra múltiples disciplinas (geografía, tecnología, sostenibilidad)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Objetivos de Aprendizaje */}
          <TabsContent value="objetivos">
            <Card className="p-8 border-l-4 border-l-blue-500 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Objetivos de Aprendizaje</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Objetivo General</h3>
                  <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                    Los estudiantes analizarán datos de erosión costera obtenidos mediante tecnología 
                    de drones, identificarán patrones y factores causales, y propondrán estrategias 
                    de mitigación basadas en evidencia científica.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Objetivos Específicos (Taxonomía de Bloom)</h3>
                  <ul className="space-y-3">
                    <li className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                      <span className="font-bold text-blue-600">Analizar:</span> Examinar datos de erosión e identificar patrones temporales y espaciales
                    </li>
                    <li className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                      <span className="font-bold text-blue-600">Evaluar:</span> Comparar efectividad de diferentes estrategias de mitigación
                    </li>
                    <li className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                      <span className="font-bold text-blue-600">Crear:</span> Diseñar una propuesta de intervención sostenible para la comunidad
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Contenidos */}
          <TabsContent value="contenidos">
            <Card className="p-8 border-l-4 border-l-green-500 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contenidos</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Contenidos Técnicos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                      <h4 className="font-bold text-green-700 mb-2">Geografía Costera</h4>
                      <p className="text-gray-700 text-sm">Procesos de erosión, dinámicas marinas, cambio climático</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                      <h4 className="font-bold text-green-700 mb-2">Tecnología de Drones</h4>
                      <p className="text-gray-700 text-sm">Funcionamiento, captura de imágenes, fotogrametría</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                      <h4 className="font-bold text-green-700 mb-2">Análisis de Datos</h4>
                      <p className="text-gray-700 text-sm">Procesamiento de imágenes, estadística, visualización</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                      <h4 className="font-bold text-green-700 mb-2">Sostenibilidad</h4>
                      <p className="text-gray-700 text-sm">ODS, adaptación al cambio climático, resiliencia</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Competencias Transversales</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-green-50 p-3 rounded-lg">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <span>Trabajo colaborativo y comunicación científica</span>
                    </li>
                    <li className="flex gap-3 bg-green-50 p-3 rounded-lg">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <span>Pensamiento crítico y resolución de problemas</span>
                    </li>
                    <li className="flex gap-3 bg-green-50 p-3 rounded-lg">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <span>Alfabetización digital y manejo de tecnología</span>
                    </li>
                    <li className="flex gap-3 bg-green-50 p-3 rounded-lg">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <span>Conciencia ambiental y responsabilidad social</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Secuencia Didáctica */}
          <TabsContent value="secuencia">
            <Card className="p-8 border-l-4 border-l-purple-500 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Secuencia Didáctica</h2>
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">① Apertura / Enganche (10 minutos)</h3>
                  <p className="text-gray-700 mb-3">
                    <span className="font-semibold">¿Qué hace el docente?</span> Presenta un video de la erosión costera 
                    en el Caribe. Muestra imágenes de playas desaparecidas. Plantea preguntas provocadoras.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">¿Qué hacen los estudiantes?</span> Observan, reflexionan, comparten 
                    experiencias personales con la costa. Generan hipótesis sobre causas.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">② Desarrollo / Construcción (40 minutos)</h3>
                  <p className="text-gray-700 mb-3">
                    <span className="font-semibold">¿Qué hace el docente?</span> Facilita el uso de drones para capturar 
                    imágenes. Guía el análisis de datos con software especializado. Hace preguntas que profundizan.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">¿Qué hacen los estudiantes?</span> Operan drones, capturan imágenes, 
                    procesan datos, crean mapas de erosión, identifican patrones, discuten en equipos.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">③ Cierre / Reflexión (10 minutos)</h3>
                  <p className="text-gray-700 mb-3">
                    <span className="font-semibold">¿Qué hace el docente?</span> Facilita la presentación de hallazgos. 
                    Conecta con soluciones reales. Reflexiona sobre el proceso de aprendizaje.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">¿Qué hacen los estudiantes?</span> Presentan propuestas, responden preguntas, 
                    reflexionan sobre lo aprendido y su impacto potencial.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Recursos */}
          <TabsContent value="recursos">
            <Card className="p-8 border-l-4 border-l-orange-500 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Recursos</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Recursos Tecnológicos</h3>
                  <ul className="space-y-3">
                    <li className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                      <p className="font-bold text-orange-700">Drones DJI Phantom 4 Pro</p>
                      <p className="text-sm text-gray-700">Para captura de imágenes de alta resolución</p>
                    </li>
                    <li className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                      <p className="font-bold text-orange-700">Software Agisoft Metashape</p>
                      <p className="text-sm text-gray-700">Para procesamiento de imágenes y fotogrametría</p>
                    </li>
                    <li className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                      <p className="font-bold text-orange-700">QGIS o ArcGIS Online</p>
                      <p className="text-sm text-gray-700">Para análisis geoespacial y visualización</p>
                    </li>
                    <li className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                      <p className="font-bold text-orange-700">Tablets y computadoras</p>
                      <p className="text-sm text-gray-700">Para trabajo de campo y análisis en aula</p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Recursos de Apoyo</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold flex-shrink-0">📚</span>
                      <span>Documentales sobre cambio climático y erosión costera</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold flex-shrink-0">🔗</span>
                      <span>Datos públicos de USGS y NASA sobre costas</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold flex-shrink-0">🏢</span>
                      <span>Conexión con organizaciones ambientales locales</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Evaluación */}
          <TabsContent value="evaluacion">
            <Card className="p-8 border-l-4 border-l-teal-500 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Evaluación</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Rúbrica de Evaluación</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-teal-100 border-b-2 border-teal-600">
                          <th className="p-3 text-left font-bold text-teal-900">Criterio</th>
                          <th className="p-3 text-center font-bold text-teal-900">Peso</th>
                          <th className="p-3 text-left font-bold text-teal-900">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-teal-50 border-b border-teal-200">
                          <td className="p-3 font-semibold text-gray-900">Análisis de Datos</td>
                          <td className="p-3 text-center font-bold text-teal-700">40%</td>
                          <td className="p-3 text-gray-700">Capacidad para interpretar datos y identificar patrones</td>
                        </tr>
                        <tr className="bg-teal-50 border-b border-teal-200">
                          <td className="p-3 font-semibold text-gray-900">Propuesta de Solución</td>
                          <td className="p-3 text-center font-bold text-teal-700">40%</td>
                          <td className="p-3 text-gray-700">Creatividad y viabilidad de la estrategia propuesta</td>
                        </tr>
                        <tr className="bg-teal-50">
                          <td className="p-3 font-semibold text-gray-900">Comunicación</td>
                          <td className="p-3 text-center font-bold text-teal-700">20%</td>
                          <td className="p-3 text-gray-700">Claridad en la presentación y argumentación</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Estrategias de Evaluación</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                      <span>Evaluación formativa durante el desarrollo</span>
                    </li>
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                      <span>Autoevaluación y coevaluación entre pares</span>
                    </li>
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                      <span>Presentación final con retroalimentación del docente</span>
                    </li>
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                      <span>Portafolio digital con evidencias del proceso</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 border-0">
            <h2 className="text-3xl font-bold mb-4">¿Inspirado por este ejemplo?</h2>
            <p className="text-lg mb-6 text-blue-50">
              Ahora crea tu propia ATE adaptada a tu contexto educativo
            </p>
            <Link href="/creator">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-3">
                Crear mi ATE
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
