import React from 'react';
import PropTypes from 'prop-types';
import instance from '../../src/Etherium/contrctInstance';
import axios from "axios";
import web3 from '../../src/Etherium/web';

// const MongoClient = require('mongodb').MongoClient;
// const dotenv = require('dotenv');
// dotenv.config();
// const mongoose = require('mongoose');

// const uri = process.env.DATABASE_ACCESS;
class Modal extends React.Component {
    
    async verify(event) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        console.log(event.target.value);
        await instance.methods.addHospital(event.target.value).send({from:accounts[0]});
        var updation={
            role:'Donar',
            metaid:event.target.value,
            status:'verified'
        }
        axios.post('http://localhost:4000/changeStatus/',updation)   /// After Hosting change to hosted backend name
              .then(res => {
                if (!res.data.message) {
                  console.log("ok");
                  alert("Donor verified!!");
                } else {
                  alert(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
                alert("Err -> " + err);
              });
              window.location.href='/huser'
    }
    reject(event) {
        var updation={
            role:'Donar',
            metaid:event.target.value,
            status:'rejected'
        }
        axios.post('http://localhost:4000/changeStatus/',updation)   /// After Hosting change to hosted backend name
              .then(res => {
                if (!res.data.message) {
                  console.log("ok");
                  alert("Donor rejected!!");
                } else {
                  alert(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
                alert("Err -> " + err);
              });
        console.log('Rejected => '+ event.target.value);

    

        // mongoose.connect(uri, {useNewUrlParser: true})
        // const Donors = mongoose.Model('Donors', DonorSchema);
        
        // const res=Donors.getAccounts();
        // alert(res);

    

       

        
        

    }
    render() {
        if (!this.props.show) {
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
                        {this.props.status==='pending'?
                        <div>
                        <button className="btn-warning" onClick={this.verify} value={this.props.metamaskid}>
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