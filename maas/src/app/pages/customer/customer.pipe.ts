import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customerStatesCode'
})
export class CustomerStatesCodePipe implements PipeTransform {
    transform(value: number): string {
        let satatusCode = '';
        switch (value) {
            case 1:
                satatusCode = '已接單';
                break;
            case 2:
                satatusCode = '未接單'
                break
            case 3: // 接送者按下到達
                satatusCode = '接送者完成訂單'
                break;
            case 88:
                satatusCode = '例外狀況';
                break;
            case 99:
                satatusCode = '已結單'
                break;

        }
        return satatusCode;
    }
}

@Pipe({ name: 'TimePipe' })
export class TimePipe implements PipeTransform {
    constructor(private datePipe: DatePipe) { }
    
    transform(value: string, ...args: unknown[]): string {
        let formattedDate = "";
        if(value !== null){
            let currentDate = new Date(value);
            formattedDate = this.datePipe.transform(currentDate, 'yyyy/MM/dd HH:mm');
        }
        return formattedDate;
    }
}