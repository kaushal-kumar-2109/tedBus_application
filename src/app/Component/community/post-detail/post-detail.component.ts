import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService, Post } from '../../../service/community.service';

@Component({
  selector: 'app-post-detail',
  standalone: false,
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  newCommentText: string = '';
  currentUser: any = null;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('Loggedinuser') || sessionStorage.getItem('user');
    if (sessionData) {
      this.currentUser = JSON.parse(sessionData);
    }

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.communityService.getPostById(id).subscribe({
          next: (data) => this.post = data,
          error: (err) => {
            console.error('Failed to load post', err);
            this.router.navigate(['/community']);
          }
        });
      }
    });
  }

  submitComment() {
    if (!this.newCommentText.trim() || !this.currentUser || !this.post?._id) return;
    
    this.isSubmitting = true;
    const u = this.currentUser;
    const authorName = u.name
      || ((u.firstName || '') + ' ' + (u.lastName || '')).trim()
      || u.email
      || 'Anonymous';

    this.communityService.addComment(this.post._id, {
      text: this.newCommentText,
      author: this.currentUser._id,
      authorName: authorName
    }).subscribe({
      next: (updatedPost) => {
        this.post!.comments = updatedPost.comments;
        this.newCommentText = '';
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Failed to add comment', err);
        alert('Could not post comment.');
        this.isSubmitting = false;
      }
    });
  }
}
