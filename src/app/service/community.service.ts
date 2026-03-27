import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  text: string;
  author: string;
  authorName: string;
  createdAt?: string;
}

export interface Post {
  _id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  authorName: string;
  tags?: string[];
  likes?: string[];
  comments?: Comment[];
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  toggleLike(id: string, userId: string): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/${id}/like`, { userId });
  }

  addComment(id: string, comment: Comment): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/${id}/comment`, comment);
  }
}
