import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Target, BookOpen, Play, Lightbulb, CheckCircle } from "lucide-react";

/**
 * Example Page - Ejemplo Práctico de ATE
 * 
 * Design Philosophy: Constructivista Moderno
 * - Complete example: Drones for coastal erosion monitoring
 * - Shows how each component is developed
 * - Real-world context and authentic learning
 */
export default function Example() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Ejemplo Práctico: ATE Drones
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "Uso de tecnología de drones para el monitoreo y prevención de la erosión costera 
            en la región Caribe"
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663346110887/mUVW2Zqd3icGMZExmrW5z6/drone-coastal-monitoring-RxnjEUMkeSatDGGFywEZTi.webp"
            alt="Drones monitoreando erosión costera"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Tabs for Components */}
        <Tabs defaultValue="problema" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="problema" className="text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Problema</span>
            </TabsTrigger>
            <TabsTrigger value="objetivos" className="text-xs sm:text-sm">
              <Target className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Objetivos</span>
            </TabsTrigger>
            <TabsTrigger value="contenidos" className="text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Contenidos</span>
            </TabsTrigger>
            <TabsTrigger value="secuencia" className="text-xs sm:text-sm">
              <Play className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Secuencia</span>
            </TabsTrigger>
            <TabsTrigger value="recursos" className="text-xs sm:text-sm">
              <Lightbulb className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Recursos</span>
            </TabsTrigger>
            <TabsTrigger value="evaluacion" className="text-xs sm:text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Evaluación</span>
            </TabsTrigger>
          </TabsList>

          {/* Situación Problema */}
          <TabsContent value="problema">
            <Card className="p-8 border-l-4 border-l-red-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Situación Problema</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">El Problema</h3>
                  <p className="text-gray-700 leading-relaxed">
                    La región Caribe colombiana enfrenta una crisis de erosión costera que amenaza 
                    comunidades, infraestructura y ecosistemas. Cada año se pierden metros de playa 
                    debido a factores como cambio climático, actividades humanas y dinámicas marinas. 
                    Las comunidades locales necesitan datos precisos para tomar decisiones informadas 
                    sobre mitigación y adaptación.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">¿Por qué es importante?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Afecta directamente a comunidades locales y sus medios de vida</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Requiere soluciones tecnológicas innovadoras</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Conecta con objetivos de desarrollo sostenible</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Integra múltiples disciplinas (geografía, tecnología, sostenibilidad)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Objetivos de Aprendizaje */}
          <TabsContent value="objetivos">
            <Card className="p-8 border-l-4 border-l-blue-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Objetivos de Aprendizaje</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Objetivo General</h3>
                  <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                    Los estudiantes analizarán datos de erosión costera obtenidos mediante tecnología 
                    de drones, identificarán patrones y factores causales, y propondrán estrategias 
                    de mitigación basadas en evidencia científica.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Objetivos Específicos (Taxonomía de Bloom)</h3>
                  <ul className="space-y-3">
                    <li className="bg-blue-50 p-4 rounded-lg">
                      <span className="font-bold text-blue-600">Analizar:</span> Examinar datos de erosión e identificar patrones temporales y espaciales
                    </li>
                    <li className="bg-blue-50 p-4 rounded-lg">
                      <span className="font-bold text-blue-600">Evaluar:</span> Comparar efectividad de diferentes estrategias de mitigación
                    </li>
                    <li className="bg-blue-50 p-4 rounded-lg">
                      <span className="font-bold text-blue-600">Crear:</span> Diseñar una propuesta de intervención sostenible para la comunidad
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Contenidos */}
          <TabsContent value="contenidos">
            <Card className="p-8 border-l-4 border-l-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contenidos</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Contenidos Técnicos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-700 mb-2">Geografía Costera</h4>
                      <p className="text-gray-700 text-sm">Procesos de erosión, dinámicas marinas, cambio climático</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-700 mb-2">Tecnología de Drones</h4>
                      <p className="text-gray-700 text-sm">Funcionamiento, captura de imágenes, fotogrametría</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-700 mb-2">Análisis de Datos</h4>
                      <p className="text-gray-700 text-sm">Procesamiento de imágenes, estadística, visualización</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-700 mb-2">Sostenibilidad</h4>
                      <p className="text-gray-700 text-sm">ODS, adaptación al cambio climático, resiliencia</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Competencias Transversales</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Trabajo colaborativo y comunicación científica</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Pensamiento crítico y resolución de problemas</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Alfabetización digital y manejo de tecnología</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Conciencia ambiental y responsabilidad social</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Secuencia Didáctica */}
          <TabsContent value="secuencia">
            <Card className="p-8 border-l-4 border-l-purple-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Secuencia Didáctica</h2>
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg">
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

                <div className="bg-purple-50 p-6 rounded-lg">
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

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">③ Cierre / Reflexión (10 minutos)</h3>
                  <p className="text-gray-700 mb-3">
                    <span className="font-semibold">¿Qué hace el docente?</span> Facilita la síntesis. Conecta hallazgos 
                    con sostenibilidad. Propone siguiente fase.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">¿Qué hacen los estudiantes?</span> Presentan hallazgos, reflexionan 
                    sobre el proceso, proponen soluciones, evalúan su aprendizaje.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Recursos */}
          <TabsContent value="recursos">
            <Card className="p-8 border-l-4 border-l-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Recursos</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Tecnología</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Drones DJI Phantom o similar con cámara 4K</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Software de fotogrametría (Pix4D, WebODM)</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Tablets o laptops para análisis de datos</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Conexión a internet estable</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Requisitos Técnicos</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Espacio abierto (playa o costa) para volar drones</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Permisos de autoridades locales y aeronáuticas</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Capacitación en seguridad de drones</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Materiales de Apoyo</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Guías de operación de drones</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Datos históricos de erosión costera</span>
                    </li>
                    <li className="flex gap-3 bg-orange-50 p-3 rounded-lg">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Plantillas de análisis de datos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Evaluación */}
          <TabsContent value="evaluacion">
            <Card className="p-8 border-l-4 border-l-teal-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Evaluación</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Rúbrica de Evaluación</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-teal-100">
                          <th className="p-3 text-left font-bold text-teal-700">Criterio</th>
                          <th className="p-3 text-left font-bold text-teal-700">Excelente</th>
                          <th className="p-3 text-left font-bold text-teal-700">Bueno</th>
                          <th className="p-3 text-left font-bold text-teal-700">Básico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-3 font-semibold">Análisis de Datos (40%)</td>
                          <td className="p-3">Identifica patrones complejos con precisión</td>
                          <td className="p-3">Identifica patrones principales</td>
                          <td className="p-3">Identifica algunos patrones</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">Propuesta de Solución (40%)</td>
                          <td className="p-3">Propuesta innovadora y viable</td>
                          <td className="p-3">Propuesta clara y fundamentada</td>
                          <td className="p-3">Propuesta básica</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">Comunicación (20%)</td>
                          <td className="p-3">Presenta con claridad y profesionalismo</td>
                          <td className="p-3">Presenta de forma clara</td>
                          <td className="p-3">Presenta información básica</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Estrategias de Evaluación</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>Evaluación formativa durante el proceso</span>
                    </li>
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>Autoevaluación y coevaluación entre pares</span>
                    </li>
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>Portafolio de evidencias (mapas, análisis, propuestas)</span>
                    </li>
                    <li className="flex gap-3 bg-teal-50 p-3 rounded-lg">
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>Presentación final a la comunidad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
