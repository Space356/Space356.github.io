﻿AudioWorkletProcessor.prototype._c3=function(){this._d3=true;this.port.onmessage=(_e3)=>{if(_e3.data==="kill")this._d3=false;};};class _f3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._c3();}process(_g3,_h3,parameters){const input=_g3[0];const bypass=parameters.bypass;for(let c=0;c<input.length;++c){const _i3=input[c];for(let _j3=0;_j3<_i3.length;++_j3){const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];
_h3[_k3][c][_j3]=_i3[_j3];}}return this._d3;}}class _l3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._c3();}process(_g3,_h3,parameters){const _m3=_g3[0];const _n3=_g3[1];const output=_h3[0];const gain=parameters.gain;for(let c=0;c<_n3.length;++c){const _i3=_n3[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3)_o3[_j3]=_i3[_j3];}for(let c=0;c<_m3.length;++c){const _i3=_m3[c];const _o3=output[c];
for(let _j3=0;_j3<_i3.length;++_j3){const _p3=(gain[_j3]!==undefined)?gain[_j3]:gain[0];_o3[_j3]+=_i3[_j3]*_p3;}}return this._d3;}}registerProcessor("audio-bus-input",_f3);registerProcessor("audio-bus-output",_l3);class _q3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100}
,{name:"resolution",automationRate:"a-rate",defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static _r3=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._u3=new Float32Array(_t3);this._v3=new Uint32Array(_t3);}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const gain=parameters.gain;
const factor=parameters.factor;const resolution=parameters.resolution;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){_o3[_j3]=_i3[_j3];if(this._v3[c]===0)this._u3[c]=_i3[_j3];const _w3=(factor[_j3]!==undefined)?factor[_j3]:factor[0];++this._v3[c];this._v3[c]%=_w3;const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];if(_k3>0.0){continue;}let _x3=this._u3[c];const _p3=(gain[_j3]!==undefined)?gain[_j3]:gain[0];_x3*=_p3;_x3=Math.max(Math.min(_x3,
1.0),-1.0);const _y3=(resolution[_j3]!==undefined)?resolution[_j3]:resolution[0];const max=(_x3>0.0)?_q3._r3[_y3]-1:_q3._r3[_y3];_x3=Math.round(_x3*max)/max;const _z3=(mix[_j3]!==undefined)?mix[_j3]:mix[0];_o3[_j3]*=(1.0-_z3);_o3[_j3]+=(_x3*_z3);}}return this._d3;}}registerProcessor("bitcrusher-processor",_q3);class _A3{constructor(_B3=1e-3){this.setTime(_B3);}setTime(_B3){this._C3=Math.exp(-1/(_B3*sampleRate));}process(_D3,_E3){return _D3+this._C3*(_E3-_D3);}}class _F3{constructor(_G3,_H3){this._I3=new _A3(_G3);
this._J3=new _A3(_H3);this._K3=_G3;this._L3=_H3;}_M3(_B3){if(_B3===this._K3)return;this._I3.setTime(_B3);this._K3=_B3;}_N3(_B3){if(_B3===this._L3)return;this._J3.setTime(_B3);this._L3=_B3;}process(_D3,_E3){if(_D3>_E3)return this._I3.process(_D3,_E3);else return this._J3.process(_D3,_E3);}}class _O3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"ingain",automationRate:"a-rate",defaultValue:1,minValue:0}
,{name:"threshold",automationRate:"a-rate",defaultValue:0.125,minValue:1e-3,maxValue:1},{name:"ratio",automationRate:"a-rate",defaultValue:4,minValue:1},{name:"attack",automationRate:"a-rate",defaultValue:0.05,minValue:1e-3,maxValue:1e-1},{name:"release",automationRate:"a-rate",defaultValue:0.25,minValue:1e-2,maxValue:1},{name:"outgain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(_P3){super();this._c3();const _I3=_O3.parameterDescriptors.find(_Q3=>_Q3.name==="attack");const _J3=_O3.parameterDescriptors.find(_Q3=>_Q3.name==="release");
this._R3=new _F3(_I3.defaultValue,_J3.defaultValue);this._S3=0;}process(_T3,_U3,_V3){const input=_T3[0];const output=_U3[0];const bypass=_V3.bypass;const ingain=_V3.ingain;const outgain=_V3.outgain;const threshold=_V3.threshold;const ratio=_V3.ratio;const attack=_V3.attack;const release=_V3.release;if(input.length===0)return this._d3;for(let _j3=0;_j3<input[0].length;++_j3){let frame=input.map(_W3=>_W3[_j3]);output.forEach((_W3,_X3)=>{_W3[_j3]=frame[_X3];});const _Y3=(ingain[_j3]!==undefined)?ingain[_j3]:ingain[0];
frame=frame.map(_Z3=>_Z3*=_Y3);const rect=frame.map(_Z3=>Math.abs(_Z3));const max=Math.max(...rect);const __3=_04(max);const _14=(threshold[_j3]!==undefined)?threshold[_j3]:threshold[0];const _24=_04(_14);const _34=Math.max(0,__3-_24);const _I3=(attack[_j3]!==undefined)?attack[_j3]:attack[0];const _J3=(release[_j3]!==undefined)?release[_j3]:release[0];this._R3._M3(_I3);this._R3._N3(_J3);this._S3=this._R3.process(_34,this._S3);const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];if(_k3>0)continue;const _y3=(ratio[_j3]!==undefined)?ratio[_j3]:ratio[0];
const _44=(this._S3/_y3)-this._S3;const _p3=_54(_44);frame=frame.map(_Z3=>_Z3*=_p3);const _64=(outgain[_j3]!==undefined)?outgain[_j3]:outgain[0];frame=frame.map(_Z3=>_Z3*=_64);output.forEach((_W3,_X3)=>{_W3[_j3]=frame[_X3];});}return this._d3;}}function _04(_74){return 20*Math.log10(_74);}function _54(_74){return Math.pow(10,_74/20);}registerProcessor("compressor-processor",_O3);class _84 extends AudioWorkletProcessor{static _94=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
defaultValue:0,minValue:0,maxValue:1},{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_84._94},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];const _a4=(_84._94*sampleRate)+1;this.buffer=new Array(_t3);this._b4=new Uint32Array(_t3);for(let c=0;c<_t3;++c)this.buffer[c]=new Float32Array(_a4);
}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){_o3[_j3]=_i3[_j3];const _14=(time[_j3]!==undefined)?time[_j3]:time[0];const _c4=this._d4(c,_14);const _w3=(feedback[_j3]!==undefined)?feedback[_j3]:feedback[0];const _e4=_i3[_j3]+(_c4*_w3);this.write(c,_e4);const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];
if(_k3>0.0){continue;}const _z3=(mix[_j3]!==undefined)?mix[_j3]:mix[0];_o3[_j3]*=(1-_z3);_o3[_j3]+=(_c4*_z3);}}return this._d3;}_d4(_f4,_B3){const _g4=_B3*sampleRate;let _h4=(this._b4[_f4]-~~_g4);let _i4=(_h4-1);while(_h4<0)_h4+=this.buffer[_f4].length;while(_i4<0)_i4+=this.buffer[_f4].length;const frac=_g4-~~_g4;const _j4=this.buffer[_f4][_h4];const _k4=this.buffer[_f4][_i4];return _j4+(_k4-_j4)*frac;}write(_f4,_l4){++this._b4[_f4];this._b4[_f4]%=this.buffer[_f4].length;this.buffer[_f4][this._b4[_f4]]=_l4;
}}registerProcessor("delay-processor",_84);class _m4 extends AudioWorkletProcessor{static get parameterDescriptors(){return [];}constructor(){super();this._c3();}process(_n4,_o4,_p4){const input=_n4[0];const _q4=_o4[0];const _r4=_o4[1];for(let c=0;c<input.length;++c){const _i3=input[c];const _s4=_q4[c];const _t4=_r4[c];for(let _j3=0;_j3<_i3.length;++_j3){_s4[_j3]=_i3[_j3];_t4[_j3]=_i3[_j3];}}return this._d3;}}class _u4 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._c3();}process(_n4,_o4,_p4){const _m3=_n4[0];const _n3=_n4[1];const output=_o4[0];const bypass=_p4.bypass;for(let c=0;c<_n3.length;++c){const _v4=_m3[c];const _w4=_n3[c];const _o3=output[c];for(let _j3=0;_j3<_v4.length;++_j3){const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];if(_k3>0){_o3[_j3]=_w4[_j3];}else {_o3[_j3]=_v4[_j3];}}}return this._d3;}}registerProcessor("eq-input",_m4);registerProcessor("eq-output",_u4);class _x4 extends AudioWorkletProcessor{
static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._c3();}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const gain=parameters.gain;for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){_o3[_j3]=_i3[_j3];const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];
if(_k3>0.0){continue;}const _p3=(gain[_j3]!==undefined)?gain[_j3]:gain[0];_o3[_j3]*=_p3;}}return this._d3;}}registerProcessor("gain-processor",_x4);class _y4 extends AudioWorkletProcessor{static get parameterDescriptors(){const _z4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(5000.0,_z4),minValue:10.0,maxValue:_z4},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,
maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._A4=0;this._B4=0;this._C4=0;this._D4=0;this._E4=0;this._F4=new Float32Array(_t3);this._G4=new Float32Array(_t3);this._H4=new Float32Array(_t3);this._I4=new Float32Array(_t3);this._J4=-1;this._K4=-1;this._L4=-1;}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;
const gain=parameters.gain;const _M4=(freq.length===1&&q.length===1&&gain.length===1);if(_M4)this._N4(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){if(_M4===false){const _w3=(freq[_j3]!==undefined)?freq[_j3]:freq[0];const _O4=(q[_j3]!==undefined)?q[_j3]:q[0];const _p3=(gain[_j3]!==undefined)?gain[_j3]:gain[0];this._N4(_w3,_O4,_p3);}const _P4=this._C4*_i3[_j3]+this._D4*this._F4[c]+this._E4*this._G4[c]-this._A4*this._H4[c]-this._B4*this._I4[c];
this._G4[c]=this._F4[c];this._F4[c]=_i3[_j3];this._I4[c]=this._H4[c];this._H4[c]=_P4;const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];_o3[_j3]=(_k3>0)?_i3[_j3]:_P4;}}return this._d3;}_N4(_Q4,_R4,_S4){if(_Q4===this._J4&&_R4===this._K4&&_S4===this._L4)return;const _T4=2*Math.PI*_Q4/sampleRate;const _U4=Math.cos(_T4);const _V4=Math.sqrt(_S4);const _W4=_V4+1;const _X4=_V4-1;const _Y4=_W4*_U4;const _Z4=_X4*_U4;const __4=_W4-_Z4;const _05=_W4+_Z4;const alpha=Math.sin(_T4)/(2*_R4);const _15=(2*Math.sqrt(_V4)*alpha);
const _25=__4+_15;const _A4=2*(_X4-_Y4);const _B4=__4-_15;const _C4=_V4*(_05+_15);const _D4=-2*_V4*(_X4+_Y4);const _E4=_V4*(_05-_15);this._A4=_A4/_25;this._B4=_B4/_25;this._C4=_C4/_25;this._D4=_D4/_25;this._E4=_E4/_25;this._J4=_Q4;this._K4=_R4;this._L4=_S4;}}registerProcessor("hi-shelf-processor",_y4);class _35 extends AudioWorkletProcessor{static get parameterDescriptors(){const _45=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",
automationRate:"a-rate",defaultValue:Math.min(1500.0,_45),minValue:10.0,maxValue:_45},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._A4=0;this._B4=0;this._C4=0;this._D4=0;this._E4=0;this._F4=new Float32Array(_t3);this._G4=new Float32Array(_t3);this._H4=new Float32Array(_t3);this._I4=new Float32Array(_t3);this._55=-1;this._K4=-1;}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];
const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _M4=(cutoff.length===1&&q.length===1);if(_M4)this._N4(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){if(_M4===false){const c=(cutoff[_j3]!==undefined)?cutoff[_j3]:cutoff[0];const _O4=(q[_j3]!==undefined)?q[_j3]:q[0];this._N4(c,_O4);}const _P4=this._C4*_i3[_j3]+this._D4*this._F4[c]+this._E4*this._G4[c]-this._A4*this._H4[c]-this._B4*this._I4[c];this._G4[c]=this._F4[c];
this._F4[c]=_i3[_j3];this._I4[c]=this._H4[c];this._H4[c]=_P4;const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];_o3[_j3]=(_k3>0)?_i3[_j3]:_P4;}}return this._d3;}_N4(_65,_R4){if(_65===this._55&&_R4===this._K4)return;const _T4=2*Math.PI*_65/sampleRate;const alpha=Math.sin(_T4)/(2*_R4);const _U4=Math.cos(_T4);const _25=1+alpha;const _A4=-2*_U4;const _B4=1-alpha;const _C4=(1+_U4)/2;const _D4=-1-_U4;const _E4=(1+_U4)/2;this._A4=_A4/_25;this._B4=_B4/_25;this._C4=_C4/_25;this._D4=_D4/_25;this._E4=_E4/_25;this._55=_65;
this._K4=_R4;}}registerProcessor("hpf2-processor",_35);class _75 extends AudioWorkletProcessor{static get parameterDescriptors(){const _z4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(500.0,_z4),minValue:10.0,maxValue:_z4},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}
constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._A4=0;this._B4=0;this._C4=0;this._D4=0;this._E4=0;this._F4=new Float32Array(_t3);this._G4=new Float32Array(_t3);this._H4=new Float32Array(_t3);this._I4=new Float32Array(_t3);this._J4=-1;this._K4=-1;this._L4=-1;}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _M4=(freq.length===1&&q.length===1&&gain.length===1);
if(_M4)this._N4(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){if(_M4===false){const _w3=(freq[_j3]!==undefined)?freq[_j3]:freq[0];const _O4=(q[_j3]!==undefined)?q[_j3]:q[0];const _p3=(gain[_j3]!==undefined)?gain[_j3]:gain[0];this._N4(_w3,_O4,_p3);}const _P4=this._C4*_i3[_j3]+this._D4*this._F4[c]+this._E4*this._G4[c]-this._A4*this._H4[c]-this._B4*this._I4[c];this._G4[c]=this._F4[c];this._F4[c]=_i3[_j3];this._I4[c]=this._H4[c];
this._H4[c]=_P4;const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];_o3[_j3]=(_k3>0)?_i3[_j3]:_P4;}}return this._d3;}_N4(_Q4,_R4,_S4){if(_Q4===this._J4&&_R4===this._K4&&_S4===this._L4)return;const _T4=2*Math.PI*_Q4/sampleRate;const _U4=Math.cos(_T4);const _V4=Math.sqrt(_S4);const _W4=_V4+1;const _X4=_V4-1;const _Y4=_W4*_U4;const _Z4=_X4*_U4;const __4=_W4-_Z4;const _05=_W4+_Z4;const alpha=Math.sin(_T4)/(2*_R4);const _15=(2*Math.sqrt(_V4)*alpha);const _25=_05+_15;const _A4=-2*(_X4+_Y4);const _B4=_05-_15;const _C4=_V4*(__4+_15);
const _D4=2*_V4*(_X4-_Y4);const _E4=_V4*(__4-_15);this._A4=_A4/_25;this._B4=_B4/_25;this._C4=_C4/_25;this._D4=_D4/_25;this._E4=_E4/_25;this._J4=_Q4;this._K4=_R4;this._L4=_S4;}}registerProcessor("lo-shelf-processor",_75);class _85 extends AudioWorkletProcessor{static get parameterDescriptors(){const _45=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,_45),minValue:10.0,maxValue:_45}
,{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._A4=0;this._B4=0;this._C4=0;this._D4=0;this._E4=0;this._F4=new Float32Array(_t3);this._G4=new Float32Array(_t3);this._H4=new Float32Array(_t3);this._I4=new Float32Array(_t3);this._55=-1;this._K4=-1;}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _M4=(cutoff.length===1&&q.length===1);
if(_M4)this._N4(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){if(_M4===false){const c=(cutoff[_j3]!==undefined)?cutoff[_j3]:cutoff[0];const _O4=(q[_j3]!==undefined)?q[_j3]:q[0];this._N4(c,_O4);}const _P4=this._C4*_i3[_j3]+this._D4*this._F4[c]+this._E4*this._G4[c]-this._A4*this._H4[c]-this._B4*this._I4[c];this._G4[c]=this._F4[c];this._F4[c]=_i3[_j3];this._I4[c]=this._H4[c];this._H4[c]=_P4;const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];
_o3[_j3]=(_k3>0)?_i3[_j3]:_P4;}}return this._d3;}_N4(_65,_R4){if(_65===this._55&&_R4===this._K4)return;const _T4=2*Math.PI*_65/sampleRate;const alpha=Math.sin(_T4)/(2*_R4);const _U4=Math.cos(_T4);const _25=1+alpha;const _A4=-2*_U4;const _B4=1-alpha;const _C4=(1-_U4)/2;const _D4=1-_U4;const _E4=(1-_U4)/2;this._A4=_A4/_25;this._B4=_B4/_25;this._C4=_C4/_25;this._D4=_D4/_25;this._E4=_E4/_25;this._55=_65;this._K4=_R4;}}registerProcessor("lpf2-processor",_85);class _95 extends AudioWorkletProcessor{static get parameterDescriptors(){
const _z4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(1500.0,_z4),minValue:10.0,maxValue:_z4},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._A4=0;this._B4=0;this._C4=0;this._D4=0;this._E4=0;
this._F4=new Float32Array(_t3);this._G4=new Float32Array(_t3);this._H4=new Float32Array(_t3);this._I4=new Float32Array(_t3);this._J4=-1;this._K4=-1;this._L4=-1;}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _M4=(freq.length===1&&q.length===1&&gain.length===1);if(_M4)this._N4(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _j3=0;
_j3<_i3.length;++_j3){if(_M4===false){const _w3=(freq[_j3]!==undefined)?freq[_j3]:freq[0];const _O4=(q[_j3]!==undefined)?q[_j3]:q[0];const _p3=(gain[_j3]!==undefined)?gain[_j3]:gain[0];this._N4(_w3,_O4,_p3);}const _P4=this._C4*_i3[_j3]+this._D4*this._F4[c]+this._E4*this._G4[c]-this._A4*this._H4[c]-this._B4*this._I4[c];this._G4[c]=this._F4[c];this._F4[c]=_i3[_j3];this._I4[c]=this._H4[c];this._H4[c]=_P4;const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];_o3[_j3]=(_k3>0)?_i3[_j3]:_P4;}}return this._d3;
}_N4(_Q4,_R4,_S4){if(_Q4===this._J4&&_R4===this._K4&&_S4===this._L4)return;const _T4=2*Math.PI*_Q4/sampleRate;const _U4=Math.cos(_T4);const _V4=Math.sqrt(_S4);const alpha=Math.sin(_T4)/(2*_R4);const _a5=alpha/_V4;const _b5=alpha*_V4;const _25=1+_a5;const _A4=-2*_U4;const _B4=1-_a5;const _C4=1+_b5;const _D4=_A4;const _E4=1-_b5;this._A4=_A4/_25;this._B4=_B4/_25;this._C4=_C4/_25;this._D4=_D4/_25;this._E4=_E4/_25;this._J4=_Q4;this._K4=_R4;this._L4=_S4;}}registerProcessor("peak-eq-processor",_95);class _c5{constructor(_d5){
this._e5=0;this._f5=0;this.feedback=0;this._g5=0;this.buffer=new Float32Array(_d5);this._h5=0;}process(_l4){const out=this.buffer[this._h5];this._g5=(this._g5*this._e5)+(out*this._f5);this.buffer[this._h5]=_l4+(this._g5*this.feedback);++this._h5;this._h5%=this.buffer.length;return out;}_i5(_j5){this.feedback=Math.min(Math.max(0,_j5),1);}_k5(_l5){this._e5=Math.min(Math.max(0,_l5),1);this._f5=1-this._e5;}}class _m5{constructor(_d5){this.feedback=0;this.buffer=new Float32Array(_d5);this._h5=0;}process(_l4){
const out=this.buffer[this._h5];this.buffer[this._h5]=_l4+(out*this.feedback);++this._h5;this._h5%=this.buffer.length;return(out-_l4);}_i5(_j5){this.feedback=Math.min(Math.max(0,_j5),1);}}class _n5 extends AudioWorkletProcessor{static _o5=8;static _p5=4;static _q5=0.015;static _r5=0.4;static _s5=0.28;static _t5=0.7;static _u5=[1116,1188,1277,1356,1422,1491,1557,1617];static _v5=[1139,1211,1300,1379,1445,1514,1580,1640];static _w5=[556,441,341,225];static _x5=[579,464,364,248];static get parameterDescriptors(){return [{
name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._y5=-1;this._z5=-1;this._A5=new Array(_t3);this._B5=new Array(_t3);const _C5=[_n5._u5,_n5._v5];const _D5=[_n5._w5,
_n5._x5];for(let c=0;c<_t3;++c){this._A5[c]=new Array(_n5._o5);this._B5[c]=new Array(_n5._p5);for(let i=0;i<_n5._o5;++i)this._A5[c][i]=new _c5(_C5[c%_C5.length][i]);for(let i=0;i<_n5._p5;++i)this._B5[c][i]=new _m5(_D5[c%_D5.length][i]);}this._E5(0.5);this._k5(0.5);for(let c=0;c<_t3;++c)for(let i=0;i<_n5._p5;++i)this._B5[c][i]._i5(0.5);}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;
for(let c=0;c<input.length;++c){const _i3=input[c];const _o3=output[c];for(let _F5=0;_F5<_i3.length;++_F5){const _j3=(size[_F5]!==undefined)?size[_F5]:size[0];const _G5=(damp[_F5]!==undefined)?damp[_F5]:damp[0];this._E5(_j3);this._k5(_G5);_o3[_F5]=_i3[_F5];let out=0;const _x3=_i3[_F5]*_n5._q5;for(let i=0;i<_n5._o5;++i)out+=this._A5[c][i].process(_x3);for(let i=0;i<_n5._p5;++i)out=this._B5[c][i].process(out);const _k3=(bypass[_F5]!==undefined)?bypass[_F5]:bypass[0];if(_k3>0.0){continue;}const _z3=(mix[_F5]!==undefined)?mix[_F5]:mix[0];
_o3[_F5]*=(1-_z3);_o3[_F5]+=(out*_z3);}}return this._d3;}_E5(_d5){if(_d5===this._y5)return;const size=(_d5*_n5._s5)+_n5._t5;for(let c=0;c<this._A5.length;++c)for(let i=0;i<_n5._o5;++i)this._A5[c][i]._i5(size);this._y5=_d5;}_k5(_l5){if(_l5===this._z5)return;const damp=_l5*_n5._r5;for(let c=0;c<this._A5.length;++c)for(let i=0;i<_n5._o5;++i)this._A5[c][i]._k5(damp);this._z5=_l5;}}registerProcessor("reverb1-processor",_n5);class _H5 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",
automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,maxValue:20.0},{name:"intensity",automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_s3){super();this._c3();const _t3=_s3.outputChannelCount[0];this._I5=new Array(_t3).fill(1.0);this._J5=new Array(_t3).fill(0.0);
this._K5=new Array(_t3).fill(_L5._M5._N5);this._O5=new Array(_t3);for(let c=0;c<_t3;++c){this._O5[c]=new _P5();this._O5[c]._Q5(sampleRate);this._O5[c]._R5(this._I5[c]);this._O5[c]._S5(this._K5[c]);if(c%2===1){this._O5[c]._T5(this._J5[c]);}}}process(_g3,_h3,parameters){const input=_g3[0];const output=_h3[0];const bypass=parameters.bypass;const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;for(let c=0;c<input.length;++c){const _i3=input[c];
const _o3=output[c];for(let _j3=0;_j3<_i3.length;++_j3){_o3[_j3]=_i3[_j3];const _y3=(rate[_j3]!==undefined)?rate[_j3]:rate[0];const _U5=(offset[_j3]!==undefined)?offset[_j3]:offset[0];const _V5=(shape[_j3]!==undefined)?shape[_j3]:shape[0];this._W5(c,_y3,_U5,_V5);const _X5=this._O5[c]._d4();const _k3=(bypass[_j3]!==undefined)?bypass[_j3]:bypass[0];if(_k3>0.0){continue;}const i=(intensity[_j3]!==undefined)?intensity[_j3]:intensity[0];const out=_i3[_j3]*_X5*i;_o3[_j3]*=(1.0-i);_o3[_j3]+=out;}}return this._d3;
}_W5(_f4,_Y5,_Z5,__5){if(_Y5!==this._I5[_f4]){this._O5[_f4]._R5(_Y5);this._I5[_f4]=_Y5;}if(_Z5!==this._J5[_f4]){if(_f4%2===1){this._O5[_f4]._T5(_Z5);}this._J5[_f4]=_Z5;}if(__5!==this._K5[_f4]){this._O5[_f4]._S5(__5);this._K5[_f4]=__5;}}}registerProcessor("tremolo-processor",_H5);function _L5(){}_L5._M5={_N5:0,_06:1,_16:2,_26:3,_36:4,_46:5};_L5._56=function(_66){return 1.0-_66;};_L5._76=function(_66){return _66;};_L5._86=function(_66){return 0.5*(Math.sin((_66*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_L5._96=function(_66){
if(_66<0.5){return 0.0;}return 1.0;};_L5._a6=function(_66){if(_66<0.5){return 2.0*_66;}return 2.0-(2.0*_66);};_L5._b6=[_L5._56,_L5._76,_L5._86,_L5._96,_L5._a6];_c6._d6=512;_c6._e6=1.0/_c6._d6;function _c6(_f6){this.data=new Float32Array(_c6._d6);for(let i=0;i<_c6._d6;++i){this.data[i]=_f6(i*_c6._e6);}}_c6.prototype._d4=function(_66){_66=Math.max(0.0,_66);_66=Math.min(_66,1.0);const _g6=_66*_c6._d6;const _h6=~~_g6;const _i6=_g6-_h6;let _h4=_h6;let _i4=_h4+1;if(_h4>=_c6._d6){_h4-=_c6._d6;}if(_i4>=_c6._d6){_i4-=_c6._d6;
}const _j4=this.data[_h4];const _k4=this.data[_i4];return _j4+(_k4-_j4)*_i6;};_P5._j6=[];_P5._k6=false;_P5._l6=0.0;_P5._z4=20.0;function _P5(){this._m6=48000;this.shape=_L5._M5._16;this.freq=1.0;this._n6=0.0;this._e6=0.0;this._o6=0.0;if(_P5._k6==true){return;}for(let i=0;i<_L5._M5._46;++i){_P5._j6[i]=new _c6(_L5._b6[i]);}_P5._k6=true;}_P5._p6=function(){return(_P5._k6==true);};_P5.prototype._Q5=function(_q6){this._m6=_q6;this._r6();};_P5.prototype._R5=function(_Q4){_Q4=Math.max(_P5._l6,_Q4);_Q4=Math.min(_Q4,
_P5._z4);this.freq=_Q4;this._r6();};_P5.prototype._T5=function(_Z5){_Z5=Math.max(0.0,_Z5);_Z5=Math.min(_Z5,1.0);const _s6=_Z5-this._o6;this._o6=_Z5;this._n6+=_s6;while(this._n6>=1.0){this._n6-=1.0;}while(this._n6<0.0){this._n6+=1.0;}};_P5.prototype._S5=function(__5){__5=Math.max(0,__5);__5=Math.min(__5,_L5._M5._46-1);this.shape=__5;};_P5.prototype._d4=function(){const result=_P5._j6[this.shape]._d4(this._n6);this._n6+=this._e6;while(this._n6>=1.0){this._n6-=1.0;}return result;};_P5.prototype._r6=function(){
this._e6=this.freq/this._m6;};