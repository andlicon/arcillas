import React from 'react';
import { useNavigate } from "react-router-dom";

const Modal = ({
  button,
  modal,
  id,
  acceptFunction,
  redirect,
  idItem,
  children
}) => {
  const navigate = useNavigate();

  const acceptHandler = async (event) => {
    if (acceptFunction) await acceptFunction(event);

    $('#' + id).modal('hide');

    if (redirect) navigate(redirect);
  }

  return (
    <>
      <button type="button" className={"btn btn-primary " + button?.className} data-bs-toggle="modal" data-bs-target={"#" + id}>
        {button?.icon}
        {button?.label}
      </button>

      <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id + "Label"} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content box-shadow">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={id + "Label"}>{modal?.title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                modal?.body
              }
              {
                children
              }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                {
                  modal?.cancel
                }
              </button>
              <button
                id={'delete-' + idItem}
                type="button"
                className="btn btn-primary"
                onClick={acceptHandler}>
                {
                  modal?.accept
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;