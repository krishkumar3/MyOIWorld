import './App.css';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { Component } from 'react';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';

 
class AtmChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nifty: "15220",
            bankNifty : "34552",
            cssNifty : "green",
            cssBankNifty : "red",
            atm : 0
        }
        this.handleState = this.handleState.bind(this);
    }
  
    componentDidMount(){
        axios({
            method: "post",
            // url: "http://127.0.0.1:8000/get/" + this.props.Useremail + "/",
            url : "http://127.0.0.1:8000/getOIData/28Jul2022/NIFTY/",
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(response => {
              console.log(JSON.stringify(response.data));
              this.setState({ atm: response.data.ATM });
              
            })
            .catch(error => {
              console.log(error)
            })
    }

    // componentDidMount(){
    //     console.log("Starting");
    //     // const url = "wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
    //     const url = "wss://ewstream.edelweiss.in/";
    //     const updatesSocket = new WebSocket(url);
    //     var data = "NONE";
    //     updatesSocket.onmessage = (e) => {
    //         // setTimeout(() => {  console.log("World!"); }, 1000);
    //         console.log(e.data);
    //         data = e.data
    //         var min = 15100;
    //         var max = 15260;
    //         var prevNifty = Number(this.state.nifty);
    //         const randNifty = Number(min + Math.random() * (max - min)).toFixed(2);
    //         if(randNifty > prevNifty){
    //             this.setState({cssNifty:"green"});
    //         }
    //         else{
    //             this.setState({cssNifty:"red"});
    //         }

    //         min = 35100;    
    //         max = 35260;
    //         var prevBankNifty = Number(this.state.bankNifty);
    //         const randBankNifty = Number(min + Math.random() * (max - min)).toFixed(2);
    //         if(randBankNifty > prevBankNifty){
    //             this.handleState("cssBankNifty","green");
    //         }
    //         else{
    //             this.handleState("cssBankNifty","red");
    //         }

    //         this.handleState("nifty",randNifty);
    //         this.handleState("bankNifty",randBankNifty);
    //         console.log(this.state);

    //     };
      
    //     updatesSocket.onclose = function(e) {
    //         console.error('Chat socket closed unexpectedly');
    //     };
    // } 
    
    handleState = (key,data) => {
        this.setState({[key]:data})
    }

    render() {

        // const updatesSocket = new WebSocket(`ws://127.0.0.1:8000/ws/nifty/`);
       
          
        const min = Math.round(Math.min(...this.props.data.map(o => o.premium)) - 5)
        const max = Math.round(Math.max(...this.props.data.map(o => o.premium)) + 5)
        
        return (
            <div>   
                <div class="row no-gutters">
                    <div class="col-md-6 no-gutters" style={{ align: "left" }}>

                        <h3 className="text-center" style={{ marginTop: "5px"}}>
                            Nifty ATM - <h1 style ={{display : "inline"}} className={this.state.cssNifty}>{this.state.nifty}</h1>
                        </h3>

                   

                        <div className='leftside'>
                            <ResponsiveContainer height='80%' width='100%'>
                                <LineChart data={this.props.data}>
                                    <CartesianGrid />
                                    <XAxis dataKey="time" angle={-45}
                                        interval={15} />
                                    <YAxis interval={2} tickCount={20} type="number" domain={[min, max]}></YAxis>
                                    <Legend />
                                    <Tooltip />
                                    <Line dataKey="premium" type='monotone' interval={10}
                                        stroke="blue" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div class="col-md-6 no-gutters">

                        <h3 className="text-center" style={{ marginTop: "5px" }}>
                            BankNifty ATM -  <h1 style ={{display : "inline"}} className={this.state.cssBankNifty}>{this.state.bankNifty}</h1>
                        </h3>
                        <div className='rightside'>
                            <ResponsiveContainer height='80%' width='100%'>
                                <LineChart data={this.props.data}  >
                                    <CartesianGrid />
                                    <XAxis dataKey="time" angle={-45}
                                        interval={15} />
                                    <YAxis interval={2} tickCount={20} type="number" domain={[min, max]}></YAxis>
                                    <Legend />
                                    <Tooltip />
                                    <Line dataKey="premium" strokeLinecap="round" type='monotone' interval={10}
                                        stroke="blue" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default AtmChart;