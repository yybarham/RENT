import { Pipe, PipeTransform } from '@angular/core';

//////////////////////////////////////////////////////////
// PIPES TO DISPLAY THE VALUE OF KEY IN ANY ROW OF GRID 
// ROLS                                                 
// CAR TYPE                                         
// BRANCH
// GEAR TYPE
// GENDER TYPE
//////////////////////////////////////////////////////////
@Pipe({
  name: 'Role'
})
export class Role implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1: return 'Admin';
      case 2: return 'Employee';
      case 3: return 'User';
      default:
        return '';
    }
  }
}
@Pipe({
  name: 'CarType'
})
export class CarType implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1: return 'SKODA';
      case 2: return 'HUNDA';
      case 3: return 'YUNDI';
      case 4: return 'KIA';
      case 5: return 'TOYOTA';
      default:
        return '';
    }
  }
}
@Pipe({
  name: 'BrType'
})
export class BrType implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1: return 'Tel Aviv';
      case 2: return 'Jerusalem';
      case 3: return 'Haifa';
      case 4: return 'Holon';
      default:
        return '';
    }
  }
}
@Pipe({
  name: 'GType'
})
export class GType implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1: return 'AUTO';
      case 2: return 'MANU';
      default:
        return '';
    }
  }
}
@Pipe({
  name: 'GenType'
})
export class GenType implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1: return 'Male';
      case 2: return 'Female';
      default:
        return '';
    }
  }
}
//////////////////////////////////////////////////////////
// PIPES TO FILTER DATA FROM ROW OF GRID 
// FILTER BY ONE COLOMN OF GRID
// FILTER BY COMBOBOX
// FILTER ALL COLUMNS 
//////////////////////////////////////////////////////////
@Pipe({
  name: 'filterCol'
})
export class FilterCol implements PipeTransform {

  transform(array: Array<any>, val: string, keyName): any {
    if (!array) {
      return false;
    }
    if (val == null || val === '') {
      return array;
    } else {
      val = val.toLowerCase();
      return array.filter(item => {
        if (item[keyName].toString().toLowerCase().indexOf(val) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
}
@Pipe({
  name: 'ComboTxt'
})
export class ComboTxt implements PipeTransform {
  transform(array: Array<any>, val: any, keyName): any {
    if (!array) {
      return false;
    }

    if (val === -1 || val.toString() === '-1') {
      return array;
    } else {
      return array.filter(item => {
        if (item[keyName].toString() === val.toString()) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
}
@Pipe({
  name: 'filterAll'
})
export class FilterAll implements PipeTransform {

  transform(value, txt: string) {
      if (txt == '') {
          return value;//.slice(0, 100);
      }
      else if (txt == '*') {
          return value;
      }
      else {
          txt = txt.toString().toLowerCase();
          return value.filter(item => {
              for (let key in item) {
                  if ((typeof item[key] === 'string' || item[key] instanceof String) && (item[key].toLowerCase().indexOf(txt) !== -1)) {
                      return true;
                  }
                  if ((typeof item[key] === 'number' || item[key] instanceof Number) && (item[key].toString().toLowerCase().indexOf(txt) !== -1)) {
                      return true;
                  }
              }
          });
      }
  }
}
