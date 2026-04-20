import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const assistantKnowledge = {
  general: {
    keywords: ["hola", "ayuda", "qué es", "cómo funciona", "inicio"],
    response: `Bienvenido a **ATE-TPACK Creator**. Soy tu asistente virtual y estoy aquí para ayudarte.

Puedo responder preguntas sobre:
- **Cómo crear una ATE** (Actividad Tecnológica Escolar)
- **Componentes TPACK** (Contenido, Pedagogía, Tecnología)
- **Exportación de documentos** (PDF, Word, PowerPoint)
- **Recuperación de trabajos** con código de acceso
- **Navegación** de la plataforma

¿Sobre qué necesitas ayuda?`
  },
  
  crear_ate: {
    keywords: ["crear", "nuevo", "proyecto", "empezar", "comenzar"],
    response: `## Cómo Crear una ATE

1. **Haz clic en "Crear ATE"** en la página principal
2. **Completa 4 pasos:**
   - **Paso 1 - Información del Grupo**: Nombre del proyecto, código de acceso, área disciplinar, grado
   - **Paso 2 - Problema Pedagógico**: Objetivo de aprendizaje, estrategia pedagógica, justificación
   - **Paso 3 - Tecnología**: Herramienta tecnológica, tipo, acceso/costo
   - **Paso 4 - Secuencia Didáctica**: Duración total, fases (Apertura, Desarrollo, Cierre)

3. **Completa todos los campos marcados con \***
4. **Haz clic en "Siguiente"** para avanzar
5. **En el último paso, exporta tu ATE** en PDF, Word o PowerPoint

**Consejo**: Tu trabajo se guarda automáticamente cada segundo.`
  },

  campos_obligatorios: {
    keywords: ["obligatorio", "requerido", "asterisco", "campo", "falta"],
    response: `## Campos Obligatorios

Los campos marcados con **\*** son obligatorios y debes completarlos para continuar.

**Paso 1 - Información del Grupo:**
- Nombre del proyecto \*
- Código de acceso \*
- Área disciplinar \*
- Grado \*

**Paso 2 - Problema Pedagógico:**
- Objetivo de aprendizaje \*
- Estrategia pedagógica \*
- Justificación \*

**Paso 3 - Tecnología:**
- Tecnología \*
- Tipo de tecnología \*
- Acceso/Costo \*

**Paso 4 - Secuencia Didáctica:**
- Duración total \*
- Duración Apertura \*
- Duración Desarrollo \*
- Duración Cierre \*

Si intentas avanzar sin completar estos campos, verás un mensaje de error indicando cuáles faltan.`
  },

  codigo_acceso: {
    keywords: ["código", "acceso", "recuperar", "trabajo", "guardado", "mostrar", "contraseña"],
    response: `## Código de Acceso

El **código de acceso** es una clave secreta que protege tu trabajo.

**Cómo usarlo:**
1. **Al crear una ATE**: Ingresa un código que solo tú conozcas (ej: "ATE2024Grupo5")
2. **Para recuperar tu trabajo**: 
   - Ve a la página principal
   - Haz clic en "Acceder a Trabajo"
   - Ingresa tu código de acceso
   - Elige "Editar" para continuar trabajando o "Descargar" para obtener el archivo

**Mostrar/Ocultar**: Haz clic en el ícono del ojo para ver u ocultar tu código mientras lo escribes.

**Importante**: Guarda tu código en un lugar seguro. Sin él, no podrás recuperar tu trabajo.`
  },

  duracion: {
    keywords: ["duración", "tiempo", "minutos", "horas", "cuánto"],
    response: `## Campos de Duración

Los campos de duración solo aceptan **números** (minutos).

**Cómo completarlos:**
1. Ingresa solo números (ej: 45, 120, 180)
2. Automáticamente aparecerá la palabra "minutos" después del número
3. No incluyas la palabra "minutos" al escribir

**Ejemplo:**
- Escribes: 45
- Se muestra: 45 minutos

**Duración Total**: Suma de todas las fases (Apertura + Desarrollo + Cierre)

**Opciones predefinidas**: 60, 75, 90 minutos, o "Otra duración" para valores personalizados.`
  },

  exportar: {
    keywords: ["exportar", "descargar", "pdf", "word", "powerpoint", "pptx", "documento"],
    response: `## Exportar tu ATE

Cuando completes todos los pasos, podrás exportar tu ATE en 3 formatos:

**1. PDF** - Documento profesional e imprimible
- Ideal para imprimir o compartir
- Formato fijo, no editable

**2. Word (.docx)** - Documento editable
- Puedes hacer cambios después de descargar
- Compatible con Microsoft Word y Google Docs

**3. PowerPoint (.pptx)** - Presentación interactiva
- Diapositivas con diseño profesional
- Ideal para presentar ante colegas o directivos

**Cómo exportar:**
1. Completa todos los 4 pasos
2. En el último paso, verás 3 botones de descarga
3. Haz clic en el formato que prefieras
4. El archivo se descargará automáticamente

**Nota**: Los documentos se generan con estética profesional y están listos para usar.`
  },

  tpack: {
    keywords: ["tpack", "modelo", "contenido", "pedagogía", "tecnología", "ck", "pk", "tk"],
    response: `## Modelo TPACK

**TPACK** es un modelo que integra 3 tipos de conocimiento:

**CK - Conocimiento de Contenido (Content Knowledge)**
- ¿Qué enseñarás?
- Dominio del tema o materia
- Ejemplo: Conceptos de circuitos eléctricos

**PK - Conocimiento Pedagógico (Pedagogical Knowledge)**
- ¿Cómo enseñarás?
- Estrategias y métodos de enseñanza
- Ejemplo: Aprendizaje Basado en Proyectos (ABP)

**TK - Conocimiento Tecnológico (Technological Knowledge)**
- ¿Qué tecnología usarás?
- Herramientas digitales y recursos
- Ejemplo: Drones para monitoreo

**La magia ocurre cuando integras los 3:**
CK + PK + TK = Una ATE efectiva y transformadora

En ATE-TPACK Creator, cada paso te ayuda a integrar estos conocimientos coherentemente.`
  },

  estrategias: {
    keywords: ["estrategia", "pedagógica", "abp", "aula invertida", "gamificación", "método"],
    response: `## Estrategias Pedagógicas

Elige la estrategia que mejor se adapte a tu objetivo:

**ABP - Aprendizaje Basado en Proyectos**
- Los estudiantes resuelven un proyecto real
- Ideal para: Problemas complejos y multidisciplinarios

**Aprendizaje Basado en Problemas**
- Los estudiantes investigan y resuelven problemas
- Ideal para: Pensamiento crítico y análisis

**Aula Invertida (Flipped Classroom)**
- Los estudiantes aprenden en casa, practican en clase
- Ideal para: Contenido teórico que requiere práctica

**Gamificación**
- Elementos de juego motivan el aprendizaje
- Ideal para: Aumentar motivación y engagement

**Otro**: Especifica tu estrategia personalizada

**Consejo**: Elige una estrategia que motive a tus estudiantes y se alinee con tu objetivo de aprendizaje.`
  },

  secuencia: {
    keywords: ["secuencia", "didáctica", "apertura", "desarrollo", "cierre", "fase", "rol"],
    response: `## Secuencia Didáctica

La secuencia didáctica es el plan paso a paso de tu clase:

**① Apertura / Enganche** (5-15 minutos)
- Captar la atención de los estudiantes
- Contextualizar el tema
- **Rol del docente**: Presenta el problema o desafío
- **Rol de estudiantes**: Escuchan, preguntan, se interesan

**② Desarrollo / Construcción** (30-50 minutos)
- Actividad principal donde ocurre el aprendizaje
- Los estudiantes trabajan con la tecnología
- **Rol del docente**: Guía, facilita, resuelve dudas
- **Rol de estudiantes**: Construyen conocimiento, colaboran

**③ Cierre / Reflexión** (10-15 minutos)
- Conclusión y reflexión sobre lo aprendido
- Evaluación informal
- **Rol del docente**: Facilita la reflexión
- **Rol de estudiantes**: Comparten aprendizajes y conclusiones

**Total**: Apertura + Desarrollo + Cierre = Duración Total`
  },

  recuperar: {
    keywords: ["recuperar", "acceder", "trabajo anterior", "editar", "cargar"],
    response: `## Recuperar tu Trabajo

Si ya creaste una ATE y quieres continuarla:

**Pasos:**
1. En la página principal, haz clic en **"Acceder a Trabajo"**
2. Ingresa tu **código de acceso** (el que creaste originalmente)
3. Verás dos opciones:
   - **Editar**: Continúa trabajando en tu ATE
   - **Descargar**: Obtén el archivo guardado

**Importante:**
- Tu trabajo se guarda automáticamente cada segundo
- Necesitas el código de acceso exacto
- Si olvidas el código, no podrás recuperar tu trabajo
- Cada vez que creas una nueva ATE, comienza desde cero

**Consejo**: Guarda tu código de acceso en un lugar seguro.`
  },

  navegacion: {
    keywords: ["navegación", "menú", "botón", "inicio", "aprender", "ejemplo", "crear"],
    response: `## Navegación de la Página

**Barra de Navegación (visible en todas partes):**
- **Logo ATE-TPACK**: Haz clic para ir a la página principal
- **Inicio**: Regresa al menú principal desde cualquier página
- **Aprender**: Conoce los 6 componentes de una ATE
- **Ejemplo**: Ve un caso práctico completo (Drones y erosión costera)
- **Crear ATE**: Comienza a diseñar tu actividad

**Páginas Principales:**
1. **Inicio (Welcome)**: Presenta la plataforma, opciones para crear o acceder
2. **Aprender (Learn)**: Explica los 6 componentes de una ATE
3. **Ejemplo (Example)**: Caso práctico: "Drones para monitoreo de erosión costera"
4. **Creator**: Wizard de 4 pasos para crear tu ATE

**Botones de Ayuda:**
- Cada sección tiene explicaciones detalladas
- Los campos tienen ejemplos y sugerencias
- Este asistente está disponible en cualquier momento`
  },

  problemas: {
    keywords: ["error", "problema", "no funciona", "no puedo", "falla", "bug"],
    response: `## Solución de Problemas

**Mi trabajo no se guarda:**
- Verifica tu conexión a internet
- El guardado automático ocurre cada segundo
- Busca el mensaje de confirmación "ATE guardada correctamente"

**No puedo avanzar al siguiente paso:**
- Verifica que todos los campos obligatorios (\*) estén completos
- Lee el mensaje de error que indica qué campos faltan
- Completa los campos faltantes y vuelve a intentar

**Olvidé mi código de acceso:**
- Desafortunadamente, sin el código no puedes recuperar tu trabajo
- Guarda siempre tu código en un lugar seguro
- Para futuras ATE, anota tu código inmediatamente

**El documento descargado no se abre:**
- Verifica que tengas software compatible (Word, Adobe Reader, PowerPoint)
- Intenta descargar nuevamente
- Prueba con otro navegador

**Aún tengo problemas:**
- Recarga la página (F5 o Ctrl+R)
- Limpia el caché del navegador
- Intenta desde otro navegador`
  }
};

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy tu asistente virtual. ¿Cómo puedo ayudarte hoy?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const findResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, value] of Object.entries(assistantKnowledge)) {
      if (key === "general") continue;
      for (const keyword of value.keywords) {
        if (lowerMessage.includes(keyword)) {
          return value.response;
        }
      }
    }
    
    return assistantKnowledge.general.response;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simular delay de respuesta
    setTimeout(() => {
      const response = findResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        title="Asistente Virtual"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[600px] shadow-2xl border-2 border-slate-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">Asistente Virtual</h3>
            <p className="text-sm text-blue-100">Aquí para ayudarte 24/7</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < message.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4 rounded-b-lg">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="border-2 border-slate-300 focus:border-blue-600"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
