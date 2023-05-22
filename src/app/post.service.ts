import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

export interface Post{
  id: string,
  title: string,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endpointUrl: string = "https://angular-training-86670-default-rtdb.asia-southeast1.firebasedatabase.app/"
  url: string = this.endpointUrl + 'post.json'

  constructor(private http: HttpClient) { }

  createPost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{name: number}>(this.url,postData).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }

  fetchPosts(){
    return this.http.get<{[key: string]: Post}>(this.url)
      .pipe(
        map( responseData => {
          const postArray: Post[] = []
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postArray.push({...responseData[key], id: key})
            }
          }
          return postArray
        })
      )
  }

  clearPosts(){
    return this.http.delete(this.url)
  }

  updatePost(postId: string,postData: Post){
    const data = {
      [postId]: {
        title: postData.title,
        content: postData.content
      }
    }
    return this.http.patch(`${this.url}`,data).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
