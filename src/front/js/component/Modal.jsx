import React, { useEffect } from 'react';

const Modal = ({
  button,
  modal,
  id,
  acceptFunction
}) => {

  const acceptHandler = async () => {
    if (acceptFunction) await acceptFunction();

    $('#' + id).modal('hide')
  }

  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#" + id}>
        {button.label}
      </button>

      <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id + "Label"} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={id + "Label"}>{modal.title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {modal.body}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{modal.cancel}</button>
              <button type="button" className="btn btn-primary" onClick={acceptHandler}>{modal.accept}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;