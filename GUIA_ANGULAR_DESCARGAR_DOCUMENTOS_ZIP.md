# Guía: Implementar Botón de Descarga de Documentos ZIP

## 📋 Descripción
Esta guía explica cómo implementar un botón en Angular que permita descargar todos los documentos de una empresa comprimidos en un archivo ZIP.

---

## 🔗 Endpoint del Backend

```
GET /api/company-documents/{company_uuid}/download
```

### Parámetros:
- `company_uuid`: UUID de la empresa

### Autenticación:
- Requiere token JWT en el header `Authorization: Bearer {token}`

### Respuesta:
- Archivo ZIP con nombre: `documentos-{nombre_establecimiento}.zip`
- Content-Type: `application/zip`

### Documentos incluidos:
- ✅ Documentos con status **PENDIENTE**
- ✅ Documentos con status **APROBADO**
- ❌ Documentos con status **RECHAZADO** (no se incluyen)

### Nombres de archivos en el ZIP:
- Un solo documento por tipo: `Identificacion(es) Oficial(es).pdf`
- Varios del mismo tipo: `Identificacion(es) Oficial(es) - 2024.pdf`

---

## 🎨 Implementación en Angular

### 1. Crear el Servicio (si no existe)

**Archivo**: `src/app/services/company-document.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyDocumentService {
  private apiUrl = environment.apiUrl; // Tu URL base del backend

  constructor(private http: HttpClient) {}

  /**
   * Descargar todos los documentos de una empresa en formato ZIP
   * @param companyUuid UUID de la empresa
   * @returns Observable<Blob>
   */
  downloadAllDocuments(companyUuid: string): Observable<Blob> {
    const token = localStorage.getItem('token'); // O desde tu servicio de auth
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(
      `${this.apiUrl}/company-documents/${companyUuid}/download`,
      {
        headers: headers,
        responseType: 'blob' // Importante: especificar que esperamos un blob
      }
    );
  }
}
```

---

### 2. Implementar en el Componente

**Archivo**: `src/app/components/company-documents/company-documents.component.ts`

```typescript
import { Component } from '@angular/core';
import { CompanyDocumentService } from '../../services/company-document.service';

@Component({
  selector: 'app-company-documents',
  templateUrl: './company-documents.component.html',
  styleUrls: ['./company-documents.component.css']
})
export class CompanyDocumentsComponent {
  companyUuid: string = ''; // Obtener del routing o del contexto
  isDownloading: boolean = false;

  constructor(private documentService: CompanyDocumentService) {}

  /**
   * Descargar todos los documentos de la empresa
   */
  downloadAllDocuments(): void {
    this.isDownloading = true;

    this.documentService.downloadAllDocuments(this.companyUuid).subscribe({
      next: (blob: Blob) => {
        // Crear URL temporal del blob
        const url = window.URL.createObjectURL(blob);
        
        // Crear elemento <a> temporal
        const a = document.createElement('a');
        a.href = url;
        a.download = `documentos-empresa.zip`; // Nombre por defecto
        
        // Simular click para descargar
        document.body.appendChild(a);
        a.click();
        
        // Limpiar
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.isDownloading = false;
        
        // Opcional: Mostrar mensaje de éxito
        console.log('Descarga completada');
      },
      error: (error) => {
        this.isDownloading = false;
        console.error('Error al descargar documentos:', error);
        
        // Opcional: Mostrar mensaje de error al usuario
        if (error.status === 404) {
          alert('Empresa no encontrada');
        } else if (error.status === 400) {
          alert('No hay documentos disponibles para descargar');
        } else {
          alert('Error al descargar los documentos');
        }
      }
    });
  }
}
```

---

### 3. HTML del Botón

**Archivo**: `src/app/components/company-documents/company-documents.component.html`

#### Opción 1: Botón simple
```html
<button 
  (click)="downloadAllDocuments()"
  [disabled]="isDownloading"
  class="btn btn-primary">
  
  <span *ngIf="!isDownloading">
    <i class="fas fa-download"></i> Descargar Todos los Documentos
  </span>
  
  <span *ngIf="isDownloading">
    <i class="fas fa-spinner fa-spin"></i> Descargando...
  </span>
</button>
```

#### Opción 2: Botón con Angular Material
```html
<button 
  mat-raised-button 
  color="primary"
  (click)="downloadAllDocuments()"
  [disabled]="isDownloading">
  
  <mat-icon *ngIf="!isDownloading">cloud_download</mat-icon>
  <mat-icon *ngIf="isDownloading">
    <mat-spinner diameter="20"></mat-spinner>
  </mat-icon>
  
  {{ isDownloading ? 'Descargando...' : 'Descargar Documentos ZIP' }}
</button>
```

#### Opción 3: Botón con icono
```html
<button 
  type="button"
  class="btn btn-success"
  (click)="downloadAllDocuments()"
  [disabled]="isDownloading"
  title="Descargar todos los documentos">
  
  <i class="bi bi-file-earmark-zip" *ngIf="!isDownloading"></i>
  <i class="bi bi-hourglass-split" *ngIf="isDownloading"></i>
  Descargar ZIP
</button>
```

---

### 4. Estilos CSS (Opcional)

**Archivo**: `src/app/components/company-documents/company-documents.component.css`

```css
.btn-download {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-download:hover:not(:disabled) {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-download:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-download i {
  margin-right: 8px;
}
```

---

## 🔥 Versión Mejorada con Notificaciones

Si usas un servicio de notificaciones (ej: SweetAlert2, Toastr, etc.):

```typescript
import Swal from 'sweetalert2';

downloadAllDocuments(): void {
  this.isDownloading = true;

  this.documentService.downloadAllDocuments(this.companyUuid).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `documentos-empresa.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      this.isDownloading = false;
      
      Swal.fire({
        icon: 'success',
        title: '¡Descarga exitosa!',
        text: 'Los documentos se han descargado correctamente',
        timer: 2000,
        showConfirmButton: false
      });
    },
    error: (error) => {
      this.isDownloading = false;
      
      let errorMessage = 'Error al descargar los documentos';
      
      if (error.status === 404) {
        errorMessage = 'Empresa no encontrada';
      } else if (error.status === 400) {
        errorMessage = 'No hay documentos disponibles para descargar';
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    }
  });
}
```

---

## 📝 Ejemplo Completo Integrado

```typescript
// company-documents.component.ts
export class CompanyDocumentsComponent implements OnInit {
  companyUuid: string;
  isDownloading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private documentService: CompanyDocumentService
  ) {}

  ngOnInit(): void {
    // Obtener UUID de la empresa desde la ruta
    this.companyUuid = this.route.snapshot.paramMap.get('uuid') || '';
  }

  downloadAllDocuments(): void {
    if (!this.companyUuid) {
      alert('No se ha seleccionado ninguna empresa');
      return;
    }

    this.isDownloading = true;

    this.documentService.downloadAllDocuments(this.companyUuid).subscribe({
      next: (blob: Blob) => {
        this.triggerDownload(blob);
        this.isDownloading = false;
      },
      error: (error) => {
        this.handleDownloadError(error);
        this.isDownloading = false;
      }
    });
  }

  private triggerDownload(blob: Blob): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `documentos-empresa.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private handleDownloadError(error: any): void {
    let message = 'Error al descargar los documentos';
    
    if (error.status === 404) {
      message = 'Empresa no encontrada';
    } else if (error.status === 400) {
      message = 'No hay documentos disponibles para descargar';
    }
    
    alert(message);
  }
}
```

---

## ✅ Checklist de Implementación

- [ ] Crear o actualizar `CompanyDocumentService`
- [ ] Agregar método `downloadAllDocuments()` en el servicio
- [ ] Importar servicio en el componente
- [ ] Crear método en el componente para manejar la descarga
- [ ] Agregar botón en el template HTML
- [ ] Probar la funcionalidad
- [ ] Manejar errores apropiadamente
- [ ] Agregar feedback visual al usuario (spinner, notificaciones)

---

## 🐛 Solución de Problemas

### Error: CORS
Si tienes problemas de CORS, asegúrate de que el backend tenga configurado:
```php
// En config/cors.php
'supports_credentials' => true,
```

### Error: Token no válido
Verifica que el token se esté enviando correctamente:
```typescript
console.log('Token:', localStorage.getItem('token'));
```

### Descarga no se inicia
Verifica que `responseType: 'blob'` esté configurado en la petición HTTP.

---

## 💡 Tips Adicionales

1. **Nombre dinámico del archivo**: Puedes extraer el nombre del header `Content-Disposition` si el backend lo envía.

2. **Progress Bar**: Para archivos grandes, puedes agregar un progress bar usando `reportProgress: true`.

3. **Validación**: Verifica que haya documentos antes de mostrar el botón.

---

¿Dudas? ¡Pregúntame! 🚀
