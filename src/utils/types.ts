export interface StrapiPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    coverImage?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

export interface StrapiJob {
  id: number;
  attributes: {
    title: string;
    location: string;
    description: string;
  };
}

export interface NewsLetter {
  id: number;
  attributes: {
    title: string;
    news: string;
  };
}

// types.ts
export interface FileAttributes {
  url: string;
  name: string;
  mime: string;
  size: number;
}

export interface FileData {
  data: {
    id: number;
    attributes: FileAttributes;
  } | null;
}

export interface QuarterlyReportAttributes {
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  file: FileData;
  title: string;
  typeOfContent: "PDF" | "Audio";
  year: number;
}

export type QuarterlyReport = {
  id: number;
  attributes: QuarterlyReportAttributes;
};
