
import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

export interface BlogPost {
  id?: string | number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  status?: 'published' | 'draft' | 'scheduled';
  scheduled_at?: string;
}

export interface NavLink {
  label: string;
  path: string;
  subLinks?: NavLink[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  fullStory?: string;
}
