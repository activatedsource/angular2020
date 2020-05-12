import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listFiler',
    pure: false
})
export class ListFilterPipe implements PipeTransform {

    transform(list: any[], searchStr: string = '', fieldName: string = 'name') {
        if (searchStr === '') {
            return list;
        }
        searchStr = searchStr.toLowerCase().trim();
        return list.filter(
            (item) => {
                return String(item.name).toLowerCase().includes(searchStr);
            }
        );
    }

}
