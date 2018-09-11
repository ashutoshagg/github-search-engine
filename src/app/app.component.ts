import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName} from '@angular/forms';
import { UserService } from './user.service';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  title = 'My First Angular App!';

  userSearchForm: FormGroup;
  users : IUser[] = [];
  userRepoDetails: any[] = [];
  totalResults: number;
  showDetailsButton : boolean = true;

  constructor(private formBuilder : FormBuilder,
    private userService : UserService){
  }

  ngOnInit(){
    this.userSearchForm = this.formBuilder.group({   
    'searchUser' : ['']
    })
  }

  searchUser(){
    this.userService.getUsers(this.userSearchForm.get('searchUser').value)
    .subscribe(data => {
      console.log(data);
      this.totalResults = data['total_count'];
      this.users = data['items'];
      
    })
  }

  userDetails(userLoginName){
    this.showDetailsButton = false;
    this.userService.userRepoDetails(userLoginName)
    .subscribe(data => {
      console.log(data);
      this.userRepoDetails = data;
      
    })
  }

  Collapse(){
    this.showDetailsButton = true;
    this.userRepoDetails = [];

  }
}


