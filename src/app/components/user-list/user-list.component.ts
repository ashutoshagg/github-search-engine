import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() usersList : IUser[];
  @Input() sortBy : string;
  @Input() orderBy : boolean
  userRepoDetails: any[] = [];
  showDetailsButton : boolean = true;

  constructor(private userService : UserService) { }

  ngOnInit() {
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
