import React from "react";
import { filterType } from "./page";
import "react-datepicker/dist/react-datepicker.css";
import FilterFieldEl from "@/app/components/shared/FilterFieldEl";
type Props = {
  filter: filterType;
  onChangeHandler: any;
  resetHandler: any;
  searchHandler: any;
  showAgenteHandler: any;
  showClienteHandler: any;

};

const FilterComponent = (props: Props) => {
  const onchangeHandler = props.onChangeHandler;
  const filter = props.filter;
  const resetHandler = props.resetHandler;
  const searchHandler = props.searchHandler;
  const showAgenteHandler = props.showAgenteHandler;
  const showClienteHandler = props.showClienteHandler;


  const OmmagioOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];
  const StatusOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];
  const FiltraOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];

  const filterFields = [
    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Numero ordini', field: 'numeroordini', value: filter.tordernumber,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Dalla data ordini', field: 'dalladata', value: filter.torderdate,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Alla data', field: 'alladata', value: filter.torderTodate,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'agente', value: filter.tagentname,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: showAgenteHandler, options: null
    },
    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice Cliente', field: 'codice', value: filter.tclientcode,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: showClienteHandler, options: null
    },
    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'ommagio', field: 'ommagio', value: filter.omaggiFilter,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: OmmagioOptions
    },
    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: '	Dalla data richiesta', field: 'dallarichiesta', value: filter.dallarichiesta,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Alla data richiesta', field: 'allarichiesta', value: filter.allarichiesta,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Status ordine', field: 'statusordini', value: filter.sfilter,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: StatusOptions
    },
    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Filtra per promizioni', field: 'filtraperpromizioni', value: filter.spromotion,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: FiltraOptions
    },

    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Rif. Ord. cl.', field: 'tclientreff', value: filter.tclientreff,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice articolo', field: 'codicearticolo', value: filter.titemnumber,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Numero ddt', field: 'tshipmentddt', value: filter.tshipmentddt,
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
