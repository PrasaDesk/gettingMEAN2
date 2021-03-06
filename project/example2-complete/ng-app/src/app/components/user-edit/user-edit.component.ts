import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  public _id: any;
  public firstName: string;
  public lastName: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    //fetch id from url
    this.route.params.subscribe(params => {
      this._id = params['userId'];

      //fetch user detail from rest api
      this.userService.findOne(this._id).subscribe(data => {
        this.firstName = data[0].firstName;
        this.lastName = data[0].lastName;
      });
    });

  }

  update() {
    let data = {
      firstName: this.firstName,
      lastName: this.lastName
    };
    this.userService.update(this._id, data).subscribe(data => {
      //navigate to detail view
      this.router.navigate(['/users/' + this._id]);
    });
  }

  cancel() {
    //navigate to list view
    this.router.navigate(['/users']);
  }
}
