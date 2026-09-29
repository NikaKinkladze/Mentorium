export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  instructorId: number;
  rating: number;
  reviews: number;
  students: number;
  price: number;
  originalPrice: number;
  imageId: string;
  level: string;
  duration: string;
  description: string;
  tags: string[];
  lessons: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  courseCount: number;
  imageId: string;
}

export interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  reviews: number;
  imageId: string;
}
