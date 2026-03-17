export interface CompanyDocument {
  uuid: string | null;
  year: number;
  file: string | null;
  status: string | null;
  rejection_reason: string | null;
  type_document_name: string;
  type_document_uuid: string;
  reviewed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CompanyDocumentsResponse {
  ok: boolean;
  documents: CompanyDocument[];
}

export enum DocumentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

