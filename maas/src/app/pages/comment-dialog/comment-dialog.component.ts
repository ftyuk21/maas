import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../show-google-map/show-google-map.component';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  comment: string='';

  direction: string;
  showText: boolean = true;
  avg: number = 0;
  stars: Array<string> = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];

  rate(index: number) {
    this.avg = index + 1;
    this.updateStars();
  }

  updateStars() {
    for (let i = 0; i < 5; i++) {
      if (i < this.avg) {
        this.stars[i] = 'star';
      } else {
        this.stars[i] = 'star_border';
      }
    }
  }

  handleCommentChange(event: any) {
    // event.target.value 包含了 textarea 中的内容
    this.comment = event.target.value; // 将评论内容保存到 comment 属性中
  }

  sendComment(): void {
    let comment = {
      comment: this.comment, star: this.avg, identity: 2
    }
    
    this.dialogRef.close(comment);
  }

}
