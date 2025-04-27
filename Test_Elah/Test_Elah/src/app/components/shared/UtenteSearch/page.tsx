
"use client"
import React, { useState } from 'react'
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import FilterComponent from './FilterComponent';
import { useRouter } from 'next/navigation';
import UtenteTable from './UtenteTable';
import closeImg from '@/img/close.png';
import Image from "next/image";


type Props = {

    chooseUtenteHandler: any;
    showUtenteHandler: any;
    CloseUtenteHandler: any;

}

export interface filterType {
    CreatedUserName: string,
    susertype: string,
 
}
export const initialValue : filterType  = {
    CreatedUserName: '',
    susertype: '',

  };

const utenteSearch = (props: Props) => {
    const router = useRouter();
    let initialFilter: any = {
        CreatedUserName: "",
        susertype: "",
      
    }

    const chooseUtenteHandler = props.chooseUtenteHandler;
    const showUtenteHandler = props.showUtenteHandler;
    const CloseUtenteHandler =props.CloseUtenteHandler;

    const [filters, setFilters] = useState<filterType>(initialFilter);
    const [UtenteList, setUtenteList] = useState<any>([]);
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);

    const onChangeHandler = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
      };


      const searchHandler = () => {
        setIsLoading(true);
        // isLastPage = false;
        setIsLastPage(false);
     
      }

  return (
    <>
   
     <main>                   
    <Card>            
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                        <Title heading="LISTA UTENTI"></Title>
                    </div>
                    <div className="title_block-arrow">
                      <button type="button" onClick={CloseUtenteHandler}><Image src={closeImg} alt="Image" /></button>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3">
                        <div className="title_block-arrow">
                        </div>
                    </div>
                </div>
           
                <div className="content_form content_form-filter">
                    <div className="content_form content_form-filter">
                    <FilterComponent filter={filters} onChangeHandler={onChangeHandler} searchHandler={searchHandler}
              showUtenteHandler={showUtenteHandler} />
                    </div>
                </div>
            
        </Card>

        <Card>
                <div className="table_data">
                    <div className="title_sec">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Title heading="Lista utenti"></Title>
                            </div>
                       
                        </div>
                    </div>
                    {
   <UtenteTable filter={filters} chooseCampagnaHandler={chooseUtenteHandler} campagnaList={UtenteList} isLastPage={isLastPage} isSectionLoading={isSectionLoading} />


                    }
                </div>
              
            </Card>

     </main>
 </>
  )
}

export default utenteSearch