export interface TechStackItem {
  logo: string;
  title: string;
  description: string;
  gist?: string;
  content?: string;
}

export interface WorkCardData {
  title: string;
  description: string;
  stack: string[];
  images: string[];
}

export interface ContactItem {
  type: 'phone' | 'email' | 'telegram' | 'github';
  action: string;
}