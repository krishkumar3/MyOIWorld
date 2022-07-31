import './App.css';
import {
    LineChart,
    BarChart,
    Bar,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Label,
    ReferenceLine
} from 'recharts';
import { Component } from 'react';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';


class OIChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nifty: "15320",
            bankNifty: "34452",
            cssNifty: "green",
            expiry:"28Jul2022",
            scrip:"NIFTY",
            cssBankNifty: "red",
            data : [{"strike": 16450, "ceOI": "1.79", "peOI": "17.03", "ceOIchg": "-0.20", "peOIchg": "12.84"}, {"strike": 16500,
            "ceOI": "31.15", "peOI": "72.94", "ceOIchg": "-2.72", "peOIchg": "27.19"}, {"strike": 16550, "ceOI": "3.37", "peOI":
            "11.35", "ceOIchg": "-1.33", "peOIchg": "3.52"}, {"strike": 16600, "ceOI": "24.70", "peOI": "45.93", "ceOIchg": "-4.78",
            "peOIchg": "24.50"}, {"strike": 16650, "ceOI": "7.16", "peOI": "12.18", "ceOIchg": "1.65", "peOIchg": "10.31"},
            {"strike": 16700, "ceOI": "41.67", "peOI": "35.65", "ceOIchg": "17.53", "peOIchg": "31.28"}, {"strike": 16750, "ceOI":
            "12.27", "peOI": "4.34", "ceOIchg": "6.04", "peOIchg": "3.94"}, {"strike": 16800, "ceOI": "45.12", "peOI": "10.62",
            "ceOIchg": "16.24", "peOIchg": "7.26"}, {"strike": 16850, "ceOI": "10.49", "peOI": "1.32", "ceOIchg": "2.51", "peOIchg":
            "1.18"}, {"strike": 16900, "ceOI": "25.99", "peOI": "2.81", "ceOIchg": "5.98", "peOIchg": "2.09"}, {"strike": 16950,
            "ceOI": "10.78", "peOI": "0.55", "ceOIchg": "5.75", "peOIchg": "0.51"}]
        }
        this.handleState = this.handleState.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.fetchOI = this.fetchOI.bind(this);
    }

    componentDidMount(){
        this.fetchOI(this.state.scrip,this.state.expiry)
    }
    // sample


    fetchOI(scrip,expiry){
        axios({
            method: "post",
            // url: "http://127.0.0.1:8000/get/" + this.props.Useremail + "/",
            // url : "http://127.0.0.1:8000/getOIData/28Jul2022/NIFTY/",
            url : "http://127.0.0.1:8000/getOIData/"+this.state.expiry+"/"+this.state.scrip+"/",

            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(response => {
              console.log(JSON.stringify(response.data));
              this.setState({ data: response.data.OI });
              this.setState({ atm: response.data.ATM });
              this.setState({ atm_premium: response.data.ATMPremium });

              
            })
            .catch(error => {
              console.log(error)
            })
    }
    
    handleState = (key, data) => {
        this.setState({ [key]: data })
    }

    handleDropdown(e){
        e.preventDefault();
        this.setState({[e.target.name]: [e.target.value]},() => {
            this.fetchOI(this.state.scrip,this.state.expiry);
          });
       
    }

    render() {
    
  
        const data = [
            { strike: '16000', ceOI: 10 , peOI: 400 },
            { strike: '16050', ceOI: 20 , peOI: 200 },
            { strike: '16100', ceOI: 30 , peOI: 100 },
            { strike: '16150', ceOI: 40 , peOI: 100 },
            { strike: '16200', ceOI: 50 , peOI: 100 },
            { strike: '16250', ceOI: 60 , peOI: 50 },
            { strike: '16300', ceOI: 70 , peOI: 60 },
            { strike: '16350', ceOI: 90 , peOI: 30 },
            { strike: '16400', ceOI: 110 , peOI: 20 },
            { strike: '16450', ceOI: 140 , peOI: 20 },
            { strike: '16500', ceOI: 10 , peOI: 400 },
            { strike: '16550', ceOI: 20 , peOI: 200 },
            { strike: '16600', ceOI: 30 , peOI: 100 },
            { strike: '16650', ceOI: 40 , peOI: 100 },
            { strike: '16700', ceOI: 50 , peOI: 100 },
            { strike: '16750', ceOI: 60 , peOI: 50 },
            { strike: '16800', ceOI: 70 , peOI: 60 },
            { strike: '16850', ceOI: 90 , peOI: 30 },
            { strike: '16900', ceOI: 110 , peOI: 20 },
            { strike: '16950', ceOI: 140 , peOI: 20 },
        ];
       
        const CustomTooltip = ({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="custom-tooltip">
                  <p className='tooltipLabel'>{`${label}`}</p>
                  <p className='tooltipLabel'>{`Call OI : ${payload[0].value}`}</p>
                  <p className='tooltipLabel'>{`Put OI : ${payload[1].value}`}</p>
                </div>
              );
            }
          
            return null;
          };

        const min = Math.round(1.2 * Math.min(...this.state.data.map(o => o.peOIchg)));
        const max = Math.round(1.2 * Math.max(...this.state.data.map(o => o.peOIchg)));
        const min1 = Math.round(1.2 * Math.min(...this.state.data.map(o => o.ceOIchg)));
        const max1 = Math.round(1.2 * Math.max(...this.state.data.map(o => o.ceOIchg)));
        const chartMin = Math.min(min,min1);
        const chartMax = Math.max(max,max1);

        const oimax = Math.round(1.2 * Math.max(...this.state.data.map(o => o.peOI)));
        const oimax1 = Math.round(1.2 * Math.max(...this.state.data.map(o => o.ceOI)));
        const oichartMax =  Math.max(oimax,oimax1);

        return (
            <div>
                <br></br>
                <div style={{ "display": "flex", "width": "50%" }}>
                    <select class="form-select" aria-label="Default select example" value = {this.state.scrip} name="scrip" onChange = {this.handleDropdown}>
                        <option selected>Select Scrip</option>
                        <option value="NIFTY">Nifty</option>
                        <option value="BANKNIFTY">BankNifty</option>
                        <option value="FINNIFTY">Finnity</option>
                    </select>
                    <select class="form-select" aria-label="Default select example"  value = {this.state.expiry} name="expiry" onChange = {this.handleDropdown}>
                        <option selected>Select Expiry</option>
                        <option value="28Jul2022">28 Jul 2022</option>
                        <option value="4Aug2022">4 Aug 2022</option>
                    </select>
                </div>

                <div style={{ align: "center" }}>

                    <h3 className="text-center" style={{ marginTop: "5px" }}>
                        {this.state.scrip} ATM - {this.state.atm} - ATM Premium - {this.state.atm_premium}
                    </h3>



                    <div className='middlealign'>   
                         <ResponsiveContainer height='70%' width='90%'>
                            <BarChart data={this.state.data} barGap={0}>
                                <CartesianGrid vertical = {false} stroke="#d3d3d3" />
                                <Bar dataKey="ceOI" animationDuration={400} fill="red" />
                                <Bar dataKey="peOI" animationDuration={400} fill="green" />   
                                <ReferenceLine x={this.state.atm} stroke="brown" label="ATM Strike" />
                                <XAxis dataKey="strike" />
                                <Legend />
                                <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                                <YAxis minTickGap={2} tickCount={10} type="number" domain={[0, oichartMax]}></YAxis>
                            </BarChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer height='70%' width='90%'>
                            <BarChart data={this.state.data} barGap={0}>
                                <CartesianGrid vertical = {false} stroke="#d3d3d3" />
                                <Bar dataKey="ceOIchg" animationDuration={400} fill="red" />
                                <Bar dataKey="peOIchg" animationDuration={400} fill="green" />
                                <ReferenceLine x={this.state.atm} stroke="brown" label="ATM Strike" />
                                <XAxis dataKey="strike" />
                                <Legend />
                                <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                                <YAxis minTickGap={2} tickCount={10} type="number" domain={[chartMin, chartMax]}></YAxis>
                            </BarChart> 
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default OIChart;