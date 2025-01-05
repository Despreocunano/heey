import type { Entry, EntryFields } from 'contentful';

// Base Asset type from Contentful
export interface Asset {
  fields: {
    file: {
      url: string;
    };
    title: string;
  };
}

// Contentful System fields
export interface ContentfulSys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  revision: number;
  space: {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  };
  environment: {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  };
  contentType: {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  };
}

// Base Entry type that matches Contentful's Entry structure
export interface BaseEntry<T> {
  sys: ContentfulSys;
  fields: T;
  metadata: {
    tags: any[];
  };
}