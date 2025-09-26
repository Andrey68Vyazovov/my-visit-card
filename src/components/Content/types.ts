export interface TechStackItem {
  logo: string;
  title: string;
  description: string;
  gist?: string;
  content?: string;
}

export interface WorkImage {
  src: string;
  description: string;
}

export interface WorkCardData {
  title: string;
  description: string;
  stack: string[];
  images: WorkImage[];
}

export interface ContactItem {
  type: 'phone' | 'email' | 'telegram' | 'github';
  action: string;
}