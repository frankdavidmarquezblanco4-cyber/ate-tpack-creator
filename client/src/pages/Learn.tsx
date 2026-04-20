import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertCircle, Target, BookOpen, Play, Lightbulb, CheckCircle } from "lucide-react";

/**
 * Learn Page - Contextualización sobre ATE
 * 
 * Design Philosophy: Constructivista Moderno
 * - Interactive infographic showing 6 ATE components
 * - Hexagonal layout with color coding
 * - Detailed explanations for each component
 * - Visual hierarchy with Poppins titles and Inter body text
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Aprende sobre las ATE
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre los 6 componentes esenciales de una Actividad Tecnológica Escolar 
            y cómo se integran para crear experiencias de aprendizaje significativas.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selector */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-lg shadow-lg p-8">
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
                      <span className="font-semibold">{comp.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <Card className="border-l-4 p-8" style={{ borderLeftColor: currentComponent.color }}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 ${currentComponent.lightColor} rounded-lg flex items-center justify-center`}>
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
                  <div className={`${currentComponent.lightColor} p-4 rounded-lg`}>
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

        {/* Visual Infographic */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Flujo de Componentes
            </h2>
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663346110887/mUVW2Zqd3icGMZExmrW5z6/ate-components-infographic-aDPPgbb7owX3mvR2FWY8PQ.webp"
              alt="Componentes de ATE"
              className="w-full max-w-2xl mx-auto rounded-lg"
            />
            <p className="text-center text-gray-600 mt-6">
              Los 6 componentes forman un ciclo integrado donde cada elemento 
              se conecta y refuerza con los demás para crear una experiencia 
              de aprendizaje coherente y significativa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
