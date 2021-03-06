import React, { forwardRef, useState, useImperativeHandle } from "react";
import { t } from "locales";
import { get, post } from "library/request";
import useStorage from "reducer";
import Tick from "component/tick";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
export default forwardRef(
  ({ link, actions = [], editable = {}, options = {}, ...props }, ref) => {
    const tableRef = React.createRef();
    const [filter, setFilter] = useState(false);
    const [initialFormData ,setInitialFormData]= useState({})
    const { setting: { token }} = useStorage();

    useImperativeHandle(ref, (...rest) => ({
      refresh() {
        tableRef.current && tableRef.current.onQueryChange();
      }
    }));
    
    const dupicate = (row)=>{
      const materialTable = tableRef.current;
      setInitialFormData(row)
      materialTable.dataManager.changeRowEditing();
      materialTable.setState({
        ...materialTable.dataManager.getRenderState(),
        showAddRow: true,
      });
    }

    return (
      <div className="card px-3">
        <MaterialTable
          tableRef={tableRef}
          icons={tableIcons}
          options={{
            pageSize: options?.pageSize ?? 10,
            pageSizeOptions: [10, 20, 50, 100],
            addRowPosition: "first",
            mdebounceInterval: 800,
            filtering: filter,
            search: false,
            rowStyle: (row, i) =>
              i % 2 == 0 ? { background: "rgba(0 ,0 ,0, .01)" } : {},
          }}
          initialFormData={initialFormData}
          {...props}
          data={(query) => {
            const data = {
              orderBy:
                query?.orderBy?.field != undefined ? query?.orderBy?.field : "",
              orderDirection: query?.orderDirection,
              search: query?.search,
              page: query?.page,
              pageSize: query?.pageSize,
            };
            return new Promise((resolve, reject) => {
              const where = props?.where ? {where:JSON.stringify(props.where)} :{};
              post("list", { token, ...data, table: link , ...where}).then((res) => {
                if (res?.message == 'Success') {
                  resolve({
                    data: res?.data?.list,
                    totalCount: res?.data?.total,
                    page: +res?.data?.page,
                  });
                } else {
                  reject();
                }
              });
            });
          }}
          /*
          localization={{
            body: {
              emptyDataSourceMessage: "اطلاعاتی یافت نشد",
              addTooltip: "افزودن",
              deleteTooltip: "حذف",
              editTooltip: "ویرایش",
              filterRow: {
                filterTooltip: "فیلتر",
              },
              editRow: {
                deleteText: "آیا برای حذف کردن مطمعن هستین",
                cancelTooltip: "انصراف",
                saveTooltip: "ذخیره",
              },
            },
            grouping: {
              placeholder: "Spalten ziehen ...",
              groupedBy: "Gruppiert nach:",
            },
            header: {
              actions: "ابزار ها",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} از {count}",
              labelRowsSelect: "ردیف",
              labelRowsPerPage: "Zeilen pro Seite:",
              firstAriaLabel: "اولین صفحه",
              firstTooltip: "اولین صفحه",
              previousAriaLabel: "صفحه قبلی",
              previousTooltip: "صفحه قبلی",
              nextAriaLabel: "صفحه بعدی",
              nextTooltip: "صفحه بعدی",
              lastAriaLabel: "اخرین صفحه",
              lastTooltip: "اخرین صفحه",
            },
            toolbar: {
              addRemoveColumns: "Spalten hinzufügen oder löschen",
              nRowsSelected: "{0} Zeile(n) ausgewählt",
              showColumnsTitle: "نمایش ستون ها",
              showColumnsAriaLabel: "نمایش ستون ها",
              exportTitle: "خروجی",
              exportAriaLabel: "خروجی",
              exportName: "خروجی csv",
              searchTooltip: "جست و جو",
              searchPlaceholder: "جست و جو",
            },
          }}          */
          actions={[
            {
              icon: () => <AutorenewIcon />,
              tooltip: "refresh list",
              isFreeAction: true,
              onClick: () =>
                tableRef.current && tableRef.current.onQueryChange(),
            },
            {
              icon: () => <FilterList />,
              tooltip: "search",
              isFreeAction: true,
              onClick: () => setFilter(!filter),
            },
            ...(props?.duplicate
              ?
              [{
                icon: ()=> <FileCopyIcon />,
                tooltip: 'duplicate',
                onClick: (event, rowData) => {dupicate(rowData); }
              }]
              : []
            ),
            ...actions,
          ]}

          cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                if (newValue == oldValue) {
                  resolve();
                  return;
                }
                const field = columnDef.field;
                const data = { [field]: newValue, id: rowData.id };
                post("update", {
                  token,
                  data: JSON.stringify(data),
                  table: link,
                }).then((res) => {
                  if (res?.message == 'Success') {
                    rowData[field] = newValue;
                    resolve();
                  } else {
                    reject();
                  }
                });
              });
            },
          }}
          editable={{
            onRowAdd:
              editable?.canAdd === false
                ? null
                : (data) =>
                  new Promise((resolve, reject) => {
                    const send = editable?.addInitial ? { ...editable.addInitial, ...data } : data;
                      post("add", {
                        token,
                        data: JSON.stringify(send),
                        table: link,
                      }).then((res) => {
                        if (res?.message == 'Success') {
                          resolve();
                        } else {
                          reject();
                        }
                      });
                    }),
            onRowUpdate:
              editable?.canEdit === false
                ? null
                : (data, oldData) =>
                    new Promise((resolve, reject) => {
                      console.log('editing')
                      post("update", {
                        token,
                        data: JSON.stringify(data),
                        table: link,
                      }).then((res) => {
                        if (res?.message == 'Success') {
                          resolve();
                        } else {
                          reject();
                        }
                      });
                    }),
            onRowDelete:
              editable?.canDelete === false
                ? null
                : (data) =>
                    new Promise((resolve, reject) => {
                      post("delete", {
                        token,
                        id: data.id,
                        table: link,
                      }).then((res) => {
                        if (res?.message == 'Success') {
                          resolve();
                        } else {
                          reject();
                        }
                      });
                    }),
          }}
        />
      </div>
    );
  }
);

export { Tick };
