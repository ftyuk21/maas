import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: string): string {
        // 创建一个新的 Date 对象，解析传入的日期时间字符串
        const date = new Date(value);
        // 使用内置的 DatePipe 来格式化日期时间，并返回格式化后的字符串
        return new DatePipe('en-US').transform(date, 'yyyy-MM-dd HH:mm:ss');
    }
}