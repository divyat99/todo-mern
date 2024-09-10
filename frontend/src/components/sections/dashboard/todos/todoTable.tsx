import { useMemo, useEffect, useState, ReactElement } from 'react';
import { Stack, Avatar, Tooltip, Typography, CircularProgress,Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import {
  GridApi,
  DataGrid,
  GridSlots,
  GridColDef,
  useGridApiRef,
  GridActionsCellItem,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import { stringAvatar } from 'helpers/string-avatar';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomPagination from 'components/common/CustomPagination';
import CustomNoResultsOverlay from 'components/common/CustomNoResultsOverlay';

const statusOptions = [
  { label: 'Pending', value: false },
  { label: 'Completed', value: true },
];
const TodoTable = ({ searchText, rows, onDelete, onUpdate }: { searchText: string; rows: any[]; onDelete: (id: string) => void; onUpdate: (id: string, updatedTask: string, updatedStatus: boolean) => void }): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);
  const [updatedTask, setUpdatedTask] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState<boolean>(false);
  const [taskError] = useState<string | null>(null);

  const handleEditClick = (item: any) => {
    setCurrentEditItem(item);
    setUpdatedTask(item.task);
    setUpdatedStatus(item.status );
    setEditDialogOpen(true);
  };


  const handleEditSave = () => {
   
    if (currentEditItem) {
   
  
      onUpdate(currentEditItem._id, updatedTask,updatedStatus);
    }
    setEditDialogOpen(false);
  };
  
  const columns: GridColDef<any>[] = useMemo(() => [
    {
      field: 'task',
      headerName: 'Task',
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
        <Stack direction="row" gap={3} alignItems="center">
          <Tooltip title={params.row.task} placement="top" arrow>
            <Avatar {...stringAvatar(params.row.task)} />
          </Tooltip>
          <Typography variant="body2">{params.row.task}</Typography>
        </Stack>
      ),
      resizable: false,
      flex: 1,
      minWidth: 155,
    },
  
    {
      field: 'status',
      headerName: 'Status',
      resizable: false,
      flex: 1,
      minWidth: 115,
      valueGetter: (params: any) => {
        //console.log(params,'yuhiuooji')
        // Map boolean status to display values
        return params ? 'Completed' : 'Pending';
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      resizable: false,
      flex: 1,
      minWidth: 80,
      getActions: (params) => [
        <Checkbox
        checked={params.row.status}
        onChange={(event) => {
          const newStatus = event.target.checked;
          onUpdate(params.row._id, params.row.task, newStatus);
        }}
      />,
        <Tooltip title="Edit" key={`edit-${params.id}`}>
          <GridActionsCellItem
            icon={<IconifyIcon icon="fluent:edit-32-filled" color="text.secondary" sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }} />}
            label="Edit"
            size="small"
            onClick={() => handleEditClick(params.row)}
          />
        </Tooltip>,
        <Tooltip title="Delete" key={`delete-${params.id}`}>
          <GridActionsCellItem
            icon={<IconifyIcon icon="mingcute:delete-3-fill" color="error.main" sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }} />}
            label="Delete"
            size="small"
            onClick={() => onDelete(params.row._id)}
          />
        </Tooltip>,
         
      ],
    },
  ], [onDelete, onUpdate]);

  useEffect(() => {
    apiRef.current.setQuickFilterValues(
      searchText.split(/\b\W+\b/).filter((word: string) => word !== ''),
    );
  }, [searchText]);

  useEffect(() => {
    const handleResize = () => {
      if (apiRef.current) {
        apiRef.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [apiRef]);

  return (
    <>
      <DataGrid
        apiRef={apiRef}
        density="standard"
        columns={columns}
        autoHeight={false}
        rowHeight={56}
        // checkboxSelection
        disableColumnMenu
        disableRowSelectionOnClick
        rows={rows}
        getRowId={(row) => row._id}
        onResize={() => {
          apiRef.current.autosizeColumns({
            includeOutliers: true,
            expand: true,
          });
        }}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 4 } },
        }}
        slots={{
          loadingOverlay: CircularProgress as GridSlots['loadingOverlay'],
          pagination: CustomPagination as GridSlots['pagination'],
          noResultsOverlay: CustomNoResultsOverlay as GridSlots['noResultsOverlay'],
        }}
        slotProps={{
          pagination: { labelRowsPerPage: rows?.length },
        }}
        sx={{
          height: 1,
          width: 1,
          tableLayout: 'fixed',
          scrollbarWidth: 'thin',
          border: '1px solid #614092',
          borderRadius: '8px', // Optional: rounded corners

        }}
      />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            variant="outlined"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
            error={!!taskError}
            helperText={taskError}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value as boolean)}
              label="Status"
            >
              {statusOptions.map(option => (
                <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoTable;
