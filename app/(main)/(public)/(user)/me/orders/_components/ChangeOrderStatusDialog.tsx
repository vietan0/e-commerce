import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import OrderStatusChip from '@/app/(main)/(public)/(user)/me/orders/_components/OrderStatusChip';
import theme from '@/app/theme';
import useUpdateOrder from '@/src/queries/orders/useUpdateOrder';
import useResource from '@/src/queries/useResource';
import { useOrderStore } from '@/src/store/OrderStore';

export default function ChangeOrderStatusDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const {
    data: orderStatuses,
    isPending,
    error,
  } = useResource('order-statuses');
  const order = useOrderStore((state) => state.order);
  const [selectedId, setSelectedId] = useState(order.order_status_id);
  const updateOrder = useUpdateOrder();

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedId(index);
  };

  function resetLocalSelected() {
    setSelectedId(order.order_status_id);
  }

  function save() {
    updateOrder.mutate({
      data: {
        order_status_id: selectedId,
      },
      id: order.id,
    });
  }

  if (isPending) return <Loading />;
  if (error) return <QueryError error={error} />;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            width: 1,
            maxWidth: 400,
          },
        },
      }}
    >
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <List aria-label="Order Status List" component="nav">
          {orderStatuses.map((orderStatus) => {
            const selected = selectedId === orderStatus.id;
            return (
              <ListItemButton
                key={orderStatus.id}
                onClick={(event) => handleListItemClick(event, orderStatus.id)}
                selected={selected}
              >
                {selected && (
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                    }}
                  >
                    <Icon
                      fontSize={20}
                      icon="material-symbols:check-rounded"
                      style={{
                        color: theme.palette.primary.main,
                      }}
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  inset={!selected}
                  sx={{
                    paddingLeft: selected ? 0 : '32px',
                  }}
                >
                  <OrderStatusChip order_status={orderStatus} />
                </ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
          useFlexGap
        >
          <Button
            color="inherit"
            onClick={() => {
              resetLocalSelected();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={selectedId === order.order_status_id}
            loading={updateOrder.isPending}
            onClick={save}
            variant="contained"
          >
            Save
          </Button>
        </Stack>
        {updateOrder.error && (
          <Typography
            color="error"
            sx={{ textAlign: 'right', pt: 2, pb: 1 }}
            variant="body2"
          >
            {updateOrder.error.message}
          </Typography>
        )}
      </DialogActions>
    </Dialog>
  );
}
