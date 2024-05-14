import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() ratingsCount:number;
  @Input() ratingsValue:number;
  @Input() direction:string;
  @Input() showText:boolean = true;
  @Input() canClick: boolean = false;
  avg:number;
  stars:Array<string>;
  constructor() { }

  ngDoCheck() {
    if(this.ratingsCount && this.ratingsValue && !this.avg) {
      this.calculateAvgValue();      
    }
  }

  rate(value){
    if(this.canClick == true){
      value = (value + 1);
      this.ratingsCount++;
      this.ratingsValue = this.ratingsValue + value;
      this.calculateAvgValue();
    }else{
      return;
    }
  }

  calculateAvgValue(){
    this.avg = this.ratingsValue / this.ratingsCount;
    switch (true) {
      case this.avg > 0 && this.avg < 1 : {
          this.stars = ['star_half', 'star_border', 'star_border', 'star_border', 'star_border'];
          break;
      }      
      case this.avg == 1 : {
          this.stars = ['star', 'star_border', 'star_border', 'star_border', 'star_border'];
          break;
      }      
      case this.avg > 1 && this.avg < 2 : {
          this.stars = ['star', 'star_half', 'star_border', 'star_border', 'star_border'];
          break;
      }      
      case this.avg == 2 : {
        this.stars = ['star', 'star', 'star_border', 'star_border', 'star_border'];
          break;
      } 
      case this.avg > 2 && this.avg < 3 : {
          this.stars = ['star', 'star', 'star_half', 'star_border', 'star_border'];
          break;
      }
      case this.avg == 3 : {
          this.stars = ['star', 'star', 'star', 'star_border', 'star_border'];
          break;
      }
      case this.avg > 3 && this.avg < 4 : {
          this.stars = ['star', 'star', 'star', 'star_half', 'star_border'];
          break;
      }
      case this.avg == 4 : {
          this.stars = ['star', 'star', 'star', 'star', 'star_border'];
          break;
      } 
      case this.avg > 4 && this.avg < 5 : {
          this.stars = ['star', 'star', 'star', 'star', 'star_half'];
          break;
      } 
      case this.avg >= 5 : {
          this.stars = ['star', 'star', 'star', 'star', 'star'];
          break;
      }   
      default: {
          this.stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
          break;
      }
    }
  }

}
