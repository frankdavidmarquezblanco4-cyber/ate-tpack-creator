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
    keywords: ["hola", "ayuda", "qué es", "cómo funciona", "inicio", "bienvenido"],
    response: `🎓 **Bienvenido a ATE-TPACK Creator**

Soy tu asistente virtual y estoy aquí para ayudarte a diseñar Actividades Tecnológicas Escolares (ATE) de forma coherente usando el modelo TPACK.

**Puedo ayudarte con:**
- ✅ Cómo crear una ATE paso a paso
- ✅ Explicación del modelo TPACK
- ✅ Estrategias pedagógicas disponibles
- ✅ Campos obligatorios y cómo completarlos
- ✅ Cómo recuperar trabajos guardados
- ✅ Exportación de documentos (PDF, Word, PowerPoint)
- ✅ Navegación de la plataforma
- ✅ Solución de problemas

**¿Sobre qué necesitas ayuda? Escribe una palabra clave como:**
"crear", "campos", "estrategia", "exportar", "tpack", "recuperar", etc.`
  },
  
  crear_ate: {
    keywords: ["crear", "nuevo", "proyecto", "empezar", "comenzar", "paso", "pasos"],
    response: `📋 **Cómo Crear una ATE Completa**

Una ATE (Actividad Tecnológica Escolar) se crea en **4 pasos sencillos**:

---

**PASO 1️⃣ - INFORMACIÓN DEL GRUPO** (Datos básicos)
Completa:
- 📝 **Nombre del proyecto** - Ej: "Drones para monitoreo ambiental"
- 🔐 **Código de acceso** - Ej: "ATE2024Grupo5" (solo tú lo conoces)
- 📚 **Área disciplinar** - Ej: Ciencias Naturales, Matemáticas, Lenguaje
- 👥 **Grado** - Ej: 10°, 11°
- 👤 **Integrantes** - Nombres del grupo (opcional)

---

**PASO 2️⃣ - PROBLEMA PEDAGÓGICO** (¿Qué y cómo enseñar?)
Completa:
- 🎯 **Objetivo de aprendizaje** - ¿Qué deben aprender? Sé específico
  Ej: "Los estudiantes comprenderán cómo los drones se utilizan para monitorear la erosión costera"
- 🧠 **Estrategia pedagógica** - ¿Cómo enseñarás? (ABP, Aula Invertida, Gamificación, etc.)
- 💡 **Justificación** - ¿Por qué elegiste esa estrategia?

---

**PASO 3️⃣ - TECNOLOGÍA** (Herramientas digitales)
Completa:
- 💻 **Tecnología** - ¿Qué herramienta usarás? Ej: "Drones DJI, software de análisis"
- 📱 **Tipo de tecnología** - Ej: Hardware, Software, Plataforma web
- 💰 **Acceso/Costo** - Ej: Gratuito, Freemium, Pago, Institucional

---

**PASO 4️⃣ - SECUENCIA DIDÁCTICA** (Plan de la clase)
Divide tu clase en 3 fases:

**🔵 APERTURA / ENGANCHE** (5-15 min)
- Duración en minutos
- Rol del docente: ¿Qué haces? Ej: "Presento un video de erosión costera"
- Rol de estudiantes: ¿Qué hacen? Ej: "Observan y hacen preguntas"

**🟢 DESARROLLO / CONSTRUCCIÓN** (30-50 min)
- Duración en minutos
- Rol del docente: ¿Qué haces? Ej: "Guío el uso del drone"
- Rol de estudiantes: ¿Qué hacen? Ej: "Operan drones y recopilan datos"

**🟠 CIERRE / REFLEXIÓN** (10-15 min)
- Duración en minutos
- Rol del docente: ¿Qué haces? Ej: "Facilito la reflexión"
- Rol de estudiantes: ¿Qué hacen? Ej: "Presentan hallazgos y conclusiones"

---

**⏱️ DURACIÓN TOTAL**: Suma automática de las 3 fases

---

**EXPORTAR** (Paso final)
Una vez completes todo, elige tu formato:
- 📄 **PDF** - Documento profesional para imprimir
- 📝 **Word** - Editable en Microsoft Word o Google Docs
- 🎬 **PowerPoint** - Presentación para mostrar a colegas

**💾 Tu trabajo se guarda automáticamente cada segundo**`
  },

  campos_obligatorios: {
    keywords: ["obligatorio", "requerido", "asterisco", "campo", "falta", "completa", "vacío", "vacio"],
    response: `⚠️ **Campos Obligatorios - IMPORTANTE**

Todos los campos marcados con **\*** son **OBLIGATORIOS**.

**NO PUEDES:**
- ❌ Avanzar al siguiente paso sin completarlos
- ❌ Exportar (PDF, Word, PowerPoint) sin completarlos
- ❌ Guardar el trabajo sin completarlos

Si intentas hacerlo, verás un mensaje de error indicando exactamente cuáles campos faltan.

---

**LISTA COMPLETA DE CAMPOS OBLIGATORIOS:**

**PASO 1:**
- ✓ Nombre del proyecto
- ✓ Código de acceso
- ✓ Área disciplinar
- ✓ Grado

**PASO 2:**
- ✓ Objetivo de aprendizaje
- ✓ Estrategia pedagógica
- ✓ Justificación de estrategia

**PASO 3:**
- ✓ Tecnología
- ✓ Tipo de tecnología
- ✓ Acceso/Costo

**PASO 4:**
- ✓ Duración total
- ✓ Duración Apertura
- ✓ Duración Desarrollo
- ✓ Duración Cierre
- ✓ Rol del docente en Apertura
- ✓ Rol de estudiantes en Apertura
- ✓ Rol del docente en Desarrollo
- ✓ Rol de estudiantes en Desarrollo
- ✓ Rol del docente en Cierre
- ✓ Rol de estudiantes en Cierre

---

**CAMPOS OPCIONALES:**
- ⭕ Integrantes 2 y 3 (Paso 1)
- ⭕ Representación del contenido (Paso 2)
- ⭕ Potenciación de estrategia (Paso 2)

**Si algún campo está vacío, complétalo antes de continuar.**`
  },

  codigo_acceso: {
    keywords: ["código", "acceso", "recuperar", "trabajo", "guardado", "mostrar", "contraseña", "seguro"],
    response: `🔐 **Código de Acceso - Tu Clave Secreta**

El código de acceso es como una **contraseña** que protege tu ATE.

---

**¿CÓMO CREAR UN CÓDIGO SEGURO?**

Usa una combinación que solo tú conozcas:
- ✅ "ATE2024Grupo5"
- ✅ "Drones_Erosion_2024"
- ✅ "Proyecto_Ambiental_10B"
- ❌ Evita: "123456", "password", "abc"

**Características:**
- Puede tener números, letras y guiones
- Mínimo 6 caracteres
- No lo compartas con nadie

---

**¿CÓMO USAR TU CÓDIGO?**

**Para recuperar tu trabajo:**
1. Ve a la página principal
2. Haz clic en **"Acceder a Trabajo"**
3. Ingresa tu código exactamente como lo creaste
4. Elige:
   - 📝 **Editar** - Continúa trabajando
   - 💾 **Descargar** - Obtén el archivo

---

**MOSTRAR/OCULTAR CÓDIGO:**
- Haz clic en el ícono del **ojo** para ver u ocultar tu código mientras lo escribes
- Útil si alguien está mirando tu pantalla

---

**⚠️ IMPORTANTE:**
- 🔴 **SIN CÓDIGO = SIN RECUPERACIÓN**
- Guarda tu código en un lugar seguro (libreta, correo, etc.)
- Si lo olvidas, no podremos recuperar tu trabajo
- Cada nueva ATE requiere un código diferente

**💡 CONSEJO:** Crea un código que sea fácil de recordar pero difícil de adivinar.`
  },

  duracion: {
    keywords: ["duración", "tiempo", "minutos", "horas", "cuánto", "tiempo", "otra"],
    response: `⏱️ **Campos de Duración - Solo Números**

Los campos de duración **SOLO ACEPTAN NÚMEROS** (en minutos).

---

**¿CÓMO COMPLETARLOS?**

1. **Ingresa solo números**
   - ✅ Escribe: 45
   - ❌ No escribas: "45 minutos" o "3/4 hora"

2. **La palabra "minutos" aparece automáticamente**
   - Escribes: 45
   - Se muestra: 45 minutos ✓

3. **Opciones predefinidas:**
   - 60 minutos (1 hora)
   - 75 minutos (1 hora 15 min)
   - 90 minutos (1 hora 30 min)
   - **Otra duración** - Escribe el número que quieras

---

**EJEMPLO PRÁCTICO:**

Clase de 90 minutos total:
- **Apertura:** 10 minutos
- **Desarrollo:** 65 minutos
- **Cierre:** 15 minutos
- **Total:** 90 minutos ✓

---

**CAMPOS DE DURACIÓN:**

**En PASO 4 (Secuencia Didáctica):**
- ⏱️ Duración total de la lección
- ⏱️ Duración de Apertura
- ⏱️ Duración de Desarrollo
- ⏱️ Duración de Cierre

**Validación:**
- Solo se aceptan números (0-999)
- No se permiten letras ni símbolos
- Si escribes algo inválido, se borra automáticamente

**💡 CONSEJO:** La duración total debe ser aproximadamente igual a la suma de las 3 fases.`
  },

  exportar: {
    keywords: ["exportar", "descargar", "pdf", "word", "powerpoint", "pptx", "documento", "formato"],
    response: `📥 **Exportar tu ATE - 3 Formatos Profesionales**

Una vez completes todos los pasos, podrás descargar tu ATE en 3 formatos diferentes.

---

**1️⃣ PDF - Documento Profesional**
- 📄 Formato: PDF (Portable Document Format)
- ✅ Ideal para: Imprimir, compartir por correo, archivar
- 🎨 Diseño: Profesional con colores TPACK
- ✏️ Editable: No (documento fijo)
- 📱 Compatible: Todos los dispositivos

**Contenido:**
- Encabezado profesional
- Información del grupo
- Objetivo de aprendizaje
- Estrategia pedagógica
- Tecnología seleccionada
- Secuencia didáctica completa
- Evaluación

---

**2️⃣ WORD - Documento Editable**
- 📝 Formato: .docx (Microsoft Word)
- ✅ Ideal para: Hacer cambios, personalizar, agregar contenido
- ✏️ Editable: Sí (puedes modificar todo)
- 🖥️ Compatible: Microsoft Word, Google Docs, LibreOffice

**Ventajas:**
- Cambia colores, fuentes, estilos
- Agrega imágenes, tablas, gráficos
- Inserta comentarios o notas
- Comparte con colegas para colaborar

---

**3️⃣ POWERPOINT - Presentación Interactiva**
- 🎬 Formato: .pptx (PowerPoint)
- ✅ Ideal para: Presentar ante colegas, directivos, capacitaciones
- 🎨 Diseño: Diapositivas dinámicas con animaciones
- 📊 Contenido: Una diapositiva por sección

**Características:**
- Diapositivas profesionales
- Colores y diseño TPACK
- Fácil de presentar
- Puedes agregar notas del orador

---

**¿CÓMO EXPORTAR?**

1. Completa todos los 4 pasos
2. En el último paso verás 3 botones:
   - 📄 "Descargar PDF"
   - 📝 "Descargar Word"
   - 🎬 "Descargar PowerPoint"
3. Haz clic en el formato que prefieras
4. El archivo se descargará automáticamente

---

**⚠️ IMPORTANTE:**
- ❌ NO puedes exportar si hay campos obligatorios vacíos
- ✅ Verás un mensaje indicando qué campos faltan
- 💾 Completa todos los campos primero
- ✓ Luego intenta exportar nuevamente

**💡 CONSEJO:** Descarga en los 3 formatos para tener opciones. PDF para archivar, Word para editar, PowerPoint para presentar.`
  },

  tpack: {
    keywords: ["tpack", "modelo", "contenido", "pedagogía", "tecnología", "ck", "pk", "tk", "integración"],
    response: `🎓 **Modelo TPACK - La Integración Perfecta**

TPACK es un modelo que integra **3 tipos de conocimiento** para crear experiencias de aprendizaje transformadoras.

---

**CK - CONOCIMIENTO DE CONTENIDO** 🟦 (Content Knowledge)

¿QUÉ enseñarás?
- Dominio profundo del tema o materia
- Conceptos, principios, hechos clave
- Comprensión del área disciplinar

**Ejemplo en Drones:**
- Conceptos de aerodinámica
- Principios de GPS y navegación
- Impacto ambiental de la erosión costera
- Interpretación de datos geoespaciales

---

**PK - CONOCIMIENTO PEDAGÓGICO** 🟩 (Pedagogical Knowledge)

¿CÓMO enseñarás?
- Estrategias y métodos de enseñanza
- Cómo motivar a los estudiantes
- Cómo estructurar el aprendizaje
- Evaluación y retroalimentación

**Ejemplo en Drones:**
- Aprendizaje Basado en Proyectos (ABP)
- Trabajo colaborativo en equipos
- Aprender haciendo (hands-on)
- Reflexión sobre el impacto ambiental

---

**TK - CONOCIMIENTO TECNOLÓGICO** 🟧 (Technological Knowledge)

¿QUÉ TECNOLOGÍA usarás?
- Herramientas digitales y recursos
- Plataformas y software
- Hardware y dispositivos
- Cómo funcionan las tecnologías

**Ejemplo en Drones:**
- Drones DJI (hardware)
- Software de análisis de imágenes
- Plataformas de mapeo (Google Earth)
- Sensores y cámaras

---

**LA MAGIA: CK + PK + TK = ATE EFECTIVA** ✨

Cuando integras coherentemente los 3 conocimientos:
- ✅ Los estudiantes aprenden contenido profundo
- ✅ Usan estrategias pedagógicas efectivas
- ✅ Aprovechan la tecnología de forma significativa
- ✅ Crean experiencias transformadoras

**¿Qué pasa si falta uno?**
- ❌ Solo CK: Clase aburrida sin tecnología
- ❌ Solo PK: Buena pedagogía pero sin contenido real
- ❌ Solo TK: Tecnología por tecnología, sin propósito
- ✅ CK + PK + TK: ¡ATE TPACK perfecta!

---

**EN ATE-TPACK CREATOR:**

Cada paso te ayuda a integrar los 3 conocimientos:
- **Paso 2** → CK: Objetivo de aprendizaje (contenido)
- **Paso 2** → PK: Estrategia pedagógica (cómo enseñar)
- **Paso 3** → TK: Tecnología seleccionada (herramientas)
- **Paso 4** → Integración: Secuencia didáctica coherente

**💡 CONSEJO:** Asegúrate de que los 3 conocimientos estén conectados y se refuercen mutuamente.`
  },

  estrategias: {
    keywords: ["estrategia", "pedagógica", "abp", "aula invertida", "gamificación", "método", "enseñanza"],
    response: `🧠 **Estrategias Pedagógicas - Elige la Mejor**

Una estrategia pedagógica es el **método o enfoque** que usarás para enseñar.

---

**1. ABP - APRENDIZAJE BASADO EN PROYECTOS** 🎯

¿Qué es?
- Los estudiantes resuelven un proyecto real y significativo
- Trabajan en equipos durante varias sesiones
- Crean un producto o solución

Ideal para:
- Problemas complejos y multidisciplinarios
- Desarrollar creatividad y pensamiento crítico
- Aprendizaje profundo y duradero

Ejemplo: "Diseñar un sistema de drones para monitorear erosión costera"

---

**2. APRENDIZAJE BASADO EN PROBLEMAS** 🔍

¿Qué es?
- Los estudiantes investigan y resuelven problemas específicos
- Desarrollan habilidades de investigación
- Aplican conocimiento a situaciones reales

Ideal para:
- Pensamiento crítico y análisis
- Desarrollo de habilidades de investigación
- Comprensión profunda de conceptos

Ejemplo: "¿Cómo podemos usar tecnología para medir la erosión?"

---

**3. AULA INVERTIDA (Flipped Classroom)** 🔄

¿Qué es?
- Los estudiantes aprenden teoría en casa (videos, lecturas)
- En clase practican y aplican (actividades, proyectos)
- El rol del docente cambia a facilitador

Ideal para:
- Contenido teórico que requiere práctica
- Maximizar tiempo de clase
- Aprendizaje personalizado

Ejemplo: "Ven videos sobre drones en casa, practica en clase"

---

**4. GAMIFICACIÓN** 🎮

¿Qué es?
- Elementos de juego motivan el aprendizaje
- Puntos, niveles, desafíos, competencias
- Aumenta motivación y engagement

Ideal para:
- Aumentar motivación de estudiantes
- Hacer el aprendizaje divertido
- Desarrollar habilidades de forma lúdica

Ejemplo: "Gana puntos operando drones correctamente"

---

**5. APRENDIZAJE COLABORATIVO** 👥

¿Qué es?
- Los estudiantes trabajan en equipos
- Comparten responsabilidades y conocimiento
- Aprenden juntos

Ideal para:
- Desarrollar habilidades sociales
- Resolver problemas complejos
- Crear comunidades de aprendizaje

Ejemplo: "Equipos de 3-4 estudiantes operan drones juntos"

---

**6. APRENDIZAJE EXPERIENCIAL** 🌍

¿Qué es?
- Aprender haciendo (hands-on)
- Experiencias directas y prácticas
- Reflexión sobre lo vivido

Ideal para:
- Aprendizaje significativo
- Desarrollo de habilidades prácticas
- Conexión con la realidad

Ejemplo: "Los estudiantes operan drones reales en campo"

---

**7. OTRO** ✍️

¿Qué es?
- Tu estrategia personalizada
- Combina elementos de varias estrategias
- Adaptada a tu contexto específico

Ideal para:
- Contextos únicos y especiales
- Combinaciones innovadoras
- Estrategias emergentes

---

**¿CÓMO ELEGIR?**

1. **Considera tu objetivo de aprendizaje**
   - ¿Qué deben aprender los estudiantes?

2. **Piensa en tus estudiantes**
   - ¿Qué los motiva?
   - ¿Cuál es su nivel?

3. **Evalúa tus recursos**
   - ¿Qué tecnología tienes?
   - ¿Cuánto tiempo dispones?

4. **Elige la que mejor se alinee**
   - La estrategia debe potenciar tu objetivo
   - Debe ser viable en tu contexto

**💡 CONSEJO:** Puedes combinar estrategias. Ej: ABP + Gamificación`
  },

  secuencia: {
    keywords: ["secuencia", "didáctica", "apertura", "desarrollo", "cierre", "fase", "rol", "docente", "estudiante"],
    response: `📚 **Secuencia Didáctica - El Plan de tu Clase**

La secuencia didáctica es el **plan paso a paso** de cómo se desarrollará tu clase.

Se divide en **3 fases principales:**

---

**FASE 1️⃣ - APERTURA / ENGANCHE** 🔵

⏱️ **Duración típica:** 5-15 minutos

¿QUÉ OCURRE?
- Captas la atención de los estudiantes
- Contextualizas el tema
- Presentas el problema o desafío
- Activas conocimientos previos

**ROL DEL DOCENTE:**
- Presenta un video, pregunta provocadora, o situación problemática
- Ejemplo: "Miren este video de erosión costera... ¿Cómo podríamos medirla?"

**ROL DE ESTUDIANTES:**
- Observan, escuchan, preguntan
- Se interesan en el tema
- Ejemplo: "¿Realmente se puede usar un drone para eso?"

**EJEMPLO COMPLETO:**
- Docente: Muestra imágenes de playas erosionadas
- Estudiantes: Observan y preguntan
- Objetivo: Generar curiosidad sobre el problema

---

**FASE 2️⃣ - DESARROLLO / CONSTRUCCIÓN** 🟢

⏱️ **Duración típica:** 30-50 minutos

¿QUÉ OCURRE?
- Actividad principal donde ocurre el aprendizaje
- Los estudiantes trabajan con la tecnología
- Construyen conocimiento activamente
- Colaboran y resuelven el problema

**ROL DEL DOCENTE:**
- Guía y facilita el proceso
- Resuelve dudas y problemas técnicos
- Hace preguntas que estimulan el pensamiento
- Monitorea el progreso

Ejemplo: "Guío a los estudiantes en el uso del drone"

**ROL DE ESTUDIANTES:**
- Construyen conocimiento activamente
- Colaboran en equipos
- Usan la tecnología
- Recopilan datos o crean soluciones

Ejemplo: "Los estudiantes operan drones y recopilan imágenes"

**EJEMPLO COMPLETO:**
- Docente: Explica cómo usar el drone
- Estudiantes: Practican en equipos
- Resultado: Recopilan datos de erosión costera

---

**FASE 3️⃣ - CIERRE / REFLEXIÓN** 🟠

⏱️ **Duración típica:** 10-15 minutos

¿QUÉ OCURRE?
- Conclusión y reflexión sobre lo aprendido
- Evaluación informal
- Conexión con el objetivo de aprendizaje
- Reflexión sobre el proceso

**ROL DEL DOCENTE:**
- Facilita la reflexión
- Hace preguntas clave
- Sintetiza aprendizajes
- Conecta con objetivos

Ejemplo: "¿Qué aprendieron? ¿Cómo se relaciona con la erosión?"

**ROL DE ESTUDIANTES:**
- Comparten aprendizajes y conclusiones
- Reflexionan sobre lo vivido
- Responden preguntas
- Proponen aplicaciones

Ejemplo: "Los estudiantes presentan sus hallazgos"

**EJEMPLO COMPLETO:**
- Docente: "¿Qué descubrieron sobre la erosión?"
- Estudiantes: Presentan datos y conclusiones
- Resultado: Reflexión sobre impacto ambiental

---

**CÁLCULO DE DURACIÓN TOTAL:**

Apertura (10 min) + Desarrollo (60 min) + Cierre (15 min) = **Total: 85 minutos**

---

**CONSEJOS PARA UNA BUENA SECUENCIA:**

✅ **Apertura:**
- Comienza con algo que capture atención
- Conecta con experiencias previas
- Presenta claramente el desafío

✅ **Desarrollo:**
- Es la fase más larga (donde ocurre el aprendizaje)
- Proporciona apoyo y guía
- Permite que los estudiantes experimenten

✅ **Cierre:**
- Sintetiza lo aprendido
- Reflexiona sobre el proceso
- Conecta con objetivos iniciales

**💡 CONSEJO:** Asegúrate de que las 3 fases fluyan naturalmente y lleven a los estudiantes a lograr el objetivo de aprendizaje.`
  },

  recuperar: {
    keywords: ["recuperar", "acceder", "trabajo anterior", "editar", "cargar", "código", "guardado"],
    response: `🔄 **Recuperar tu Trabajo - Acceso Rápido**

Si ya creaste una ATE y quieres continuarla o descargarla:

---

**PASOS PARA RECUPERAR:**

1. **Ve a la página principal** (Inicio)
2. **Haz clic en "Acceder a Trabajo"**
3. **Ingresa tu código de acceso** (exactamente como lo creaste)
4. **Elige una opción:**
   - ✏️ **Editar** - Continúa trabajando en tu ATE
   - 💾 **Descargar** - Obtén el archivo guardado

---

**IMPORTANTE:**

⚠️ **Necesitas el código de acceso exacto**
- Mayúsculas y minúsculas importan
- Espacios y caracteres especiales cuentan
- Ej: "ATE2024" ≠ "ate2024"

🔴 **Si olvidas el código:**
- No podremos recuperar tu trabajo
- Guarda tu código en un lugar seguro
- Copia en un correo o libreta

✅ **Tu trabajo se guarda automáticamente**
- Cada segundo mientras trabajas
- No necesitas hacer clic en "Guardar"
- Pero necesitas el código para recuperarlo

---

**DIFERENCIA ENTRE EDITAR Y DESCARGAR:**

**EDITAR:**
- Continúas trabajando en la plataforma
- Haces cambios y mejoras
- Puedes exportar nuevamente

**DESCARGAR:**
- Obtienes el archivo guardado
- En formato JSON (datos estructurados)
- Puedes compartirlo o hacer backup

---

**CADA NUEVA ATE:**

- Cuando creas una nueva ATE, comienza desde cero
- No recupera datos de ATEs anteriores
- Necesitas un código de acceso diferente para cada una

---

**CONSEJOS:**

✅ Guarda tu código en múltiples lugares
✅ Usa un código que sea fácil de recordar
✅ Descarga tu ATE regularmente como backup
✅ Comparte tu código solo con tu grupo

**💡 CONSEJO:** Crea un documento con todos tus códigos de acceso para no perderlos.`
  },

  navegacion: {
    keywords: ["navegación", "menú", "botón", "inicio", "aprender", "ejemplo", "crear", "página", "ir"],
    response: `🗺️ **Navegación de la Página - Guía Completa**

La página tiene una estructura clara y fácil de navegar.

---

**BARRA DE NAVEGACIÓN** (Arriba)

🏠 **INICIO**
- Regresa a la página principal
- Visible desde cualquier página
- Acceso rápido a todas las secciones

📚 **APRENDER**
- Sección educativa sobre TPACK
- Explicación de los 6 componentes de ATE
- Ideal para entender el modelo

💡 **EJEMPLO**
- Caso de estudio completo
- "Drones para monitoreo de erosión costera"
- Ver cómo se estructura una ATE real

➕ **CREAR ATE** (Botón naranja)
- Inicia el wizard de 4 pasos
- Comienza tu nueva ATE
- Acceso directo al creador

---

**PÁGINA PRINCIPAL (INICIO)**

🎓 **Título:** ATE-TPACK Creator
📝 **Descripción:** Qué es y para qué sirve

**Dos opciones principales:**

1️⃣ **+ CREAR NUEVA ATE** (Botón azul)
   - Inicia una ATE nueva desde cero
   - Todos los campos están vacíos
   - Comienza el wizard de 4 pasos

2️⃣ **ACCEDER A TRABAJO** (Botón blanco)
   - Recupera una ATE anterior
   - Ingresa tu código de acceso
   - Edita o descarga

---

**PÁGINA APRENDER**

Información detallada sobre:
- ¿Qué es una ATE?
- ¿Qué es el modelo TPACK?
- Los 6 componentes de ATE
- Cómo se integran

Ideal para:
- Docentes nuevos
- Entender la metodología
- Clarificar conceptos

---

**PÁGINA EJEMPLO**

Caso de estudio completo:
- Proyecto: "Drones para monitoreo de erosión costera"
- Todos los 4 pasos completados
- Ejemplo de cómo se estructura una ATE

Útil para:
- Ver un ejemplo real
- Entender la estructura
- Inspirarte para tu propia ATE

---

**WIZARD DE CREACIÓN (4 PASOS)**

Cuando haces clic en "Crear ATE":

**Paso 1 → Paso 2 → Paso 3 → Paso 4**

En cada paso:
- 📋 Información clara de qué completar
- ⬅️ Botón "Atrás" para retroceder
- ➡️ Botón "Siguiente" para avanzar
- 🏠 Botón "Inicio" para volver al inicio

**Paso 4 (Final):**
- Botones de exportación (PDF, Word, PowerPoint)
- Opción de volver a editar

---

**ASISTENTE VIRTUAL** (Chatbot)

💬 **Botón flotante (abajo derecha)**
- Haz preguntas en cualquier momento
- Respuestas instantáneas
- Disponible en todas las páginas

---

**NAVEGACIÓN RÁPIDA:**

De cualquier página puedes:
- ✅ Hacer clic en "Inicio" para volver al inicio
- ✅ Usar la barra de navegación superior
- ✅ Usar el botón "Atrás" en el wizard
- ✅ Abrir el asistente virtual (chatbot)

---

**CONSEJOS:**

✅ Usa el asistente virtual si tienes dudas
✅ Lee la página "Aprender" antes de crear
✅ Revisa el "Ejemplo" para inspirarte
✅ Guarda tu código de acceso en un lugar seguro

**💡 CONSEJO:** Familiarízate con la navegación antes de comenzar tu ATE.`
  },

  problemas: {
    keywords: ["problema", "error", "no funciona", "no puedo", "ayuda", "falla", "bug", "solución"],
    response: `🆘 **Solución de Problemas - Preguntas Frecuentes**

---

**P1: No puedo avanzar al siguiente paso**

❌ Problema: Ves un mensaje de error
✅ Solución:
- Verifica que TODOS los campos obligatorios estén completos
- Busca campos vacíos o con solo espacios
- Lee el mensaje de error: indica exactamente qué falta
- Completa los campos faltantes
- Intenta nuevamente

---

**P2: Olvidé mi código de acceso**

❌ Problema: No puedo recuperar mi trabajo
✅ Solución:
- Desafortunadamente, sin el código no hay recuperación
- Guarda tu código en un lugar seguro desde ahora
- Para nuevas ATEs, usa un código que recuerdes
- Copia el código en un correo o documento

---

**P3: Mi trabajo no se guardó**

❌ Problema: Perdí mis cambios
✅ Solución:
- El guardado automático solo ocurre si TODOS los campos obligatorios están completos
- Completa todos los campos para que se guarde
- El guardado ocurre cada segundo (cuando está completo)
- Verifica que todos los campos obligatorios tengan contenido

---

**P4: No puedo exportar a PDF/Word/PowerPoint**

❌ Problema: Los botones de descarga no funcionan
✅ Solución:
- Verifica que TODOS los campos obligatorios estén completos
- Lee el mensaje de error: indica qué campos faltan
- Completa los campos faltantes
- Intenta exportar nuevamente
- Si persiste, intenta otro formato

---

**P5: El código de acceso no funciona**

❌ Problema: No puedo recuperar mi trabajo
✅ Solución:
- Verifica que escribas el código exactamente como lo creaste
- Las mayúsculas y minúsculas importan
- Los espacios cuentan
- Copia y pega el código si lo tienes guardado
- Intenta nuevamente

---

**P6: El asistente virtual no responde**

❌ Problema: El chatbot no da respuesta
✅ Solución:
- Recarga la página (F5)
- Intenta una pregunta más simple
- Usa palabras clave como: "crear", "campos", "exportar"
- Si persiste, intenta más tarde

---

**P7: Los campos de duración no aceptan números**

❌ Problema: No puedo escribir en duración
✅ Solución:
- Usa solo números (0-9)
- No incluyas letras ni símbolos
- No escribas "minutos" (aparece automáticamente)
- Ejemplo: Escribe "45" (no "45 minutos")

---

**P8: No veo el ícono del ojo en el código de acceso**

❌ Problema: No puedo mostrar/ocultar el código
✅ Solución:
- El ícono aparece cuando escribes en el campo
- Haz clic en el campo primero
- Luego busca el ícono del ojo a la derecha

---

**CONSEJOS GENERALES:**

✅ Completa TODOS los campos obligatorios
✅ Guarda tu código de acceso en múltiples lugares
✅ Usa el asistente virtual para dudas
✅ Lee los mensajes de error (dan pistas)
✅ Recarga la página si algo no funciona

**¿Aún tienes problemas?**
- Usa el asistente virtual (chatbot)
- Haz una pregunta específica
- Describe exactamente qué no funciona

**💡 CONSEJO:** La mayoría de problemas se resuelven completando todos los campos obligatorios.`
  }
};

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: assistantKnowledge.general.response,
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

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

    return `No encontré una respuesta específica para "${userMessage}". 

Intenta con palabras clave como:
- "crear" - Cómo crear una ATE
- "campos" - Campos obligatorios
- "código" - Código de acceso
- "duración" - Campos de duración
- "exportar" - Exportación de documentos
- "tpack" - Modelo TPACK
- "estrategia" - Estrategias pedagógicas
- "secuencia" - Secuencia didáctica
- "recuperar" - Recuperar trabajos
- "navegación" - Cómo navegar
- "problema" - Solución de problemas

¿Sobre qué necesitas ayuda?`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const response = findResponse(inputValue);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="w-96 h-96 flex flex-col shadow-2xl bg-white border-2 border-blue-200 rounded-xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-bold">Asistente Virtual</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-blue-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border-2 border-blue-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-blue-200 p-3 flex gap-2 bg-white rounded-b-lg">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Escribe tu pregunta..."
              className="text-sm border-2 border-blue-200 focus:border-blue-600"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
