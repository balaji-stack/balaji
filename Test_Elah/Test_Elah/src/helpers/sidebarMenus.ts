import DocumentIcon from "../img/sidebar/document.png";
import UserManageIcon from "../img/sidebar/users_manage.png";
import ReportsIcon from "../img/sidebar/reports.png";
import AssortimentIcon from "../img/sidebar/assortiment.png";
import FlowChartIcon from "../img/sidebar/flow_chart.png";
import WebOrderclickIcon from "../img/sidebar/weborder_click.png";
import WeborderIcon from "../img/sidebar/weborder.png";
import GestonePdvIcon from "../img/sidebar/gestone_pdv.png";
import Data from "../img/sidebar/data.png";
import Right from "../img/sidebar/right_ic.png";

function getMenus(menuObj: any) {

  const SidebarMenus = [

    {
      id:1,
      title: `Users Management`, icon: UserManageIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_user_management"),
      childrens: [
        {
          id:1,
          title: `Users`, icon: Data, path: `/users`,
          permission: true
        },
        {
          id:2,
          title: `User stats`, icon: Data, path: `/user-stats`,
          permission: true
        },
      ],
    },
    {
      id:2,
      title: `Documenti Nav`, icon: DocumentIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_nav_documents"),
      childrens: [
        {
          id:1,
          title: `Ordini`, icon: Data, path: `/ordini`,
          permission: true
        },
        {
          id:2,
          title: `Documenti di spedizione`, icon: Data, path: `/documenti-di-spedizione`,
          permission: true
        },
        {
          id:3,
          title: `Fatture`, icon: Data, path: `#`,
          permission: true
        },
        {
          id:4,
          title: `Note di credito`, icon: Data, path: `#`,
          permission: true
        },
      ],
    },
    {
      id:3,
      title: `Assortimenti`, icon: AssortimentIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_portal_assortimenti"),
      childrens: [
        {
          id:1,
          title: `Gestione assortimenti`, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_assortimenti?.includes('GESTIONE')
        },
        {
          id:2,
          title: `Import ref. assortimento`, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_assortimenti?.includes('GESTIONE')
        },
        {
          id:3,
          title: `Visualizzazione assortimenti `, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_assortimenti?.includes('VIEW')
        },
      ],
    },
    {
      id:4,
      title: `Promozioni`, icon: FlowChartIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_portal_promozioni"),
      childrens: [
        {
          id:1,
          title: `Gestione promozioni `, icon: Data, path: `/promozioni/list/gestione`,
          permission: menuObj?.permission_portal_promozioni?.includes('GESTIONE')
        },
        {
          id:2,
          title: `Gestione promozioni solo area appartenenza`, icon: Data, path: `/promozioni/list/promosoloarea`,
          permission: menuObj?.permission_portal_promozioni?.includes('GESTIONESOLOAREA')
        },
        {
          id:3,
          title: `Autorizzazione promozioni `, icon: Data, path: `/promozioni/list/authorize`,
          permission: menuObj?.permission_portal_promozioni?.includes('AUTORIZZA')
        },
        {
          id:4,
          title: `Visualizzazione promozioni`, icon: Data, path: `/promozioni/list/visualizzazione`,
          permission: menuObj?.permission_portal_promozioni?.includes('VIEW')
        },

        {
          id:5,
          title: `Visualizzazione promozioni archiviate`, icon: Data, path: `/promozioni/list/visualizzazionearchive`,
          permission: menuObj?.permission_portal_promozioni?.includes('ARCHIVEVIEW')
        },

        {
          id:6,
          title: `Cancellazione promozioni`, icon: Data, path: `/cancellazione-promozioni`,
          permission: menuObj?.permission_portal_promozioni?.includes('CANCELL')
        },
        {
          id:7,
          title: `Cambia periodi promozione`, icon: Data, path: `/Cambia-periodi-promozione`,
          permission: menuObj?.permission_portal_promozioni?.includes('CHANGEPERIOD')
        },
        {
          id:8,
          title: `Reporting`, icon: Data, path: `/Reporting`,
          permission: menuObj?.permission_portal_promozioni?.includes('REPORTING')
        },
      ],
    },
    {
      id:5,
      title: `Reports`, icon: ReportsIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_report"),
      childrens: [
        {
          id:1,
          title: `Promo Punti vendita`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('PROMO_VENDITA')
        },
        {
          id:2,
          title: `Cliente/macrofamiglia/artic.`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50382') || menuObj?.permission_report?.includes('50382_SOTTO'),
          childrens: [
            {
              id:1,
              title: `Cliente`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50382'),
            },
            {
              id:2,
              title: `Sotto-gruppo`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50382_SOTTO'),
            },
          ],
        },
        {
          id:3,
          title: `Lista indirizzi cliente`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50188'),
        },
        {
          id:4,
          title: `Analisi zona/cliente`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50381'),
        },
        {
          id:5,
          title: `Vendite per quadrimestre`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50383'),
        },
        {
          id:6,
          title: `Vendite Zona/Art AC/AP`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50385_AREA') || menuObj?.permission_report?.includes('50385_ZONA'),
          childrens: [
            {
              id:1,
              title: `Area`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50385_AREA'),
            },
            {
              id:2,
              title: `Zona`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50385_ZONA'),
            },
          ],
        },
        {
          id:7,
          title: `Vendite Area/Art AC/AP IR`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50386'),
        },
        {
          id:8,
          title: `Analisi Ord.Cli.x settimana IR`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50384'),
        },
        {
          id:9,
          title: `Vendite Zona/Cli AC/AP IR`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50387_AGENTE') || menuObj?.permission_report?.includes('50387_AREA') || menuObj?.permission_report?.includes('50387_ZONA'),
          childrens: [
            {
              id:1,
              title: `Agente`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50387_AGENTE'),
            },
            {
              id:2,
              title: `Area`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50387_AREA'),
            },
            {
              id:3,
              title: `Zona`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50387_ZONA'),
            },
          ],
        },
        {
          id:10,
          title: `Analisi cliente web IR.`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50388'),
        },
        {
          id:11,
          title: `Avanzamento AREA/ZONA`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50389_AREA') || menuObj?.permission_report?.includes('50389_ZONA'),
          childrens: [
            {
              id:1,
              title: `Area`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50389_AREA'),
            },
            {
              id:2,
              title: `Zona`, icon: Right, path: `#`,
              permission: menuObj?.permission_report?.includes('50389_ZONA'),
            },
          ],
        },
        {
          id:12,
          title: `Analisi spedito giorn. x invio`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50370'),
        },
        {
          id:13,
          title: `Disponib Depositi Corrieri`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('50043'),
        },
        {
          id:14,
          title: `Cont. Collocazione Lotto Depositi`, icon: Data, path: `#`,
          permission: menuObj?.permission_report?.includes('54020'),
        },
      ],
    },
    {
      id:6,
      title: `Gestione PDV`, icon: GestonePdvIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_portal_merchandising"),
      childrens: [
        {
          id:1,
          title: `Competitors setup`, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_merchandising?.includes('COMPETITOR'),
          childrens: [
            {
              id:1,
              title: `Competitors`, icon: Right, path: `#`,
              permission: true,
            },
            {
              id:2,
              title: `Brands`, icon: Right, path: `#`,
              permission: true,
            },
            {
              id:3,
              title: `Linea prodotti`, icon: Right, path: `#`,
              permission: true,
            },
            {
              id:4,
              title: `Prodotti`, icon: Right, path: `#`,
              permission: true,
            },
          ],
        },
        {
          id:2,
          title: `Dati PDV`, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_merchandising?.includes('SURVEY'),
          childrens: [
            {
              id:1,
              title: `Lista attività`, icon: Right, path: `#`,
              permission: true,
            },
            {
              id:2,
              title: `Conta Attività`, icon: Right, path: `#`,
              permission: true,
            },
          ],
        },
        {
          id:3,
          title: `Reports`, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_merchandising?.includes('REPORTS'),
          childrens: [
            {
              id:1,
              title: `Assortimento`, icon: Right, path: `#`,
              permission: true,
            },
            {
              id:2,
              title: `Promozioni`, icon: Right, path: `#`,
              permission: true,
            },
            {
              id:3,
              title: `Prodotti competitors`, icon: Right, path: `#`,
              permission: true,
            },
          ],
        },
      ],
    },
    {
      id:7,
      title: `Web Order`, icon: WeborderIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_portal_ordini"),
      childrens: [
        {
          id:1,
          title: `Order entry`, icon: Data, path: `/order-entry`,
          permission: menuObj?.permission_portal_ordini?.includes('GESTIONE'),
        },
        {
          id:2,
          title: `Lista Ordini`, icon: Data, path: `/lista-ordini`,
          permission: menuObj?.permission_portal_ordini?.includes('VIEW'),
        },
        {
          id:3,
          title: `Budget Omaggi Area`, icon: Data, path: `/budget-omaggi-area`,
          permission: menuObj?.permission_portal_ordini?.includes('BUDGETOMAGGI'),
        },
        {
          id:4,
          title: `Budget Omaggi Clienti`, icon: Data, path: `/budget-omaggi-clienti`,
          permission: menuObj?.permission_portal_ordini?.includes('BUDGETOMAGGICLIENT'),
        },
        {
          id:5,
          title: `Budget Lista`, icon: Data, path: `/budget-lista`,
          permission: menuObj?.permission_portal_ordini?.includes('BUDGETVIEW'),
        },
        {
          id:6,
          title: `Autorizzazione ordine`, icon: Data, path: `/autorizzazione-ordine`,
          permission: menuObj?.permission_portal_ordini?.includes('SALESMANAGER') || menuObj?.permission_portal_ordini?.includes('ADMINMANAGER'),
        },
        {
          id:7,
          title: `GESTIONE MOBILE`, icon: Data, path: `#`, permission: false
          // permission: menuObj?.permission_portal_ordini?.includes('GESTIONEMOBILE'),
        },
        {
          id:8,
          title: `Resi`, icon: Data, path: `/resi`,
          permission: menuObj?.permission_portal_ordini?.includes('RESI'),
        },
        {
          id:9,
          title: `Lista Resi`, icon: Data, path: `/lista-resi`,
          permission: menuObj?.permission_portal_ordini?.includes('LISTARESI'),
        },
        {
          id:10,
          title: `Autorizzazione Resi`, icon: Data, path: `/autorizzazione-resi`,
          permission: menuObj?.permission_portal_ordini?.includes('AUTORIZZAZIONERESI'),
        },
      ],
    },
    {
      id:8,
      title: `Web Order Indipendenti`, icon: WebOrderclickIcon, path: `#`,
      permission: menuObj?.hasOwnProperty("permission_portal_ordini_independenti"),
      childrens: [
        {
          id:1,
          title: `Order entry`, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_ordini_independenti?.includes('GESTIONE')
        },
        {
          id:2,
          title: `Lista Ordini `, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_ordini_independenti?.includes('VIEW')
        },
        {
          id:3,
          title: `Autorizzazione ordine`, icon: Data, path: `#`,
          permission: menuObj?.permission_portal_ordini_independenti?.includes('SALESMANAGER') || menuObj?.permission_portal_ordini_independenti?.includes('ADMINMANAGER')
        },
      ],
    },

  ];
  return SidebarMenus;
}
export default getMenus;


export function getUrlEsternoMenus(menuObj: any) {
  let menus = [{
    title: `Promozioni`, icon: Data, path: `#`,
    permission: menuObj?.UrlEsterno?.includes("permission_promozioni"),
  },
  {
    title: `Assortimenti`, icon: Data, path: `#`,
    permission: menuObj?.UrlEsterno?.includes("permission_assortimenti"),
  },
  {
    title: `Order entry`, icon: Data, path: `#`,
    permission: menuObj?.UrlEsterno?.includes("permission_order_entry"),
  }];
  return menus;
}