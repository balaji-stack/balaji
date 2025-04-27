import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import React, { useEffect, useState } from 'react';
import closeImg from '@/img/close.png';
import Image from "next/image";
import NrprTable from './NrprTable';
import SERVER_URL, { getOrderBy } from '@/helpers/common';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from 'next/router';
import { filterType } from '../page';
import { popupMsg } from '@/helpers/messages';
import SectionLoader from '@/app/components/shared/SectionLoader';

type Props = {
  filter: filterType;
  closeNrPrLinkHandler: any;
}

let pg: number = 0;
const size: number = 3;
let orderBy: number = 0;
let fieldNames = ['Codice', 'campaign', 'Description', 'Data', 'DataIn', 'gruppo', 'sotto', 'pvCounts', 'ItemsCount', 'authorization', 'status'];
const NrprLink = (props: Props) => {
  const filter = props.filter;
  const closeNrPrLinkHandler = props.closeNrPrLinkHandler;

  const [tableLista, setTableLista] = useState<any>({});
  const [nrprListLoading, setNrprListLoading] = useState<boolean>(false);
  const [loadmoreLoading, setLoadmoreLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const getNrprList = async () => {
    const URL = `${SERVER_URL}/popup/getNrPromoGeneratePopup?page=${pg}&size=${size}`;

    
    axios.post(URL, filter, {
      withCredentials: true
    }).then((response) => {
      let apiData = response.data;
        pg > 0
          ? setTableLista((prev: any) => [...prev, ...apiData.getNrPromoGeneratePopupList]) :
          setTableLista(apiData.getNrPromoGeneratePopupList);

        let lastPage = tableLista.length + apiData.getNrPromoGeneratePopupList.length == apiData.count ||
          apiData.getNrPromoGeneratePopupList.length < size;
        setIsLastPage(lastPage);
    })
      .catch((error) => {
        popupMsg(error.message, "error");
      }).finally(() => {
        setNrprListLoading(false);
        setLoadmoreLoading(false);
      })
  }

  useEffect(() => {
    pg = 0;
    setNrprListLoading(true);
    getNrprList();
  }, [])

  const loadmoreHandler = () => {
    pg++;
    setLoadmoreLoading(true);
    getNrprList();
  }

  const orderByHandler = (e: any, colName: string, tableFields: string[]) => {
    orderBy = getOrderBy(colName, tableFields, fieldNames, tableLista, setTableLista, orderBy);//getting orderBy function

    const EL = e.target;//getting current element 
    const thEl = EL.closest('th');
    const activeEl = thEl.closest('tr').querySelector('.sort_active');
    activeEl != null && activeEl.classList.remove("sort_active");
    if (orderBy % 2 != 0) {
      const ascEL = thEl.querySelector(".ascending");
      ascEL.classList.add("sort_active");
    } else {
      const descEL = thEl.querySelector(".descending");
      descEL.classList.add("sort_active");
    }
    e.stopPropagation();
  }

  return (
    <main>
{nrprListLoading ? <SectionLoader Size='20'/>
                :
      <Card>
        <div className="table_data">
          <div className="title_sec">
            <div className="row">
              <div className="title_block-arrow">
                <button type="button" onClick={closeNrPrLinkHandler}><Image src={closeImg} alt="Image" /></button>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Title heading="PROMOZIONI LISTA"></Title>
              </div>

            </div>
          </div>
          <NrprTable nrprListLoading={nrprListLoading} tableLista={tableLista} orderByHandler={orderByHandler}
            loadmoreLoading={loadmoreLoading} isLastPage={isLastPage} loadmoreHandler={loadmoreHandler} />
        </div>
      </Card>
}
    </main>
  )
}

export default NrprLink;