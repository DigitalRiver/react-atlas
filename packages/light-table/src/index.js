import LightTable from './LightTable';
import TableColumn from './TableColumn';

if (typeof window !== 'undefined') {
  window.LightTable = LightTable;
  window.TableColumn = TableColumn;
}
export {
  LightTable,
  TableColumn
};
