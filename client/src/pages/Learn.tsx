import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Target, BookOpen, Play, Lightbulb, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

/**
 * Learn Page - Contextualización sobre ATE y TPACK
 * 
 * Design Philosophy: Constructivista Moderno
 * - Interactive infographic showing 6 ATE components
 * - TPACK framework explanation
 * - Detailed explanations for each component
 * - Visual hierarchy with professional styling
 */
export default function Learn() {
  const [selectedComponent, setSelectedComponent] = useState(0);

  const components = [
    {
      id: 1,
      name: "Situación Problema",
      color: "bg-red-500",
      lightColor: "bg-red-100",
      textColor: "text-red-600",
      icon: AlertCircle,
      description: "El punto de partida. Una situación real, auténtica y relevante que motiva a los estudiantes a aprender. Debe ser clara, desafiante y conectada con el contexto de los estudiantes.",
      example: "La erosión costera en la región Caribe amenaza comunidades y ecosistemas. Los estudiantes deben investigar y proponer soluciones.",
      questions: [
        "¿Cuál es el problema real?",
        "¿Por qué es importante para los estudiantes?",
        "¿Cómo afecta a la comunidad local?",
      ],
    },
    {
      id: 2,
      name: "Objetivos de Aprendizaje",
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
      icon: Target,
      description: "Los resultados esperados del aprendizaje. Deben ser observables, medibles y estar alineados con estándares curriculares. Utilizan verbos de la Taxonomía de Bloom.",
      example: "Los estudiantes analizarán datos de erosión, identificarán patrones y propondrán estrategias de mitigación basadas en evidencia.",
      questions: [
        "¿Qué deben aprender los estudiantes?",
        "¿Cómo se puede medir el aprendizaje?",
        "¿Qué nivel cognitivo se busca alcanzar?",
      ],
    },
    {
      id: 3,
      name: "Contenidos",
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
      icon: BookOpen,
      description: "Los conocimientos técnicos y sociales necesarios. Incluye tanto contenidos disciplinares como competencias transversales (trabajo en equipo, pensamiento crítico).",
      example: "Geología costera, análisis de datos, tecnología de drones, sostenibilidad ambiental, comunicación científica.",
      questions: [
        "¿Qué contenidos técnicos se necesitan?",
        "¿Qué competencias sociales se desarrollan?",
        "¿Cómo se integran múltiples disciplinas?",
      ],
    },
    {
      id: 4,
      name: "Secuencia Didáctica",
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
      icon: Play,
      description: "El plan de acción paso a paso. Incluye apertura (enganche), desarrollo (construcción) y cierre (reflexión). Cada fase tiene objetivos, actividades y tiempos claros.",
      example: "Apertura (10 min): Visualizar erosión. Desarrollo (40 min): Analizar datos con drones. Cierre (10 min): Presentar soluciones.",
      questions: [
        "¿Cuál es la estructura temporal?",
        "¿Qué hace el docente en cada fase?",
        "¿Qué hacen los estudiantes?",
      ],
    },
    {
      id: 5,
      name: "Recursos",
      color: "bg-orange-500",
      lightColor: "bg-orange-100",
      textColor: "text-orange-600",
      icon: Lightbulb,
      description: "Herramientas, tecnologías y materiales necesarios. Incluye recursos tecnológicos, bibliografía, espacios físicos y requisitos técnicos.",
      example: "Drones DJI, software de análisis de imágenes, tablets, conexión a internet, playa o costa cercana.",
      questions: [
        "¿Qué tecnologías se necesitan?",
        "¿Cuáles son los requisitos técnicos?",
        "¿Qué materiales de apoyo se requieren?",
      ],
    },
    {
      id: 6,
      name: "Evaluación",
      color: "bg-teal-500",
      lightColor: "bg-teal-100",
      textColor: "text-teal-600",
      icon: CheckCircle,
      description: "Cómo se evidencia el aprendizaje. Incluye criterios claros, rúbricas y estrategias de evaluación formativa. Puede ser individual o colaborativa.",
      example: "Rúbrica con criterios: análisis de datos (40%), propuesta de solución (40%), comunicación (20%).",
      questions: [
        "¿Cómo se evalúa el aprendizaje?",
        "¿Cuáles son los criterios de éxito?",
        "¿Cómo se proporciona retroalimentación?",
      ],
    },
  ];

  const currentComponent = components[selectedComponent];
  const IconComponent = currentComponent.icon;

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
          <h1 className="text-2xl font-bold text-gray-900">Aprende sobre las ATE</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Descubre los 6 componentes esenciales de una Actividad Tecnológica Escolar 
            y cómo se integran para crear experiencias de aprendizaje significativas.
          </p>
          <div className="inline-block bg-blue-100 border-2 border-blue-300 rounded-lg px-6 py-4">
            <p className="text-sm text-blue-900 font-semibold">💡 Las ATE combinan construccionismo con el modelo TPACK para aprendizaje transformador</p>
          </div>
        </div>

        {/* TPACK Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">¿Qué es TPACK?</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-center max-w-3xl mx-auto">
            TPACK (Technological Pedagogical Content Knowledge) es un marco que describe los tipos de conocimiento que los docentes necesitan para enseñar efectivamente con tecnología. Integra tres tipos de conocimiento fundamentales:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">📚 CK (Content Knowledge)</h3>
              <p className="text-gray-700">Conocimiento profundo de la disciplina o materia a enseñar. Incluye conceptos, teorías y prácticas de la asignatura.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="font-bold text-green-900 mb-3 text-lg">🎓 PK (Pedagogical Knowledge)</h3>
              <p className="text-gray-700">Estrategias y métodos efectivos para enseñar y facilitar el aprendizaje. Incluye evaluación, gestión del aula y motivación.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
              <h3 className="font-bold text-orange-900 mb-3 text-lg">💻 TK (Technological Knowledge)</h3>
              <p className="text-gray-700">Comprensión de herramientas y tecnologías disponibles. Incluye software, hardware y capacidad de aprender nuevas tecnologías.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selector */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Componentes ATE</h2>
              <div className="space-y-3">
                {components.map((comp, idx) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponent(idx)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedComponent === idx
                        ? `${comp.color} text-white shadow-lg`
                        : `${comp.lightColor} ${comp.textColor} hover:shadow-md`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <span className="font-semibold text-sm">{comp.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <Card className="border-l-4 p-8 border-2 border-blue-200" style={{ borderLeftColor: currentComponent.color }}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 ${currentComponent.lightColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`w-8 h-8 ${currentComponent.textColor}`} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {currentComponent.name}
                  </h2>
                  <p className={`${currentComponent.textColor} font-semibold`}>
                    Componente {currentComponent.id} de 6
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {currentComponent.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Ejemplo Práctico</h3>
                  <div className={`${currentComponent.lightColor} p-4 rounded-lg border-l-4`} style={{ borderLeftColor: currentComponent.color }}>
                    <p className="text-gray-700">
                      {currentComponent.example}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Preguntas Clave</h3>
                  <ul className="space-y-2">
                    {currentComponent.questions.map((question, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={`${currentComponent.textColor} font-bold flex-shrink-0 mt-1`}>•</span>
                        <span className="text-gray-700">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Construccionismo Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Construccionismo en las ATE</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">¿Qué es el Construccionismo?</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                El construccionismo es una teoría de aprendizaje que enfatiza que los estudiantes aprenden mejor cuando construyen activamente objetos, ideas y sistemas. Va más allá del constructivismo al enfatizar la importancia de crear algo tangible o compartible.
              </p>
              <p className="text-gray-700 leading-relaxed">
                En una ATE, los estudiantes no solo aprenden conceptos, sino que construyen soluciones reales a problemas auténticos, desarrollando tanto conocimiento como habilidades prácticas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Principios Clave</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Aprendizaje Activo</p>
                    <p className="text-sm text-gray-600">Los estudiantes participan activamente en la construcción</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Autenticidad</p>
                    <p className="text-sm text-gray-600">Los problemas y soluciones son reales y significativos</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Reflexión</p>
                    <p className="text-sm text-gray-600">Se reflexiona sobre el proceso y el aprendizaje</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Colaboración</p>
                    <p className="text-sm text-gray-600">El trabajo en equipo es fundamental</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 border-0">
            <h2 className="text-3xl font-bold mb-4">¿Listo para crear tu ATE?</h2>
            <p className="text-lg mb-6 text-blue-50">
              Ahora que entiendes los componentes y principios, comienza a diseñar tu propia Actividad Tecnológica Escolar
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
