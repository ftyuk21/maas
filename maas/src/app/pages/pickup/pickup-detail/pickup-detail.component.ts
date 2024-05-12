import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pickup-detail',
  templateUrl: './pickup-detail.component.html',
  styleUrls: ['./pickup-detail.component.scss']
})
export class PickupDetailComponent implements OnInit {
  id: any;
  constructor(private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
    });
  }

}
