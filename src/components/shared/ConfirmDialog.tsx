import "./ConfirmDialog.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default function ConfirmDialog({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  // message = "Are you sure you want to delete this advert? This action cannot be undone.",
  onConfirm,
  onCancel,
  disabled = false,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
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
            {disabled ? "Processing..." : confirmButtonText}
          </button>
          <button
            className="cancel-button"
            onClick={onCancel}
            disabled={disabled}
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
