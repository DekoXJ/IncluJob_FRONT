export interface Role {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    password?: string; 
    disability?: string | null;
    created_at: string;
  }
  
  export interface UserRole {
    user_id: number;
    role_id: number;
  }
  
  export interface DisabledUser {
    id: number;
    user_id: number;
    disability_certificate_url: string;
    verified: boolean;
    created_at: string;
  }
  
  export interface Company {
    id: number;
    name: string;
    description?: string | null;
    logo_url?: string | null;
    created_at: string;
  }
  
  export interface Job {
    id: number;
    company_id: number;
    title: string;
    description: string;
    requirements?: string | null;
    disability_filter?: string | null;
    location?: string | null;
    modality?: string | null;
    salary_range?: string | null;
    created_at: string;
  }
  
  export interface Application {
    id: number;
    user_id: number;
    job_id: number;
    status: 'pending' | 'accepted' | 'rejected' | string; 
    applied_at: string;
  }
  
  export interface Course {
    id: number;
    title: string;
    description?: string | null;
    type: string;
    resource_url: string;
    created_at: string;
  }
  