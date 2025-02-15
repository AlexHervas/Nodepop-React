import "./ConfirmDialog.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this advert? This action cannot be undone.",
  onConfirm,
  onCancel,
  disabled = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h3 className="confirm-dialog-title">{title}</h3>
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-buttons">
          <button
            className="confirm-button"
            onClick={onConfirm}
            disabled={disabled}
          >
            {disabled ? "Deleting..." : "Delete"}{" "}
          </button>
          <button
            className="cancel-button"
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
