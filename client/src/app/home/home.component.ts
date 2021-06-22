import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private projectsSubcription: Subscription;
  public data: any;
  public loading: Boolean = true;
  constructor(private service: HomeService, private router: Router, private apollo: Apollo) { }

  ngOnInit() {
    this.projectsSubcription = this.apollo.mutate({
      mutation: this.service.GET_PROJECTS_QUERY,
      variables: {
        offset: 0,
        limit: 100
      }
    }).subscribe(({ data }) => {
      this.data = data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }
  navigateToProject($event){
    this.router.navigate(['Project', $event.id]);
  }
  createProject(){
    this.router.navigate(['createProject']);
  }
  ngOnDestroy(){
    this.projectsSubcription && this.projectsSubcription.unsubscribe();
  }
}
