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
