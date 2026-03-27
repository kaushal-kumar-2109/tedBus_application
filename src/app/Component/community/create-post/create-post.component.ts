import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommunityService, Post } from '../../../service/community.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() postCreated = new EventEmitter<Post>();

  title: string = '';
  content: string = '';
  imageUrl: string = '';
  tagsStr: string = '';
  
  isSubmitting = false;
  currentUser: any = null;

  constructor(private communityService: CommunityService, private router: Router) {}

  ngOnInit() {
    const sessionData = sessionStorage.getItem('Loggedinuser') || sessionStorage.getItem('user');
    if (sessionData) {
      this.currentUser = JSON.parse(sessionData);
    } else {
      alert("You must be logged in to post.");
      this.close();
      this.router.navigate(['/login']);
    }
  }

  close() {
    this.closeEvent.emit();
  }

  submitPost() {
    if (!this.title || !this.content) return;
    
    this.isSubmitting = true;
    
    const tags = this.tagsStr.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    // Build author name from session data - handles all login types
    const u = this.currentUser;
    const authorName = u.name
      || ((u.firstName || '') + ' ' + (u.lastName || '')).trim()
      || u.email
      || 'Anonymous';

    const newPost: Post = {
      title: this.title,
      content: this.content,
      imageUrl: this.imageUrl,
      author: this.currentUser._id,
      authorName: authorName,
      tags: tags
    };

    this.communityService.createPost(newPost).subscribe({
      next: (post) => {
        this.isSubmitting = false;
        this.postCreated.emit(post);
        this.close();
      },
      error: (err) => {
        console.error('Failed to create post', err);
        alert('Failed to post story. Please try again.');
        this.isSubmitting = false;
      }
    });
  }
}
