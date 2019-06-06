import React, { Component, Fragment } from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} onClick={this.props.close} />

        <div
          className="Modal"
          style={{
            transform: this.props.show
              ? "translateY(0)"
              : "translateY(-1000vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          <div className="modal-dialog my-0 " role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <br />
                <div className="text-center">{this.props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Modal;
