import { Component, OnInit } from '@angular/core';
import { Post, PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  loadedPosts = [];
  showLoading = false
  title = ""
  content = ""
  selectedPost: Post = null
  isUpdate: boolean = false

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts()
  }

  onFetchPosts() {
    // Send Http request
    this.showLoading = true
    setTimeout(() => {
      this.postService.fetchPosts().subscribe(
        posts => {
          this.showLoading = false
          this.loadedPosts = [...posts]
        }
      )
    },500)
  }

  onClearPosts() {
    // Send Http request
    this.showLoading = true
    setTimeout(() => {
      this.postService.clearPosts().subscribe(
        (data) =>{
          this.showLoading = false
          this.loadedPosts = []
        }
      )
    },500)
  }

  onCreatePost(postData: Post){
    if(this.isUpdate){
      this.postService.updatePost(this.selectedPost.id,postData)
    }else{
      this.postService.createPost(postData)
    }
    this.onFetchPosts() 
  }

  selectPost(postId: string){
    this.selectedPost = this.loadedPosts.find(item => item.id == postId)
    this.title = this.selectedPost.title
    this.content = this.selectedPost.content
    this.isUpdate = true
  }

  clearInput(e){
    e.preventDefault()
    this.title = ""
    this.content = ""
    this.isUpdate = false
    this.selectedPost = null
  }
}
