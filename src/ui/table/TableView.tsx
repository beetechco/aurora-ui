import * as React from 'react';
import { TableModel, View, ITableView, Column } from 'aurora';
import { ThemeContext } from '../theme/ThemeContext';
import { TableComponent } from './TableComponent';

export class TableView extends View implements ITableView {

  private columns: Column[];
  private data: any[];
  private onSelection: Function;
  private selected: any[];

  constructor(id?: string) {
    super(id);
  }

  renderComponent = () => {
    return (
      <ThemeContext.Consumer>
        {
          (theme: any) => {
            return (
              <TableComponent
                columns={this.columns}
                data={this.data}
                id={this.getId()}
                onSelection={this.onSelection}
                ref={this.getElementReference()}
                selected={this.selected}
                theme={theme}
              />
            );
          }
        }
      </ThemeContext.Consumer>
    );
  }

  repaint = () => {
    this.elementRef.current.setColumns(this.columns);
    this.elementRef.current.setData(this.data);
    this.elementRef.current.setSelected(this.selected);
  }

  setColumns(columns: Column[]): void {
    this.columns = columns;
  }

  setData(data: any[]): void {
    this.data = data;
  }

  setOnSelection(onSelection: Function): void {
    this.onSelection = onSelection;
  }

  setSelected(selected: any[]): void {
    this.selected = selected;
  }


}
