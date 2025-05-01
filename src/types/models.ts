export interface User { id: number; name: string; email: string; disability: string; created_at: string; }
export interface Company {
    created_at: string | number | Date;
    description: string;
    id: any;
    name: string;
}
export interface Job {
    requirements: string;
    disability_filter: string;
    created_at: string | number | Date;
    description: ReactNode;
    title: ReactNode;
    id: ReactNode;
    company_id: ReactNode;
}
export interface Course {
    created_at: string | number | Date;
    creator_name: string;
    creator_id: any;
    type: string;
    resource_url: string | undefined;
    description: ReactNode;
    title: ReactNode;
    id: Key | null | undefined;
}
export interface Application {
  id(id: any): void;
  applied_at: string | number | Date;
  status: ReactNode;
  job_id: any;
}