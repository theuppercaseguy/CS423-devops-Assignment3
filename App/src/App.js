import React, { useState } from 'react';
import CartView from './cartview'
import ShippingOptions from './shippingOptions'
import MsgYNModal from './msgYNModal';
import './App.css';

function App(props) {
  const [showMsgYNModal, setMsgYNModal] = useState({ showMsgYNModal: false, message: "", methodOnClose: ()=>{} });
  const [shippingCost, setShippingCost] = useState(0);

  const handleChangeValue = (value) => {
    setShippingCost(value);
  }

  return (
    <>
      <div className="App">
          <p data-testid="thanks_id">Thank you for shopping with us!</p>
          <CartView shippingCost={shippingCost} cartId={props.cartId} />
          <ShippingOptions onChangeValue={handleChangeValue} />
          <button onClick={() => setMsgYNModal({
            showMsgYNModal: true, message: "Do you agree with the purchase agreement?", methodOnClose: (decision) => {
              setMsgYNModal({ msgYNModalState: { showMsgYNModal: false, message: "", methodOnClose: ()=>{} } })
            }
          })} >
            Make Purchase
          </button>
      </div>
      <MsgYNModal
        style={{ width: '80%', maxHeight: 435 }}
        id="yesno-confirm"
        keepMounted
        message={showMsgYNModal.message}
        open={showMsgYNModal.showMsgYNModal}
        onClose={showMsgYNModal.methodOnClose}
      />
    </>
  );
}

export default App;
