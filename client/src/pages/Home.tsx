import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Lightbulb, Zap } from "lucide-react";

/**
 * Home Page
 * 
 * Design Philosophy: Constructivista Moderno
 * - Hero section with generated image background
 * - Clear value proposition
 * - Feature cards with TPACK colors
 * - Call-to-action buttons
 */
export default function Home() {
  const heroImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663346110887/mUVW2Zqd3icGMZExmrW5z6/hero-tpack-construction-V4qpmtEU6SvR9uH3SB8ZBc.webp";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.7), rgba(22, 163, 74, 0.7)), url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Crea Actividades Tecnológicas Escolares
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Diseña experiencias de aprendizaje integradas con el modelo TPACK. 
            Combina Conocimiento de Contenido, Pedagógico y Tecnológico de forma coherente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/creator">
              <a>
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white gap-2 rounded-lg"
                >
                  Comenzar a Crear <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </Link>
            <Link href="/learn">
              <a>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-blue-50 text-blue-700 border-white gap-2 rounded-lg"
                >
                  Aprender Primero <BookOpen className="w-5 h-5" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Qué es una ATE?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una Actividad Tecnológica Escolar es una propuesta didáctica estructurada 
              basada en el construccionismo que integra diseño, construcción y reflexión 
              para resolver problemas reales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Learn */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aprende el Modelo</h3>
              <p className="text-gray-600 mb-4">
                Comprende los 6 componentes esenciales de una ATE y cómo se integran 
                el conocimiento de contenido, pedagógico y tecnológico.
              </p>
              <Link href="/learn">
                <a className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                  Explorar <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </Card>

            {/* Feature 2: Example */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ejemplo Práctico</h3>
              <p className="text-gray-600 mb-4">
                Observa un ejemplo completo: "Drones para monitoreo de erosión costera". 
                Entiende cómo se estructura una ATE desde el problema hasta la evaluación.
              </p>
              <Link href="/example">
                <a className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
                  Ver Ejemplo <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </Card>

            {/* Feature 3: Create */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-l-4 border-l-orange-600">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Crea tu ATE</h3>
              <p className="text-gray-600 mb-4">
                Diseña tu propia ATE con nuestro wizard interactivo. Incluye validación, 
                autoguardado y exportación a PDF, Word y presentaciones.
              </p>
              <Link href="/creator">
                <a className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2">
                  Crear Ahora <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* TPACK Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                El Modelo TPACK
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                TPACK (Technological Pedagogical Content Knowledge) es un marco que 
                describe los tipos de conocimiento que los docentes necesitan para 
                enseñar efectivamente con tecnología.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">CK</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Conocimiento de Contenido</h4>
                    <p className="text-gray-600">El conocimiento de la disciplina o materia a enseñar.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">PK</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Conocimiento Pedagógico</h4>
                    <p className="text-gray-600">Las estrategias y métodos para enseñar efectivamente.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold">TK</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Conocimiento Tecnológico</h4>
                    <p className="text-gray-600">La comprensión de las herramientas y tecnologías disponibles.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663346110887/mUVW2Zqd3icGMZExmrW5z6/pedagogical-collaboration-Q7Th9urpEVm3bNfMYAYeGM.webp"
                alt="Colaboración Pedagógica"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para diseñar tu ATE?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Comienza ahora con nuestro wizard interactivo y crea experiencias 
            de aprendizaje transformadoras.
          </p>
          <Link href="/creator">
            <a>
              <Button 
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white gap-2 rounded-lg"
              >
                Crear mi Primera ATE <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
