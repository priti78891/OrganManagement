import React from 'react';
import PropTypes from 'prop-types';
import instance from '../../Etherium/contrctInstance';
import axios from "axios";
import web3 from '../../Etherium/web';
class Modal extends React.Component {
    async verify(metamaskid,donorid) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        debugger
        await instance.methods.addHospital(metamaskid).send({from: accounts[0]});
        var updation={
            role:'Donar',
            metaid:donorid,
            matchid:metamaskid,
            status:'matched'
        }
        await axios.post('http://localhost:4000/changeStatus/',updation)   /// After Hosting change to hosted backend name
              .then(res => {
                if (!res.data.message) {
                  console.log("ok");
                } else {
                  alert(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
                alert("Err -> " + err);
              });
              var updation={
                role:'Seeker',
                metaid:metamaskid,
                matchid:donorid,
                status:'matched'
            }
            await axios.post('http://localhost:4000/changeStatus/',updation)   /// After Hosting change to hosted backend name
                  .then(res => {
                    if (!res.data.message) {
                      console.log("ok");
                    } else {
                      alert(res.data.message);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    alert("Err -> " + err);
                  });
                  alert("Transplant verified!!")
        console.log('Transplant Verified => ' + metamaskid);
        window.location.href='/Transplant'
    }
    reject(event) {
        console.log('Rejected => '+ event.target.value);
    }
    render() {
        if (!this.props.show) {
            debugger
            console.log("verified")
            return null;
        }

        const backdropStyle = {
            position: 'fixed',
            top: 50,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50,

        };

        const model = {
            position: 'relative',
            top: 0,
            left: 0,
            display: 'table',
            Width: '100%',
            height: '30%',
            overflow: 'hidden',
            outline: 0,
            backgroundColor: '#fff',
            margin: '0 auto',
            padding: 10,
            maxWidth: 500,
            minHeight: 300,
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={model}>
                    {this.props.children}

                    <div className="footer footerStyle">
                        <button className="btn-warning" onClick={this.props.onClose}>
                            Close
                        </button>
                        {this.props.matched==='false'?
                            <div>
                        <button className="btn-warning" onClick={()=>this.verify(this.props.metamaskid,this.props.donorid)} value={this.props.metamaskid}>
                            Verify
                        </button>
                        <button className="btn-warning" onClick={this.reject} value={this.props.metamaskid}>
                            Reject
                        </button>
                        </div> : <div></div>
    }
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    metamaskid: PropTypes.string,
    children: PropTypes.node
};

export default Modal;