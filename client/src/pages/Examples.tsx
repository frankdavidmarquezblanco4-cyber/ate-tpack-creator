import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

/**
 * Examples Page - Múltiples ejemplos de ATE
 * 
 * Showcases different ATE implementations across disciplines
 */

interface ExampleATE {
  id: string;
  title: string;
  discipline: string;
  grade: string;
  duration: string;
  description: string;
  icon: string;
  color: string;
  data: any;
}

const examples: ExampleATE[] = [
  {
    id: "drones-erosion",
    title: "Drones para Monitoreo de Erosión Costera",
    discipline: "Geografía, Tecnología, Sostenibilidad",
    grade: "10-11",
    duration: "60 min",
    description: "Los estudiantes utilizan drones para capturar datos de erosión costera, analizan patrones y proponen estrategias de mitigación basadas en evidencia científica.",
    icon: "🚁",
    color: "from-blue-600 to-teal-600",
    data: {
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
      technologyCost: "Medio",
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
      technicalResources: [],
      referenceFiles: [],
    }
  },
  {
    id: "math-game-design",
    title: "Diseño de Videojuegos Educativos en Matemáticas",
    discipline: "Matemáticas, Programación, Diseño",
    grade: "8-10",
    duration: "90 min",
    description: "Los estudiantes diseñan y programan un videojuego educativo que enseña conceptos de álgebra y geometría de forma interactiva y lúdica.",
    icon: "🎮",
    color: "from-purple-600 to-pink-600",
    data: {
      projectName: "Diseño de Videojuegos Educativos en Matemáticas",
      secretCode: "MATH-GAME-001",
      disciplinaryArea: "Matemáticas, Programación, Diseño",
      grade: "8-10",
      members: ["Estudiante 1", "Estudiante 2", "Estudiante 3", "Estudiante 4"],
      learningObjective: "Los estudiantes comprenderán conceptos de álgebra y geometría mediante el diseño y programación de un videojuego educativo que desafíe a otros compañeros.",
      pedagogicalStrategy: "Aprendizaje basado en proyectos con gamificación",
      strategyJustification: "La gamificación aumenta la motivación y permite aprender matemáticas de forma lúdica y significativa",
      technology: "Scratch, Unity, Figma",
      technologyType: "Herramientas de programación y diseño",
      technologyCost: "Bajo",
      contentRepresentation: "Interactiva y visual",
      strategyPotentiation: "Alta - combina lógica, creatividad y matemáticas",
      totalDuration: "90",
      openingDuration: "15",
      openingTeacherRole: "Inspirador",
      openingStudentRole: "Explorador",
      developmentDuration: "60",
      developmentTeacherRole: "Facilitador",
      developmentStudentRole: "Diseñador y programador",
      closingDuration: "15",
      closingTeacherRole: "Evaluador",
      closingStudentRole: "Presentador y jugador",
      technicalResources: [],
      referenceFiles: [],
    }
  },
  {
    id: "biology-dna",
    title: "Extracción y Análisis de ADN con Herramientas Digitales",
    discipline: "Biología, Química, Tecnología",
    grade: "9-11",
    duration: "120 min",
    description: "Los estudiantes realizan una extracción de ADN en el laboratorio y utilizan software de bioinformática para analizar secuencias genéticas reales.",
    icon: "🧬",
    color: "from-green-600 to-emerald-600",
    data: {
      projectName: "Extracción y Análisis de ADN con Herramientas Digitales",
      secretCode: "DNA-ANALYSIS-001",
      disciplinaryArea: "Biología, Química, Tecnología",
      grade: "9-11",
      members: ["Estudiante 1", "Estudiante 2"],
      learningObjective: "Los estudiantes comprenderán la estructura del ADN mediante la extracción práctica y analizarán secuencias genéticas utilizando herramientas de bioinformática profesionales.",
      pedagogicalStrategy: "Aprendizaje basado en laboratorio con tecnología",
      strategyJustification: "Integra la experimentación práctica con análisis digital para profundizar en la comprensión de la biología molecular",
      technology: "BLAST, Jalview, Microscopios digitales, Software de análisis",
      technologyType: "Herramientas de laboratorio y bioinformática",
      technologyCost: "Medio",
      contentRepresentation: "Práctica y digital",
      strategyPotentiation: "Alta - conecta laboratorio con ciencia real",
      totalDuration: "120",
      openingDuration: "20",
      openingTeacherRole: "Explicador",
      openingStudentRole: "Aprendiz",
      developmentDuration: "80",
      developmentTeacherRole: "Supervisor",
      developmentStudentRole: "Investigador",
      closingDuration: "20",
      closingTeacherRole: "Evaluador",
      closingStudentRole: "Presentador",
      technicalResources: [],
      referenceFiles: [],
    }
  },
  {
    id: "language-podcast",
    title: "Producción de Podcast en Lengua Extranjera",
    discipline: "Lengua Inglesa, Comunicación, Tecnología",
    grade: "7-9",
    duration: "75 min",
    description: "Los estudiantes crean y producen un podcast en inglés sobre temas de su interés, mejorando habilidades de pronunciación, fluidez y comunicación.",
    icon: "🎙️",
    color: "from-orange-600 to-red-600",
    data: {
      projectName: "Producción de Podcast en Lengua Extranjera",
      secretCode: "PODCAST-ENGLISH-001",
      disciplinaryArea: "Lengua Inglesa, Comunicación, Tecnología",
      grade: "7-9",
      members: ["Estudiante 1", "Estudiante 2", "Estudiante 3"],
      learningObjective: "Los estudiantes producirán un podcast en inglés demostrando fluidez, pronunciación correcta y capacidad de comunicación efectiva sobre temas de su interés.",
      pedagogicalStrategy: "Aprendizaje basado en proyectos de comunicación auténtica",
      strategyJustification: "La producción de contenido real motiva a los estudiantes y proporciona contexto auténtico para el aprendizaje del idioma",
      technology: "Audacity, GarageBand, Anchor, Micrófonos USB",
      technologyType: "Herramientas de edición de audio",
      technologyCost: "Bajo",
      contentRepresentation: "Auditiva y narrativa",
      strategyPotentiation: "Alta - desarrolla habilidades de comunicación real",
      totalDuration: "75",
      openingDuration: "10",
      openingTeacherRole: "Motivador",
      openingStudentRole: "Oyente",
      developmentDuration: "50",
      developmentTeacherRole: "Coach",
      developmentStudentRole: "Productor",
      closingDuration: "15",
      closingTeacherRole: "Evaluador",
      closingStudentRole: "Presentador",
      technicalResources: [],
      referenceFiles: [],
    }
  },
  {
    id: "art-ar",
    title: "Creación de Arte Interactivo con Realidad Aumentada",
    discipline: "Artes, Tecnología, Diseño",
    grade: "8-11",
    duration: "100 min",
    description: "Los estudiantes crean obras de arte digital que cobran vida mediante realidad aumentada, combinando creatividad artística con tecnología moderna.",
    icon: "🎨",
    color: "from-indigo-600 to-purple-600",
    data: {
      projectName: "Creación de Arte Interactivo con Realidad Aumentada",
      secretCode: "ART-AR-001",
      disciplinaryArea: "Artes, Tecnología, Diseño",
      grade: "8-11",
      members: ["Estudiante 1", "Estudiante 2"],
      learningObjective: "Los estudiantes crearán obras de arte interactivas utilizando realidad aumentada, demostrando comprensión de diseño, composición y tecnología digital.",
      pedagogicalStrategy: "Aprendizaje basado en proyectos creativos con tecnología",
      strategyJustification: "Integra la expresión artística con tecnología emergente para crear experiencias inmersivas y significativas",
      technology: "Adobe Aero, Blender, Unity, Dispositivos móviles",
      technologyType: "Herramientas de diseño 3D y realidad aumentada",
      technologyCost: "Medio",
      contentRepresentation: "Visual e interactiva",
      strategyPotentiation: "Alta - combina arte, tecnología e innovación",
      totalDuration: "100",
      openingDuration: "15",
      openingTeacherRole: "Inspirador",
      openingStudentRole: "Observador",
      developmentDuration: "70",
      developmentTeacherRole: "Facilitador",
      developmentStudentRole: "Artista-Tecnólogo",
      closingDuration: "15",
      closingTeacherRole: "Evaluador",
      closingStudentRole: "Presentador",
      technicalResources: [],
      referenceFiles: [],
    }
  },
  {
    id: "history-vr",
    title: "Recreación de Eventos Históricos en Realidad Virtual",
    discipline: "Historia, Tecnología, Ciencias Sociales",
    grade: "9-11",
    duration: "110 min",
    description: "Los estudiantes investigan eventos históricos y crean experiencias de realidad virtual que permiten a otros vivir y comprender momentos clave de la historia.",
    icon: "🏛️",
    color: "from-amber-600 to-orange-600",
    data: {
      projectName: "Recreación de Eventos Históricos en Realidad Virtual",
      secretCode: "HISTORY-VR-001",
      disciplinaryArea: "Historia, Tecnología, Ciencias Sociales",
      grade: "9-11",
      members: ["Estudiante 1", "Estudiante 2", "Estudiante 3", "Estudiante 4"],
      learningObjective: "Los estudiantes investigarán eventos históricos significativos y crearán experiencias de realidad virtual que permitan a otros comprender y vivir esos momentos desde múltiples perspectivas.",
      pedagogicalStrategy: "Aprendizaje basado en investigación e inmersión",
      strategyJustification: "La realidad virtual proporciona una forma inmersiva de comprender la historia y desarrolla empatía histórica",
      technology: "CoSpaces Edu, Unity, Gafas VR, Cámaras 360",
      technologyType: "Herramientas de creación VR",
      technologyCost: "Medio-Alto",
      contentRepresentation: "Inmersiva y narrativa",
      strategyPotentiation: "Alta - transforma la comprensión histórica",
      totalDuration: "110",
      openingDuration: "20",
      openingTeacherRole: "Historiador-Guía",
      openingStudentRole: "Investigador",
      developmentDuration: "75",
      developmentTeacherRole: "Facilitador",
      developmentStudentRole: "Investigador-Creador",
      closingDuration: "15",
      closingTeacherRole: "Evaluador",
      closingStudentRole: "Presentador",
      technicalResources: [],
      referenceFiles: [],
    }
  },
];

export default function Examples() {
  const handleDownloadExample = (example: ExampleATE) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(example.data))
    );
    element.setAttribute("download", `${example.id}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Ejemplo "${example.title}" descargado. Puedes importarlo en el Creator`);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Ejemplos de ATE</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ejemplos de ATE por Disciplina
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explora ejemplos completos de Actividades Tecnológicas Escolares en diferentes disciplinas. 
            Descarga cualquier ejemplo e impórtalo en el Creator para adaptarlo a tu contexto.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <Card 
              key={example.id} 
              className="overflow-hidden border-2 border-blue-200 hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${example.color} text-white p-6`}>
                <div className="text-4xl mb-2">{example.icon}</div>
                <h3 className="text-xl font-bold">{example.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-600">Disciplina</p>
                    <p className="text-gray-900">{example.discipline}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-600">Grado</p>
                    <p className="text-gray-900">{example.grade}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-600">Duración</p>
                    <p className="text-gray-900">{example.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Descripción</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {example.description}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <Button 
                  onClick={() => handleDownloadExample(example)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 mt-4"
                >
                  <Download className="w-4 h-4" />
                  Descargar Ejemplo
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 border-0">
            <h2 className="text-3xl font-bold mb-4">¿Listo para crear tu propia ATE?</h2>
            <p className="text-lg mb-6 text-blue-50">
              Usa estos ejemplos como inspiración o descárgalos para adaptarlos a tu contexto
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
