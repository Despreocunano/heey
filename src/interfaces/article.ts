export default interface Article {
    id: number;
    attributes: {
      title: string;
      description: string;
      image: string;
      content: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }