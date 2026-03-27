import { Component, OnInit } from '@angular/core';
import { CommunityService, Post } from '../../../service/community.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-feed',
  standalone: false,
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.css']
})
export class CommunityFeedComponent implements OnInit {
  posts: Post[] = [];
  currentUser: any = null;
  showCreateModal = false;

  constructor(private communityService: CommunityService, private router: Router) { }

  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('Loggedinuser') || sessionStorage.getItem('user');
    if (sessionData) {
      this.currentUser = JSON.parse(sessionData);
    }
    this.loadPosts();
  }

  loadPosts() {
    this.communityService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => console.error('Failed to load posts', err)
    });
  }

  openCreateModal() {
    if (!this.currentUser) {
      alert('Please log in to share a story.');
      this.router.navigate(['/login']);
      return;
    }
    this.showCreateModal = true;
  }

  onPostCreated(newPost: Post) {
    this.posts.unshift(newPost);
  }

  hasLiked(post: Post): boolean {
    if (!this.currentUser || !post.likes) return false;
    return post.likes.includes(this.currentUser._id);
  }

  toggleLike(post: Post) {
    if (!this.currentUser) {
      alert('Please log in to like this post.');
      return;
    }
    this.communityService.toggleLike(post._id!, this.currentUser._id).subscribe({
      next: (updatedPost) => {
        const index = this.posts.findIndex(p => p._id === post._id);
        if (index !== -1) {
          this.posts[index].likes = updatedPost.likes;
        }
      },
      error: (err) => console.error('Error toggling like', err)
    });
  }
}
