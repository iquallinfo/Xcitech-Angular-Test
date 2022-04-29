import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service'
import { postModel } from './post.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  formvalue !: FormGroup;
  postModelObj : postModel = new postModel();
  posts !: any;
  addpoststatus !: boolean;
  updatepoststatus !: boolean;
  submitted = false;  
  postdata !: any;
  // successmessage = false;
  // erro

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    })
    this.postdata = [];
    this.getAllPost();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formvalue.controls;
  }


  addPost()
  {
    this.formvalue.reset();
    this.addpoststatus = true;
    this.updatepoststatus = false;
  }

  storePost()
  {
    this.postModelObj.title = this.formvalue.value.title;
    this.postModelObj.body = this.formvalue.value.body;
    this.submitted = true;
    if (this.formvalue.invalid) {
      return;
    }
    else{
      this.api.addPost(this.postModelObj)
        .subscribe(res => {
          this.submitted = false;
          alert('Post Add Successfuly');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formvalue.reset();
          this.getAllPost();
        },
        err=>{
          alert('Somthing Want wrong');
        });
    }
  }

  getAllPost()
  {
    this.api.getAllPost()
    .subscribe(res => {
      this.posts = res;
    },
    err=>{
      alert('Somthing Want wrong');
    });
  }

  editPost(post: any)
  {
    this.postModelObj.id = post.id;
    this.formvalue.controls['title'].setValue(post.title);
    this.formvalue.controls['title'].setValue(post.title);
    this.formvalue.controls['body'].setValue(post.body);
    this.addpoststatus = false;
    this.updatepoststatus = true;
  }

  updatePost()
  {
    this.postModelObj.title = this.formvalue.value.title;
    this.postModelObj.body = this.formvalue.value.body;
    this.submitted = true;
    if (this.formvalue.invalid) {
      return;
    }
    {
      this.api.updatePost(this.postModelObj, this.postModelObj.id)
        .subscribe(res => {
          this.submitted = false;
          alert('Post Update Successfuly');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formvalue.reset();
          this.getAllPost();
        },
        err=>{
          alert('Somthing Want wrong');
        });
    }
  }

  deletePost(id: any)
  {
    if(confirm('Are you sure you want to delete?'))
    {  
      this.api.deletePost(id)
        .subscribe(res => {
          alert('Post Delete Successfuly');                        
          this.getAllPost();
        },
        err=>{
          alert('Somthing Want wrong');
        });
    }
    else{
      return;
    }
  }

  viewPost(id: any)
  {
    this.api.getSinglePost(id)
    .subscribe(res => {    
      this.postdata = res;  
    },
    err=>{
      alert('Somthing Want wrong');
    });
  }
}
