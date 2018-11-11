import { Component, OnInit, OnDestroy } from '@angular/core';
import { EvaluationsService, EvaluationsQuery } from 'src/app/store/evaluations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StitchService } from 'src/app/services/mongodb-stitch/mongodb-stitch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private evalS: EvaluationsService,
    private evalQ: EvaluationsQuery,
    private router: Router,
    private stitch: StitchService
  ) { }

  public loading$ = this.evalQ.selectLoading();
  public assessmentList$ = this.evalQ.selectAll(); // this.assessmentsQ.list();
  public numAssessments = this.assessmentList$.pipe(map(a => a.length));
  public unSubNumAssessments: Subscription;

  ngOnInit() {

    this.unSubNumAssessments = this.numAssessments.subscribe(list => {
      console.log('list', list);
      if (!list) {
        this.evalS.getAssessments();
        console.log('loading assessments');
      } else { console.log('already load the assessments'); }
    });
  }

  activate(id: string) {
    this.evalS.setActive(id);
    this.router.navigate(['selection']);
  }

  ngOnDestroy() {
    this.unSubNumAssessments.unsubscribe();
  }

  logout() {
    this.stitch.logout();
  }

}
