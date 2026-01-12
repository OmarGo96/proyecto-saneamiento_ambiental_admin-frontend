# CHANGELOG

Todos los cambios notables del proyecto estaran documentados en este archivo.

## [Feature/Fix] - 2026-01-11

### ✨ Nuevas características

#### Tabla de declaraciones con pase a caja
- **declarations-payment-receipt.component.html**: Agregada nueva columna "Aplicado en sygem"
  - Muestra "Si" con badge verde cuando `declaration.serie != null`
  - Muestra "No" con badge naranja cuando `declaration.serie == null`
  - Estilo consistente con la columna de estatus

### 🐛 Correcciones

#### Navegación de declaraciones
- **declarations-payment-receipt.component.ts**: Corregido problema de doble barra diagonal (`//`) en la URL al abrir detalles de declaración
  - Se eliminan barras diagonales redundantes del `baseHref` para evitar URLs malformadas

#### Vista de detalles de declaración
- **declarations-details.component.html**: Cambiado icono de navegación por icono de información
  - Reemplazado icono de flecha (`pi-arrow-left`) por icono de información (`pi-info-circle`)
  - Eliminada funcionalidad de navegación del botón

---

## [Refactor] - 2026-01-10

### 🔧 Refactorización

#### Cambio de IDs numéricos a UUIDs
Se realizó una refactorización completa del sistema para migrar de identificadores numéricos (IDs) a identificadores únicos universales (UUIDs) en toda la aplicación.

**Módulos afectados:**

##### 📊 Companies (Empresas)
- **add-companies-documentation-dialog.component.ts**: Actualizado manejo de IDs a UUIDs para documentación de empresas
- **unlink-companies-dialog.component.html**: Adaptado componente de desvinculación para UUIDs
- **unlink-companies-dialog.component.ts**: Actualizada lógica de desvinculación con UUIDs
- **companies-detail.component.ts**: Refactorizado detalle de empresas para trabajar con UUIDs
- **companies-files.component.ts**: Añadida compatibilidad con UUIDs en archivos de empresas
- **companies-list.component.html**: Actualizada lista de empresas para mostrar UUIDs
- **companies-with-representative.component.html**: Adaptada vista de empresas con representante
- **companies-with-representative.component.ts**: Actualizada lógica para UUIDs
- **companies-without-representative.component.html**: Adaptada vista de empresas sin representante

##### ⚙️ Configurations (Configuraciones)
- **opening-by-company-dialog.component.html**: Actualizado diálogo de apertura por empresa
- **opening-by-company-dialog.component.ts**: Refactorizada lógica para UUIDs
- **update-collection-dialog.component.ts**: Actualizado diálogo de actualización de recaudación
- **opening-statements.component.html**: Adaptada vista de declaraciones de apertura
- **opening-statements.component.ts**: Refactorizada lógica con UUIDs
- **opening.service.ts**: Actualizado servicio de apertura para manejar UUIDs

##### 📈 Dashboard
- **total-drafts-declarations-chart.component.ts**: Optimizado componente de gráficas (eliminada importación no utilizada)
- **dashboard.component.ts**: Actualizado dashboard principal para UUIDs

##### 📋 Declarations (Declaraciones)
- **reject-declaration-dialog.component.ts**: Actualizado diálogo de rechazo con UUIDs
- **upload-declaration-payment-receipt-dialog.component.ts**: Refactorizado para UUIDs en recibos de pago
- **declarations-details.component.html**: Adaptada vista de detalles de declaraciones
- **declarations-payment-receipt.component.ts**: Actualizado componente de recibos de pago

##### 📝 Requests (Solicitudes)
- **reject-requests-dialog.component.ts**: Actualizado diálogo de rechazo de solicitudes
- **requests-registrations.component.ts**: Refactorizado componente de registros con UUIDs
- **requests-users.component.ts**: Actualizado componente de usuarios en solicitudes

##### 👥 Users (Usuarios)
- **update-users-dialog.component.ts**: Actualizado diálogo de actualización de usuarios
- **users.component.html**: Adaptada vista de usuarios para mostrar UUIDs

### 📊 Estadísticas del cambio
- **26 archivos modificados**
- **44 inserciones (+)**
- **38 eliminaciones (-)**

---

### Beneficios de la migración a UUIDs:
- ✅ Mayor seguridad al no exponer IDs secuenciales
- ✅ Identificadores únicos globales
- ✅ Mejor escalabilidad para sistemas distribuidos
- ✅ Prevención de ataques de enumeración
- ✅ Compatibilidad con estándares modernos de APIs
