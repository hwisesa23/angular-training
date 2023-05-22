import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators'
import { Subject } from 'rxjs';

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
  errorHandling = new Subject<any>()

  constructor(private http: HttpClient) { }

  createPost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{name: number}>(this.url,postData,{
      observe: 'response', //default is body
      responseType: 'json'
    }).subscribe(
      (data) => {
        this.errorHandling.next(null)
        console.log(data)
      },
      (error) => {
        this.errorHandling.next(error)
      }
    )
  }

  fetchPosts(){
    let customParam = new HttpParams()
    customParam = customParam.append('test-param','test-value')
    return this.http.get<{[key: string]: Post}>(this.url,{
      headers: new HttpHeaders({
        'custom-header': 'this is custom header'
      }),
      params: customParam
    })
      .pipe(
        map( responseData => {
          this.errorHandling.next(null)
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
    return this.http.delete(this.url,{
      observe: 'events'
    }).pipe(
      tap(
        event => {
          console.log(event)
          if(event.type === HttpEventType.Sent){
            
          }

          if(event.type === HttpEventType.Response){
            console.log(event.body)
          }
        }
      )
    )
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
        this.errorHandling.next(null)
        console.log(data)
      },
      (error) => {
        this.errorHandling.next(error)
      }
    )
  }
}
