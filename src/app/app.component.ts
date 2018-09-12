import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { UserService } from './services/user.service';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My First Angular App!';

  userSearchForm: FormGroup;
  usersList: IUser[] = [];
  totalResults: number;
  sortBy: string;
  orderBy: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit() {
    this.sortBy = 'login';
    this.orderBy = false;
    this.userSearchForm = this.formBuilder.group({
      'searchUser': [''],
      'sortBy': ['NameASC']
    })
  }

  searchUser() {
    this.userService.getUsers(this.userSearchForm.get('searchUser').value, this.userSearchForm.get('sortBy').value)
      .subscribe(data => {
        this.totalResults = data['total_count'];
        this.usersList = data['items'];
      })
  }

  onChange() {
    switch (this.userSearchForm.get('sortBy').value) {
      case 'NameASC':
        this.sortBy = 'login';
        this.orderBy = false;
        break;

      case 'NameDESC':
        this.sortBy = 'login';
        this.orderBy = true;
        break;
      case 'scoreASC':
        this.sortBy = 'score';
        this.orderBy = false;
        break;
      case 'scoreDESC':
        this.sortBy = 'score';
        this.orderBy = true;
        break;
      default:
        


    }
  }
}


