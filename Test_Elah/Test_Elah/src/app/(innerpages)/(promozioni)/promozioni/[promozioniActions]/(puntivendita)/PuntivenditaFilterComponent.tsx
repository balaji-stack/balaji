
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';
import { filterType } from './PuntivenditaComponent';

type Props = {
  filter: filterType;
  onchangeHandler: any;
  resetHandler: any;
  searchHandler: any;
  setshowAgenteSearch : any;
}




const PuntivenditaFilterComponent = (props: Props) => {
  const filter = props.filter;
  const onchangeHandler = props.onchangeHandler;
  const resetHandler = props.resetHandler;
  const searchHandler = props.searchHandler;
  const setshowAgenteSearch = props.setshowAgenteSearch;


//Options used in filter fields
const SupergruppiOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: 'api' }];
const GruppoOptions = [{ label: 'Tutti', value: '' }];
const SottogruppoOptions = [{ label: 'Tutti', value: '' }];

const filterFields = [
  {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice cliente', field: 'tcodicerep', value: filter.tcodicerep,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
  },
  {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Rag.sociale', field: 'tsocialerep', value: filter.tsocialerep,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
  },
  {
    fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Cod.ricerca', field: 'tSearchName', value: filter.tSearchName,
    placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
},
{
  fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: ' Citta', field: 'tcity', value: filter.tcity,
  placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
},


{
  fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'PV', field: 'tpv', value: filter.tpv,
  placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
},

{
  fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'tagentname', value: filter.tagentname,
  placeholder: null, onchangeHandler: onchangeHandler, clickHandler:  ()=>setshowAgenteSearch(true), options: null
},

{
  fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Supergruppi', field: 'ssupergruppo', value: filter.ssupergruppo,
  placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SupergruppiOptions
},

{
  fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Gruppo', field: 'sgruppo', value: filter.sgruppo,
  placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: GruppoOptions
},


{
  fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Sotto Gruppo', field: 'ssottogruppo', value: filter.ssottogruppo,
  placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SottogruppoOptions
}


]

  return (
    <section>
    <div className="row">

        {
            filterFields?.map((it: any,i: number) => {
                return (
                    <FilterFieldEl key={i} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
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




  )
}

export default PuntivenditaFilterComponent