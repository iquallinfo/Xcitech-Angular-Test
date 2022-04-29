import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
const url = 'https://jsonplaceholder.typicode.com/';
// const url = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }
  
  addPost(data : any)
  {
    return this.http.post<any>(url+"posts", data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  getAllPost()
  {
    return this.http.get<any>(url+"posts")
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  updatePost(data: any, id: any)
  {
    return this.http.put<any>(url+"posts/"+id, data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  deletePost(id: any)
  {
    return this.http.delete<any>(url+"posts/"+id)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  getSinglePost(id: any)
  {
    return this.http.get<any>(url+"posts/"+id)
    .pipe(map((res: any)=>{
      return res;
    })) 
  }
}
