import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Hypnosis from "../loader";
import { Table, Button } from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import instance from "../../Etherium/contrctInstance";
import web3 from "../../Etherium/web";
import Modal from './Transplant_Model';
var isdone = false;
var index = null;

export function Transplant() {
    const [data, setData] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [datafetched, setdatafetched] = useState(false);
    const [user, setUser] = useState({});
    const [donardata, setDonarData] = useState();
    useEffect(async () => {
        require("../../styles/bootstrap.min.css");
        require("../../styles/tooplate.css");
        debugger;
        var cnt = 0;

        const accounts = await web3.eth.getAccounts();
        const tmpUser = await AuthService.getCurrentUser()
        setUser(tmpUser);
        console.log("temp"+tmpUser)
        console.log("account"+accounts[0]);
        if (accounts[0] && tmpUser) {
            // const len=await instance.methods.getDonorcount().call();
            //var addData = [];
            // console.log(len);
            // for(var i=0; i<len; i++)
            // {
            //     const donorid=await instance.methods.donorarr(i).call();
            //     const DonarInfo =await instance.methods.Donors(donorid).call();
            //     console.log(DonarInfo);
            //     if(DonarInfo['hospitalid']===accounts[0]){
            //         if(DonarInfo['added']==true){
            //             Axios.get("http://localhost:4000/getrequest?hid="+DonarInfo['hospitalid'])
            //             .then(result => {
            //                 addData.push(result.data[0])
            //                 setData(addData);
            //                 isdone = false;
            //                 cnt++;
            //                 // console.log(addData);
            //                 // setdatafetched(true);
            //             });
            //             // addData.push(DonarInfo);
            //             // setData(addData);
            //         }
            //     }
            // }

           // const len1 = await instance.methods.getrecipientcount().call();
            //console.log(len1);
           // for (var i = 0; i < len1; i++) {
            //var len1 =0;
            // Axios.get("http://localhost:4000/getrequest?hid=" + accounts[0] + "&userrole=Donar")
            // .then(result=>{
            //     len1=result.data.length;

            // });
                // const donorid = await instance.methods.recipientarr(i).call();
                // const DonarInfo = await instance.methods.Recipients(donorid).call();
                // console.log("donor id: "+donorid)
                // console.log(DonarInfo);
                // console.log("accounts:"+accounts)
                // if (DonarInfo['hospitalid'] === accounts[0]) {
                //     console.log("account id matched")
                //     if (DonarInfo['added'] == true) {

                        await Axios.get("http://localhost:4000/getrequest?hid=" + accounts[0] + "&userrole=Seeker",{
                            headers: {
                                'Content-Type': 'application/json'
                            }})
                            .then(result => {
                                console.log(result.data)
                                //addData.push(result.data[0])
                                setData(result.data);
                                isdone = false;
                                cnt=result.data.length;
                                // console.log(addData);
                                // setdatafetched(true);
                            }).catch(err=>{
                                console.log(err);
                            })
                        // addData.push(DonarInfo);
                        // setData(addData);
                   // }
                //}
           // }
        }
        // Axios
        //     .get("http://localhost:2345/Api/employee/DemoData")
        //     .then(result => setData(result.data));
        // console.log(data);
        // debugger;
        if (cnt == 0) {
            isdone = true;
            setdatafetched(true);
        }
        setdatafetched(true);

    }, []);

    // function logout() {
    //     AuthService.logout();
    // }

    async function toggleModal(metaid,id,matchid,isclosing) {
        if(matchid)
        {
            setdatafetched(false);
        const accounts = await web3.eth.getAccounts();
        var a=null;
            await Axios.get("http://localhost:4000/getrequest?hid=" + accounts[0] + "&userrole=Donar"+"&metaid="+matchid)
            .then(async result => {
                // .push(result.data[0])
                console.log(result.data);
                    await setDonarData(result.data[0]);
                    a=result.data[0]
        
                setdatafetched(true);

            });
        
        }else{
        if(metaid!=null){
        setdatafetched(false);
        const accounts = await web3.eth.getAccounts();
        var abs = await instance.methods.transplantmatch(metaid).call();
        console.log(abs);
        var a=null;
        if(abs==="0x0000000000000000000000000000000000000000")
           { alert("No Match Found")
            window.location.href='/Transplant'
        }
        else{
            console.log("http://localhost:4000/getrequest?hid=" + accounts[0] + "&userrole=Donar"+"&metaid="+abs);
        await Axios.get("http://localhost:4000/getrequest?hid=" + accounts[0] + "&userrole=Donar"+"&metaid="+abs)
            .then(async result => {
                // .push(result.data[0])
                console.log(result.data);
                if(result.data[0].status==='verified'){
                    await setDonarData(result.data[0]);
                    a=result.data[0]
            }
                else{
                    alert("No Match Found")
                }
                setdatafetched(true);

            });
        }
        }}
        if(id!=null)
            index = id;
        if(a!=null || isclosing)
            setisOpen(!isOpen);
    }

    if (!datafetched) {
        return (
            <Hypnosis />
        )
    } else {
        return (
            <div className="" id="home">
                <div className="container">
                    <div className="row tm-content-row tm-mt-big">
                        <div className="col-xl-12 col-lg-12 tm-md-12 tm-sm-12 tm-col">
                            <div className="bg-white tm-block h-100">
                                <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                        <h2 className="tm-block-title d-inline-block"> Transplant </h2>

                                    </div>
                                    <div className="col-md-4 col-sm-12 text-right">
                                        <a href="/HDashboard" className="btn btn-small btn-primary space">Back</a>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped tm-table-striped-even mt-3">
                                        <thead>
                                            <tr className="tm-bg-gray">
                                                <th scope="col">sr no</th>
                                                <th scope="col">Seeker Name</th>
                                                <th scope="col" className="text-center">Organ</th>
                                                <th scope="col" className="text-center">Status</th>
                                                <th scope="col">Find Donar</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {data.map((item, index) => {
                                                return <tr>
                                                    <th scope="row">{index}.</th>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.orgname}</td>
                                                    <td>{item.status}</td>
                                                    <td>
                                                        {item.status==='matched' ?
                                                        <Button variant="info" onClick={() => toggleModal(item.metamaskid,index,item.matchid,false)} >
                                                        Donor Details
                                                    </Button> :
                                                        <Button variant="info" onClick={() => toggleModal(item.metamaskid,index,item.matchid,false)} >
                                                            <span>&#10144;</span>
                                                        </Button> 
                                    
                                                        }
                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                    {isdone === true ? <div className="isdone">No More To Do Transplant</div> : <div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={isOpen} donorid={donardata?donardata.metamaskid:''} matched={data[index]? (data[index].matchid===""?"false":"true"):''}
                    onClose={() => toggleModal(null,null,null,true)} metamaskid={data[index] ? data[index].metamaskid : ''}>
                    <Table className="table">
                        <tbody>

                            <tr>
                                <th>Hospital Name </th><td> {donardata ? donardata.fullName : ''}</td>
                            </tr>
                            <tr>
                                <th>Email Id  </th><td> {donardata ? donardata.email : ''}</td>
                            </tr>
                            <tr>
                                <th>Mobile No  </th><td> {donardata ? donardata.mobileno : ''}</td>
                            </tr>
                            <tr>
                                <th>Blood Group </th><td> {data[index] ? data[index].bloodgroup : ''}</td>
                            </tr>
                            <tr>
                                <th>Organ Name </th><td> {data[index] ? data[index].orgname : ''}</td>
                            </tr>
                            <tr>
                                <th>State  </th><td> {donardata ? donardata.state : ''}</td>
                            </tr>
                            <tr>
                                <th>District  </th><td> {donardata ? donardata.district : ''}</td>
                            </tr>
                            <tr>
                                <th>City  </th><td> {donardata ? donardata.city : ''}</td>
                            </tr>
                        </tbody>
                    </Table>

                </Modal>
            </div>

        );
    }
}
//}