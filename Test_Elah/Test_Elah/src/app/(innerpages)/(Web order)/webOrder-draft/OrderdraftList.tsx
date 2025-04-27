import Card from '@/app/components/shared/Card'
import React, { useEffect, useState } from 'react'
import OrderDraftTable from './OrderDraftTable'
import closeImg from '@/img/close.png';
import Image from "next/image";
import axios, { AxiosError, AxiosResponse } from 'axios';
import SERVER_URL from '@/helpers/common';
import { popupMsg } from '@/helpers/messages';
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useRouter } from 'next/navigation';

type Props = {
  customerCode: string,
  closeOrderdraftHandler: any;
}

let pg: number = 0;
const size: number = 10;
let colName: string = '';
let order: string = 'asc';

const Page = (props: Props) => {
  const router = useRouter();
  const codiceCliente = props.customerCode;
  const closeOrderdraftHandler = props.closeOrderdraftHandler;

  const [orderDraftList, setOrderDraftList] = useState<any[]>([]);
  const [listLastPage, setListLastPage] = useState<boolean>(false);
  const [sorting, setSorting] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(true);



  const getOrderDraftList = async () => {
    const url = `${SERVER_URL}/orderEntry/getWebOrderDraftList?page=${0}&size=${10}`;
    await axios.post(url, { codiceCliente, sortField: colName, sortOrder: order  }, {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      const apiData = res.data;
      pg > 0 ? setOrderDraftList((prev: any) => [...prev, ...apiData.list]) : setOrderDraftList(apiData.list);
      let lastPage = orderDraftList.length + apiData.list.length == apiData.countClientCode || apiData.list.length < size;
      setListLastPage(lastPage);
    })
    .catch((e: AxiosError) => {
      let status = e.status;
      if (status === 401) {
          popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
          router.push('/login');
      } else {
          popupMsg("qualcosa è andato storto", "error");
      }
  })
      .finally(() => {
        setListLoading(false);
        setMoreLoading(false);
        setSorting(false);
      });
  }
  useEffect(() => {
    getOrderDraftList();
  }, []);

  const loadmoreHandler = () => {
    setMoreLoading(true);
    pg++;
    getOrderDraftList();
  }

  const sortingHandler = (e: any, indexName: string) => {
    //classList manipulation
    const EL = e.target;
    const thEl = EL.closest('th');
    const activeEl = thEl.closest('tr').querySelector('.sort_active');
    activeEl?.classList.remove("sort_active");
    const ascEL = thEl.querySelector(".ascending");
    const descEL = thEl.querySelector(".descending");
    if (colName == "" || colName != indexName || (colName == indexName && activeEl?.classList.contains("descending"))) {
      ascEL.classList.add("sort_active");
      order = "asc";
    } else {
      descEL.classList.add("sort_active");
      order = "desc"
    }
    colName = indexName;//assigning column name for sorting
    setSorting(true);
    pg = 0;
    getOrderDraftList();//get sorted data from the api
    e.stopPropagation();

  }

  const orderDraftTableProps = { orderDraftList, loadmoreHandler, listLastPage, moreLoading, sortingHandler, sorting,codiceCliente }
  return (
    <>

    {listLoading ? <SectionLoader Size='20' /> :
    <Card>
      <div className="row">
        <div className="title_block-arrow">
          <button type="button" onClick={closeOrderdraftHandler}><Image src={closeImg} alt="Image" /></button>
        </div>
        <OrderDraftTable {...orderDraftTableProps} />

      </div>

    </Card>
  }

    
    </>

   
  )
}

export default Page