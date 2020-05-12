import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncatetext'
})
export class TruncateTextPipe implements PipeTransform {

    transform(value: string, maxLen: number = 10) {
        if (value && value.length > maxLen) {
            return value.substr(0, maxLen) + ' ...';
        }
        return value;
    }

}
