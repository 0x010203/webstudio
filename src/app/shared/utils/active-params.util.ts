import { Params } from '@angular/router';
import { ActiveParamsType } from '../../../assets/types/active-params.type';


export class ActiveParamsUtil {
  static processParams(params: Params): ActiveParamsType {
    const activeParams: ActiveParamsType = { categories: [] };
    if (params.hasOwnProperty('categories')) {
      //если параметр один, то вернется строка а не массив, поэтому проверяем на тип массив иначе создаем масиив сами
      activeParams.categories = Array.isArray(params['categories'])
        ? params['categories']
        : [params['categories']];
    }
    if (params.hasOwnProperty('page')) {
      activeParams.page = +params['page'];
    }
    console.log(`ActiveParamsUtil.processParams:`);
    return activeParams;
  }
}
