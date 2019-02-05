import * as React from 'react';
import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import { Column } from 'aurora';
import { mergeStyleSets } from '@uifabric/merge-styles';

const CheckboxTable = checkboxHOC(ReactTable);

interface ITableComponentState {
  columns: Column[];
  data: any[];
  selected: any[];
}

interface ITableComponentProps {
  columns: Column[];
  data: any[];
  id: string;
  onSelection: Function;
  selected: any[];
  theme: any;
}

export class TableComponent extends React.Component<
  ITableComponentProps,
  ITableComponentState
  > {
  private selectedByKey: { [key: string]: any } = {};

  constructor(props: ITableComponentProps) {
    super(props);
    this.state = {
      columns: props.columns,
      data: props.data,
      selected: props.selected,
    }
  }

  isSelected = (key: any) => {
    return this.selectedByKey[key];
  };

  render() {



    const classNames = getClassNames(this.state, this.props.theme);

    const data: any[] = this.state.data;

    let columns: any[] = [];



    if (this.state.columns) {
      columns = this.state.columns.map((column: Column) => {
        return {
          accessor: column.getAccessorHandler(),
          Cell: (props: any) => {
            return (
              <span
                className={classNames.cell}>
                {props.value}
              </span>
            );
          },
          Header: (props: any) => {
            return (
              <span
                className={classNames.header}
              >
                {column.getLabel()}
              </span>
            );
          },
          id: column.getId(),
        };
      });
    }


    console.log('Render table component', columns, data);



    return (
      <div
        className={classNames.container}
        id={`${this.props.id}:Table`}>

        <CheckboxTable
          columns={columns}
          data={data}
          getTrProps={(props: any) => {
            return { ...props, style: { padding: '3px' } };
          }}
          getTdProps={(props: any) => {
            return { ...props, style: { padding: '3px' } };
          }}
          isSelected={this.isSelected}
          keyField='id'
          selectType='checkbox'
          showPagination={false}
          toggleSelection={this.toggleSelection}
        />

      </div>
    );
  }

  setColumns = (columns: Column[]): void => {
    this.setState({ columns });
  }

  setData = (data: any[]): void => {
    this.setState({ data });
  }

  setSelected = (selected: any[]): void => {
    this.selectedByKey = {};
    if (selected) {
      selected.forEach(s => this.selectedByKey[s["id"]] = s);
    }
    this.setState({ selected });
  }

  toggleSelection = (key: any, shift: any, row: any) => {
    if (this.props.onSelection) {
      this.props.onSelection(key);
    }
  };
}


export interface ITableComponentClassNames {
  cell: string,
  container: string;
  header: string;
}

export const getClassNames = (state: ITableComponentState, theme: any): ITableComponentClassNames => {
  return mergeStyleSets({
    cell: [
      theme.fonts.smallPlus,
      {
        color: theme.palette.neutralPrimaryAlt,
      }
    ],
    container: [
      theme.fonts.normal,
      {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexBasis: 0,
        flexDirection: 'column',
        flexGrow: 1,
      }
    ],
    header: [
      theme.fonts.smallPlus,
      {
        color: theme.palette.neutralPrimaryAlt,
      }
    ],

  }
  );
};
