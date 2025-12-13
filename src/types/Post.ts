export type Post = {
  id?: number;
  title: string;
  body: string;
  images?: string[];
  storyid: number;
  type: string;
  special: boolean;
  secret: boolean;
  iat?: string;
};
