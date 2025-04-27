"use client"
import dlticn from '@/img/trash.png';
import editicn from '@/img/pencil.png';
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import SERVER_URL from "@/helpers/common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionLoader from "@/app/components/shared/SectionLoader";
import warning from "@/img/alert-icons/warning.png";
import Swal from "sweetalert2";
import { userInitialValue as User } from "./page";
import { useDispatch } from "react-redux";
import ArrowDown from "../../../../img/arrow-down.png";
import { popupMsg } from "@/helpers/messages";
import ViewText from '@/app/components/shared/ViewText';
import { updateUrlObject } from '@/redux/slices/action-slice';
type Props = {
    userList: any;
    loadmoreHandler: any;
    isLastPage: boolean;
    setIsLastPage: any;
    setUserList: any;
    isSectionLoading: boolean;
    setIsLoading: any;
    sortingHandler: any;
    sorting: boolean;
    listMsg: string;
}

const UserListTable = (props: Props) => {
    let userList = props.userList;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let setIsLastPage = props.setIsLastPage;
    let setUserList = props.setUserList;
    let isSectionLoading = props.isSectionLoading;
    let setIsLoading = props.setIsLoading;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;
    let listMsg = props.listMsg;
    const router = useRouter();
    const reduxDispatch = useDispatch();
    function navigateToEditFn(id: any): void {
        reduxDispatch(updateUrlObject({ userId: id }))
        router.push('/edit-user');
    }

    function deleteUser(id: number | string): void {
        Swal.fire({
            title: "Sei sicuro??",
            html: `<p>Stai per eliminare questo utente.
             Vuoi davvero eliminare?</p>`,
            iconHtml: `<img src="${warning.src}"/>`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#0069ba",
            cancelButtonColor: "#efeded",
            confirmButtonText: "SI",
            customClass: {
                confirmButton: "site_btn primary_btn",
                cancelButton: "site_btn grey_btn",
            },
        }).then((opt) => {
            if (opt.isConfirmed) {
                setIsLoading(true);
                const URL = `${SERVER_URL}/user/deleteUser`;
                axios.delete(URL, {
                    withCredentials: true,
                    params: {
                        'userId': id,
                    },
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },

                })
                    .then(async (res: any) => {
                        let result = res.data
                        setIsLoading(false);
                        if (result == "success") {

                            setIsLoading(true);
                            const url = `${SERVER_URL}/user/userlist?page=${0}&size=${userList.length}`;
                            // Using the AXIOS library to make a POST request
                            await axios
                                .post(url, User, {
                                    withCredentials: true,
                                })
                                .then((response) => {
                                    let apiData = response.data;
                                    if (Object.keys(apiData).length === 0) {
                                        popupMsg("Nessun dato disponibile dal server.", "info");
                                        return;
                                    }
                                    setUserList(apiData.users);
                                    let lastPage = apiData.users.length == apiData.total ||
                                        apiData.users.length >= apiData.total;
                                    setIsLastPage(lastPage);
                                    setIsLoading(false);
                                    toast.success("Successfully Deleted !", {
                                        position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000, closeOnClick: false,
                                    });
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
                                    setIsLoading(false);
                                    //setIsSectionLoading(false);
                                });

                        } else {
                            toast.error("Error Occured !", {
                                position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000, closeOnClick: false,
                            });
                        }
                    });

            }
        });

    };


    let renderList = () => {
        if (userList.length > 0) {
            return (
                <tbody>
                    {userList?.map((obj: any, i: number) => {
                        let keyId = i;
                        return (
                            <tr key={keyId}>
                                <td>
                                    <div className="tbl_btn_grp">
                                        <ul>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="icon_btn_tbl"
                                                    title="Edit User"
                                                    onClick={() => navigateToEditFn(obj.userId)}
                                                >
                                                    <Image src={editicn} alt="Edit" />
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="icon_btn_tbl"
                                                    title="Delete User"
                                                    onClick={() => deleteUser(obj.userId)}
                                                >
                                                    <Image src={dlticn} alt="Delete" />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                                <td>{obj.userAgentCode}</td>
                                <td>{obj.area}</td>
                                <td>{obj.userName}</td>
                                <td>{obj.userSurname}</td>
                                <td>{obj.userLogin}</td>
                                <td>{obj.userType}</td>
                                <td>{obj.userEmail}</td>
                                <td>{obj.userActive}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <td colSpan={9} style={{ textAlign: 'center' }}>
                            <ViewText txtColor="red" textSize="15"
                                text={listMsg} />
                        </td>
                    </tr>
                </tbody>
            )
        }
    }
    
    interface RowType { id: number; th: string; index: string; orderable: boolean; }
    let rowDetails: RowType[] = [{ id: 1, th: '-', index: '', orderable: false },
    { id: 2, th: 'Agent Code', index: 'USERS.[user_agent_code]', orderable: true }, { id: 3, th: 'Capo Area', index: 'USERS.[user_agent_code]', orderable: false },
    { id: 4, th: 'Nome', index: 'USERS.[user_name]', orderable: true }, { id: 5, th: 'Cognome', index: 'USERS.[user_surname]', orderable: true },
    { id: 6, th: 'Login', index: 'USERS.[user_login]', orderable: true }, { id: 7, th: 'Tipo', index: 'USERS.[user_type]', orderable: true },
    { id: 8, th: 'E-mail', index: 'USERS.[user_email]', orderable: true }, { id: 9, th: 'Attive', index: 'USERS.[Active]', orderable: true },
    ];
    return (
        <div className="table_section">
            <div className="inner-content">
                <div className="inner-table-content">
                    <div className="table-responsive">
                        <table className="table-main table table-striped table-borderless">
                        <thead className="sticky-thead">
                                <tr>
                                    {rowDetails?.map((row: RowType, index: number) => {
                                        let keyId = index;
                                        return (
                                            <th key={keyId}
                                                onClick={(e) => row.orderable && sortingHandler(e, row.index)}>
                                                <div className="thead_div">
                                                    <label>{row.th}</label>
                                                    {row.orderable &&//to get arrow only after first column
                                                        <span className="sort_sp">
                                                            <i className="ascending"><Image src={ArrowDown} alt="ascending" /></i>
                                                            <i className="descending"><Image src={ArrowDown} alt="descending" /></i>
                                                        </span>
                                                    }
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            {sorting ?
                                <tbody>
                                    <tr>
                                        <td colSpan={9} style={{ textAlign: 'center' }}> <SectionLoader Size='5' />
                                        </td>
                                    </tr>
                                </tbody> : renderList()}
                        </table>
                    </div>
                </div>
            </div>
            {isSectionLoading ? <SectionLoader Size='20px' />
                :
                !isLastPage && userList?.length > 0 &&
                <button id='LoadMoreBtn' className='site_btn primary_btn'
                    style={{ margin: '45px auto 0' }}
                    onClick={loadmoreHandler}>Carica di più</button>
            }
        </div>
    )
}

export default UserListTable