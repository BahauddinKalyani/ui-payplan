import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  
  interface DeleteAlertDialogProps {
    showDeleteAlert: boolean;
    delete_transaction: () => void;
    setShowDeleteAlert: (value: boolean) => void;
  }

  export default function DeleteAlertDialog(props: DeleteAlertDialogProps) {

    const handleDelete = () => {
      props.delete_transaction();
      props.setShowDeleteAlert(false);
    }
    const handleCancel = () => {
        props.setShowDeleteAlert(false);
    }

    return (
      <AlertDialog open={props.showDeleteAlert}>
        <AlertDialogContent className="max-w-sm mx-auto sm:mx-auto p-4 rounded-lg shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              transaction and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  