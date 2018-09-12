import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], field: string, orderType: boolean): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return orderType ? 1 : -1;
      } else if (a[field] > b[field]) {
        return orderType ? -1 : 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
