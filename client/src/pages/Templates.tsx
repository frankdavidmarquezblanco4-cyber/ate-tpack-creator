import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useLocation } from "wouter";
import { templates } from "@/lib/templates";
import { toast } from "sonner";

/**
 * Templates Page - Plantillas prediseñadas para ATE
 * 
 * Permite a los docentes seleccionar una plantilla y comenzar rápidamente
 */

export default function Templates() {
  const [, setLocation] = useLocation();

  const handleSelectTemplate = (templateId: string) => {
    // Guardar la plantilla seleccionada en sessionStorage para que Creator la cargue
    sessionStorage.setItem("selectedTemplate", templateId);
    toast.success("Plantilla seleccionada. Redirigiendo al Creator...");
    // Navegar al Creator con la plantilla
    setTimeout(() => {
      setLocation("/creator");
    }, 500);
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
          <h1 className="text-2xl font-bold text-gray-900">Plantillas de ATE</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plantillas Prediseñadas
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Selecciona una plantilla para comenzar rápidamente. Cada plantilla incluye 
            estructura, guías y ejemplos que puedes personalizar según tu contexto educativo.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className="overflow-hidden border-2 border-blue-200 hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${template.color} text-white p-6`}>
                <div className="text-4xl mb-2">{template.icon}</div>
                <h3 className="text-xl font-bold">{template.name}</h3>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-600">Disciplina</p>
                    <p className="text-gray-900">{template.discipline}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-600">Grados</p>
                    <p className="text-gray-900">{template.grade}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-600">Duración</p>
                    <p className="text-gray-900">{template.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Descripción</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {template.description}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <Button 
                  onClick={() => handleSelectTemplate(template.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 mt-4"
                >
                  <Plus className="w-4 h-4" />
                  Usar Plantilla
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo usar las plantillas?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Selecciona una plantilla</h4>
              <p className="text-gray-700 text-sm">
                Elige la plantilla que mejor se adapte a tu tipo de actividad educativa.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Personaliza el contenido</h4>
              <p className="text-gray-700 text-sm">
                Reemplaza los placeholders con tu contenido específico y adapta la plantilla.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Guarda y exporta</h4>
              <p className="text-gray-700 text-sm">
                Guarda tu ATE en la base de datos y exporta a PDF, Word o PowerPoint.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 border-0">
            <h2 className="text-3xl font-bold mb-4">¿Prefieres crear desde cero?</h2>
            <p className="text-lg mb-6 text-blue-50">
              También puedes crear una ATE completamente personalizada sin usar plantillas
            </p>
            <Link href="/creator">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-3">
                Crear ATE desde Cero
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
