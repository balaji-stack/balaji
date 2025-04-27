"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import UserListTable from "./UserListTable";
import UserForm from "./UserForm";
import SERVER_URL from "@/helpers/common";
import AgenteSearch from "@/app/components/shared/AgenteSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import { popupMsg } from "@/helpers/messages";
import Alert from 'react-bootstrap/Alert';
import SectionLoader from "@/app/components/shared/SectionLoader";

export type UserDataType = {
    userName: string;
    userSurname: string;
    userLogin: string;
    userAgentCode: string;
    selectUserType: { label: string, value: string };
    area: string;
    userActive: string | number;
    userEmail: string;
    UserId: string | number;
}
let pg: number = 0;
const size: number = 10;
let colName: string = '';
let order: string = 'asc';
export const userInitialValue = {
    userName: "",
    userSurname: "",
    userLogin: "",
    userAgentCode: "",
    selectUserType: { label: '', value: '' },
    area: "",
    userActive: "",
    userEmail: "",
    UserId: "",
}
const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listLoading, setListLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
    const [sorting, setSorting] = useState<boolean>(false);
    const [filterOpen, setFilterOpen] = useState<boolean>(true);
    const [listOpen, setListOpen] = useState<boolean>(true);
    const [listMsg, setListMsg] = useState<string>('Cerca con filtro per ottenere i dati');
    const filterToggle = () => {
        setFilterOpen(!filterOpen);
    };
    const [user, setUser] = useState<UserDataType>(userInitialValue);
    const changeHandler = (key: string, value: string) => {
        setUser({ ...user, [key]: value });
    };

    const [userList, setUserList] = useState<any>([]);


    const getUsers = async () => {
        const url = `${SERVER_URL}/user/userlist?page=${pg}&size=${size}`;
        // Using the AXIOS library to make a POST request
        await axios
            .post(url, { ...user, sortField: colName, sortOrder: order }, {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                if (Object.keys(apiData).length === 0) {
                    popupMsg("Nessun dato disponibile dal server.", "info");
                    return;
                }
                pg > 0
                    ? setUserList((prev: any) => [...prev, ...apiData.users]) : setUserList(apiData.users);
                let lastPage = userList.length + apiData.users.length == apiData.count ||
                    apiData.users.length < size;
                setIsLastPage(lastPage);
                userList.length == 0 && setListMsg('Nessun dato trovato');
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
                setIsLoading(false);
                setIsSectionLoading(false);
                setSorting(false);
            });
    };

    useEffect(() => {
        setListLoading(true);
        getUsers();
    }, []);

    const searchHandler = () => {

        let loginEl: HTMLInputElement = document.getElementById("login") as HTMLInputElement;
        let userNameEl: HTMLInputElement = document.getElementById("userName") as HTMLInputElement;
        let surnameEl: HTMLInputElement = document.getElementById("surname") as HTMLInputElement;
        let agentEl: HTMLInputElement = document.getElementById("agent") as HTMLInputElement;
        let typeEl: HTMLSelectElement = document.getElementById("selectUserType") as HTMLSelectElement;

        if ((loginEl.value !== null && loginEl.value !== '') || (userNameEl.value !== null && userNameEl.value !== '') ||
            (surnameEl.value !== null && surnameEl.value !== '') || (agentEl.value !== null && agentEl.value !== '') ||
            (typeEl.innerText !== null && typeEl.innerText !== '')) {
            setAlertMessage('');
            setIsLoading(true);
            setIsLastPage(false);
            pg = 0;
            setListLoading(true);
            getUsers();
        }
        else {
            setAlertMessage('Inserisci almeno un filtro prima di cercare');
        }
    }

    const [alertMessage, setAlertMessage] = useState('');

    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        pg++;
        getUsers();
    }

    const resetHandler = () => {
        setUser({ ...userInitialValue });
    }
    const [showAgentSearch, setShowAgentSearch] = useState(false);
    const showAgentHandler = () => {
        setShowAgentSearch(true);
        setFilterOpen(false);
        setListOpen(false);
    }
    const chooseAgenteHandler = (value: any) => {
        setUser({ ...user, userAgentCode: value });
        setShowAgentSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }
    const closeAgenteHandler = () => {
        setShowAgentSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }
///////////////////////////////////////////////Sorting Function/////////////////////////////////////////////////////////////////////////////////////
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
    getUsers();//get sorted data from the api
    e.stopPropagation();
    setListOpen(true);
  }
    let userListTableProps = {userList,loadmoreHandler,isLastPage,setIsLastPage,
    setUserList,isSectionLoading,setIsLoading,sortingHandler,sorting,listMsg}
    let agenteSearchProps = { selectedAgent: user.userAgentCode, chooseAgenteHandler, closeAgenteHandler };
    return (
        <>

            <div id="user_list">
                <Card padding="20px">
                    <div className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""}`}>
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                                <Title heading="RICERCA USER" fontSize="18px"></Title>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3">
                                <div className="title_block-arrow">
                                    <button
                                        type="button"
                                        className="filter-arrow"
                                        onClick={filterToggle}
                                    >
                                        <Image src={ArrowDown} alt="Image" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`form_block ${filterOpen ? "filter_show" : ""}`}
                        style={{ 'display': 'none' }}
                    >
                        <div className="content_form content_form-filter">
                            {alertMessage && <Alert variant="warning">{alertMessage}</Alert>}
                            <UserForm User={user} changeHandler={changeHandler}
                                searchHandler={searchHandler} resetHandler={resetHandler}
                                showAgentHandler={showAgentHandler} />
                        </div>
                    </div>
                </Card>
                {listLoading ? <SectionLoader Size='20' /> :
                <Card padding="20px">
                    <div className="table_data">
                        <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>

                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <Title heading="Lista User"></Title>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <div className="title_block-arrow" style={{ paddingBottom: '10px' }}>
                                        <button
                                            type="button"
                                            className="filter-arrow"
                                            onClick={() => setListOpen(!listOpen)}
                                        >
                                            <Image src={ArrowDown} alt="Image" />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div
                            className={`form_block ${listOpen ? "filter_show" : ""}`}
                            style={{ display: 'none' }}
                        >
                            <div className="link_grp">
                                <ul className="subnav_ul_block">
                                    <li>
                                        <button type="button" className="site_btn primary_btn"
                                            style={{ padding: '0px 24px' }}
                                            onClick={() => router.push('/addUser')}>
                                            <FontAwesomeIcon icon={faPlus} />Aggiungi utente
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="content_form content_form-filter">

                                {isLoading ? <SectionLoader Size='50px' />
                                    :
                                    <UserListTable {...userListTableProps} />
                                }
                            </div>
                        </div>
                    </div>
                </Card>
                }
                <ToastContainer />
            </div>
           
            {showAgentSearch &&
                <div id="agent_search">
                    <AgenteSearch {...agenteSearchProps} />
                </div>
            }
        </>
    );
};

export default Page;
