export interface Video {
  id: number;
  videoUrl: string;
  title: string;
  tags: string[];
}

export interface CreateVideoRequest {
  videoUrl: string;
  title: string;
  tags: string[];
}

export interface VideoSearchParams {
  search?: string;
  tags?: string;
}