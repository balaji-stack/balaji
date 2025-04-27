import React, { useEffect, useState } from 'react'
import { filterType } from './page';
import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosError } from 'axios';
import SERVER_URL, { selectFieldType } from '@/helpers/common';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';
import { popupMsg } from '@/helpers/messages';
import { useRouter } from 'next/navigation';
type Props = {
    filter: filterType;
    onChangeHandler: any;
    resetHandler: any;
    searchHandler: any;
    showAgenteHandler: any;
    
}
const FilterComponent = (props: Props) => {
    const filter = props.filter;
    const onchangeHandler = props.onChangeHandler;
    const resetHandler = props.resetHandler;
    const searchHandler = props.searchHandler;
    const showAgenteHandler = props.showAgenteHandler;
   
    const router = useRouter();
    //Options used in filter fields
    const [supergruppoOptions,setSupergruppoOptions] = useState<selectFieldType[]>([]);
    const [gruppoOptions,setGruppoOptions] = useState<selectFieldType[]>([]);
    const [sottogruppoOptions,setSottogruppoOptions] = useState<selectFieldType[]>([]);


    useEffect(() => {//getting supergruppo options from server
        const url = `${SERVER_URL}/Common/getWebOrderSuperGruppoListDropDown`;
         axios.post(url, null, {
            withCredentials: true,
        },).then((res) => {
            let options = res.data?.map((opt: any) => {
                return { label: `(${opt.Code}) ${opt.Description}`, value: opt.Code }
            })          
            setSupergruppoOptions(options);        
        }).catch((e: AxiosError) => {
            let status = e.status;
            if (status === 401) {
                popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
                router.push('/login');
            } else {
                popupMsg("qualcosa è andato storto", "error");
            }
        })
    }, []);

    useEffect(() => {//getting gruppo options from server when supergruppo changed
        const url = `${SERVER_URL}/Common/getWebOrderGruppoListDropDown?paramType=''&superGrpCode=${filter.superGruppo.value}`;
         axios.post(url, null, {
            withCredentials: true,
        },).then((res) => {
            let options = res.data?.map((opt: any) => {
                return { label: `(${opt.Code}) ${opt.Description}`, value: opt.Code }
            })          
            setGruppoOptions(options);        
        }).catch((e: AxiosError) => {
                let status = e.status;
                if (status === 401) {
                    popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
                    router.push('/login');
                } else {
                    popupMsg("qualcosa è andato storto", "error");
                }
            })
    }, [filter.superGruppo]); 

    useEffect(() => {//getting sottogruppo options from server when gruppo changed
        const url = `${SERVER_URL}/Common/getWebOrderSottoGruppoListDropDown?paramType='SOTTOGROUP'&groupCode=${filter.gruppo.value}`;
         axios.post(url, null, {
            withCredentials: true,
        },).then((res) => {
            let options = res.data?.map((opt: any) => {
                return { label: `(${opt.Code}) ${opt.Description}`, value: opt.Code }
            })          
            setSottogruppoOptions(options);        
        }).catch((e: AxiosError) => {
                let status = e.status;
                if (status === 401) {
                    popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
                    router.push('/login');
                } else {
                    popupMsg("qualcosa è andato storto", "error");
                }
            })
    }, [filter.gruppo]); 

    const filterFields = [
        {
            id: 1, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice cliente', field: 'codiceCliente', value: filter.codiceCliente,
            placeholder: 'Enter codice cliente', onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            id: 2, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Rag. sociale', field: 'ragSociale', value: filter.ragSociale,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            id: 3, fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'agente', value: filter.agente,
            placeholder: 'Enter Agente', onchangeHandler: onchangeHandler, clickHandler: showAgenteHandler, options: null
        },
        {
            id: 4, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Citta', field: 'citta', value: filter.citta,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            id: 5, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'PV', field: 'pv', value: filter.pv,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            id: 6, fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Super Gruppo', field: 'superGruppo', value: filter.superGruppo,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: supergruppoOptions
        },
        {
            id: 7, fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Gruppo', field: 'gruppo', value: filter.gruppo,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: gruppoOptions
        },
        {
            id: 8, fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Sotto Gruppo', field: 'sottoGruppo', value: filter.sottoGruppo,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: sottogruppoOptions
        }]
    return (
        <section>
            <div className="row">
                {filterFields?.map((it: any) => {
                    return (
                        <FilterFieldEl key={it.id} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
                            field={it.field} value={it.value} placeholder={it.placeholder} onchangeHandler={it.onchangeHandler}
                            clickHandler={it.clickHandler} options={it.options} />
                    )
                })}
            </div>
            <div className="btn_grp">
                <div className="btn_grp_inner">
                    <button type="button" className="site_btn primary_btn" onClick={resetHandler}>
                        Resettare
                    </button>
                    <button type="button" className="site_btn brdr_btn" onClick={searchHandler}>
                        Cerca
                    </button>
                </div>
            </div>
        </section>
    )
}


export default FilterComponent