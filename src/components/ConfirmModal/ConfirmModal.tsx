import * as S from "./styles";

interface IConfirmModalProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: IConfirmModalProps) => {
  return (
    <S._Overlay role="presentation" onClick={onCancel}>
      <S._Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <S._Title id="confirm-modal-title">{title}</S._Title>
        <S._Description id="confirm-modal-description">
          {description}
        </S._Description>
        <S._Actions>
          <S._CancelButton type="button" onClick={onCancel}>
            {cancelText}
          </S._CancelButton>
          <S._ConfirmButton type="button" onClick={onConfirm}>
            {confirmText}
          </S._ConfirmButton>
        </S._Actions>
      </S._Modal>
    </S._Overlay>
  );
};
