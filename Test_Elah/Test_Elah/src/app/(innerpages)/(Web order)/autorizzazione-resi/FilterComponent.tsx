import React from "react";
import { filterType } from "./page";
import  { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { it } from "date-fns/locale";
import FilterFieldEl from "@/app/components/shared/FilterFieldEl";
type Props = {
  filter: filterType;
  onChangeHandler: any;
  resetHandler: any;
  searchHandler: any;

};
registerLocale("it", it);
const FilterComponent = (props: Props) => {
  const onchangeHandler = props.onChangeHandler;
  const filter = props.filter;
  const resetHandler = props.resetHandler;
  const searchHandler = props.searchHandler;


  const AutorizzazioneOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];
 
  const filterFields = [

    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice cliente', field: 'tclientcode', value: filter.tclientcode,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Data reso', field: 'torderdate', value: filter.torderdate,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'tagentname', value: filter.tagentname,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Autorizzazione', field: 'sfilter', value: filter.sfilter,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: AutorizzazioneOptions
    },

    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Valorizzazione', field: 'tclientreff', value: filter.tclientreff,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

  ]



  return (
    <section>
         <div className="row">
        {
          filterFields?.map((it: any, i: number) => {
            let keyIndex = i;
            return (
              <FilterFieldEl key={keyIndex} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
                field={it.field} value={it.value} placeholder={it.placeholder} onchangeHandler={it.onchangeHandler}
                clickHandler={it.clickHandler} options={it.options} />
            )
          })
        }

      </div>

      <div className="btn_grp">
        <div className="btn_grp_inner">
          <button
            type="button"
            className="site_btn primary_btn"
            onClick={resetHandler}
          >
            Resettare
          </button>
          <button
            type="button"
            className="site_btn brdr_btn"
            onClick={searchHandler}
          >
            Cerca
          </button>
        </div>
      </div>
     
    </section>
  );
};

export default FilterComponent;
