import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

export interface BlogPost {
  id?: string | number; // Optional for new posts before saving
  title: string;
  excerpt: string;
  content?: string; // Full HTML or Text content
  date: string;
  author: string;
  category: string;
  image?: string;
}

export interface NavLink {
  label: string;
  path: string;
  subLinks?: NavLink[];
}