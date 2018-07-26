import React, { Component } from 'react';
import intl from 'react-intl-universal';
import ImageUploader from 'react-images-upload';
import './FormGame.scss';
import iconInfo from '../../../assets/images/icon-info-accepted.png'

class FormGame extends Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDropSingle = this.onDropSingle.bind(this);
        this.coverBtn = this.coverBtn.bind(this);
        this.state = {
            pictures:[],
            language:[],
            arr:['冒险','热血'],
            contact:'contact',
            canSubmit: false,
            data:{
                game_block:{
                    zh: {},
                    en: {}
                },
                game_status:{
                    zh: {},
                    en: {}
                },
                game_type: {
                    zh: {},
                    en: {}
                },
                language:{
                    zh: {},
                    en: {}
                }
            },
            lang: this.getLang()
        };
    }
    getLang(){
        let lang = window.location.search;
        if (lang.indexOf('lang=zh-CN') > -1){
            return 'zh';
        }else{
            return 'en';
        }
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    enableButton() {
        this.setState({
            canSubmit: true,
        });
    }
    // 提交数据
    handleSubmit(e) {
        // 组装数据
        let refsObj = this.refs;
        let params = {
            name: refsObj.name.value,
            game_type: Number(refsObj.game_type.value),
            devloper: refsObj.devloper.value,
            language: this.state.language,
            game_status: Number(refsObj.game_status.value),
            game_tag:this.state.arr,
            belong_block: refsObj.game_block.value,
            game_token: refsObj.game_token.value,
            game_site: refsObj.game_site.value,
            contact:this.state.contact,
            icon: this.state.icon,
            pictures: this.state.pictures,
            email: refsObj.email.value,
            phone: refsObj.phone.value,
            wechat:refsObj.wechat.value,
            github:refsObj.github.value,
            twitter:refsObj.twitter.value,
            telegram:refsObj.telegram.value
        };
        console.log("数据格式：", params);
        let tempStr = "";
        for(var key in params){
            tempStr += key + "=" + params[key] + "&";
        }
        console.log(tempStr);
        let url = "https://test.fair.game/api/v1/games/submit_game_info/";
        fetch(url,{
            method:'POST',
            body:JSON.stringify(params),
            mode:"cors",
        }).then(resp => resp.json())
        .then(json => {
          console.log(json.msg);
          if(json.msg === "success"){
              this.judge()
          }

        })
        .catch(error => {
          console.error(error);
        })
        e.preventDefault();
    }
    // 获得配置数据
    fetchData() {
        let url = "https://test.fair.game/api/v1/games/game_config/";
         // 异步请求数据
         fetch(url)
             .then(resp => resp.json())
             // 发送数据请求成功的消息
             .then(json => {
                 if (json.msg === 'success') {
                     // console.log(json.data,33333333333333);
                     this.setState({
                         data: json.data
                     })
                     
                    // console.log(json.data.game_type[this.state.lang], 99999);
                 } else {
                    
                 }
             })
             .catch(error => {
                 console.error(error)
             });
    }

    componentDidMount() {
        //加载配置数据
        this.fetchData();
    }
    
    getObjToArr(key){ // 转化为数组
        var object = this.state.data[key][this.state.lang];
        var arr = [];
        for (var i in object) {
            arr.push(object[i]);
        }
        return arr;
    }
    // 获得option列表
    getOptionList(key){
        return this.getObjToArr(key).map((item,index)=>{
            return <option defaultValue = {item} key={index} value={index}>{item}</option>
        })
    }
    // 获得checkbox
    getCBList(key) {
        return this.getObjToArr(key).map((item,index)=>{
            return (
                <span  key={index}>
                    <i className="cover" />
                    <input type="checkbox" name="language[]" className="language" ref={index} defaultValue={item} value={item} onChange={(e) => this.coverBtn(index,e)} />
                    <span className="text">{item}</span>
                </span>
            )
        })
    }
    // 上传图片
    uploadAjaxFile(file) {
        let url = "http://114.215.82.77:9000/goods/singleUpload";
        var formdata = new FormData();
        formdata.append('file', file);

        return fetch(url, {
                method: "POST",
                body: formdata
            }).then(resp => resp.json())
             .catch(error => {
                 console.error(error)
             });
    }
    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures:pictureDataURLs
        })
    }
    onDropSingle(pictureFiles, pictureDataURLs) {
        let imgBase64 = pictureDataURLs[pictureDataURLs.length - 1];
        this.setState({
            icon: imgBase64
        })
    }
    coverBtn(index,e){
        // let check = document.getElementsByClassName("language");
        // let iCover = document.getElementsByTagName("cover");
        // console.log(check,index);
        // if(check[index].checked){
        //     iCover.style.backgroundPosition = "0 10px";
        // }else{
        //     iCover[index].style.opacity = '1';
        // }
        // console.log();
        // this.setState({
        //     data:this.state.data.map((ele,i,arr)=>{
        //         if(index == i){
        //             ele.checked = !ele.checked
        //         }
        //         return ele
        //     })
        // })
    }
    //邮箱
    emailBtn(e){
        let email = this.refs.email.value;
        let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(ePattern.test(email)){}else{
            let docEmail = document.getElementById('spEmail');
            docEmail.style.color = "red";
            docEmail.innerHTML = '✖';
        }
    }
    //弹出框
    judge(){
        let model = document.getElementById('m-modal');
        model.style.zIndex = '1';
    }

    render() {
        return (
        <div className="formgame"  ref="form">
            <div className="container form-container">
                <div className="for-title">{intl.get("submitGame")}</div>
                <div className="form-content">
                    {/*游戏名称*/}
                    <div className="form-text">
                        <span className="form-name">* {intl.get("name")}</span>
                        <div className="know">
                            <input type="text" ref="name" name="name" className="form-size"/>
                        </div>
                    </div>
                    {/*游戏类型*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("gameType")}</span>
                        <div className="know">
                            <select  ref="game_type" className="form-size" name="game_type">
                                {
                                    this.getOptionList('game_type')
                                }
                            </select>
                        </div>
                    </div>
                    {/*开发团队*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("devloper")}</span>
                        <div className="know">
                            <input  ref="devloper" name="devloper" type="text" className="form-size" />
                        </div>
                    </div>
                    {/*语言*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("language")}</span>
                        <div className="know" ref="language" name="language">
                            {
                                this.getCBList('language')
                            }
                        </div>
                    </div>
                    {/*游戏状态*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("gameStatus")}</span>
                        <div className="know">
                            <select ref="game_status"  className="form-size" name="game_status">
                                {
                                    this.getOptionList('game_status')
                                }
                            </select>
                        </div>
                    </div>
                    {/*热门标签*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("gameTag")}</span>
                        <div className="know">
                            <input className="form-label" ref=""/>
                            <input className="form-label" ref=""/>
                            <input className="form-label" ref=""/>
                        </div>
                    </div>
                    {/*所在主链*/}
                    <div className="form-text">
                        <div className="form-name">
                            <span className="main">{intl.get("gameBlock")}</span>
                        </div>
                        <div className="know">
                            <select ref="game_block" className="form-size" name="game_block">
                                {
                                    this.getOptionList('game_block')
                                }
                            </select>
                        </div>
                    </div>
                    {/*所用币种*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("gameKoken")}</span>
                        <div className="know">
                            <input type="text" ref="game_token" name="game_token" className="form-size"/>
                        </div>
                    </div>
                    {/*网站入口*/}
                    <div className="form-text">
                        <span className="form-name">* {intl.get("gameSite")}</span>
                        <div className="know">
                            <input type="text" ref="game_site" name="game_site" className="form-size"/>
                        </div>
                    </div>
                    {/*推广图*/}
                    <div className="form-text form-mar">
                        <span className="form-name form-padd vm-middle">{intl.get("icon")}</span>
                        <div className="know vm-middle">
                             <p>
                                 <img src={this.state.icon} className="figure-image"/>
                             </p>
                             <ImageUploader
                                 withPreview={false}
                                 withIcon={false}
                                 buttonType="text"
                                 buttonText= {intl.get('uploadPpicture')}
                                 onChange={this.onDropSingle}
                                 imgExtension={['.jpg','.png']}
                                 maxFileSize={5242880}
                             />
                        </div>
                    </div>
                    {/*游戏截图*/}
                    <div className="form-text form-mar">
                        <span className="form-name form-padd vm-middle">{intl.get("pictures")}</span>
                        <div className="know vm-middle">
                           <p>
                               {
                                   this.state.pictures.map((item, index) => {
                                        return (
                                            <span className="mr10" key={index}>
                                                <img src={item} width="143px" height="82px" />
                                            </span>
                                        )
                                   })
                               }
                           </p>
                           <ImageUploader
                               withPreview={false}
                               withIcon={false}
                               buttonType="text"
                               buttonText= {intl.get('uploadPpicture')}
                               onChange={this.onDrop}
                               imgExtension={['.jpg','.png']}
                               maxFileSize={5242880}
                            />
                        </div>
                    </div>
                    {/*Email*/}
                    <div className="form-text">
                        <span className="form-name">* {intl.get("email")}</span>
                        <div className="know">
                            <input type="text" ref="email" name="email" className="form-size" onBlur={this.emailBtn.bind(this)} /><span className="validation" id="spEmail"></span>
                        </div>
                    </div>
                    {/*Phone*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("phone")}</span>
                        <div className="know">
                            <input type="text" ref="phone" name="phone" className="form-size" />
                        </div>
                    </div>
                    {/*Wechat*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("wechat")}</span>
                        <div className="know">
                            <input type="text" ref="wechat" name="wechat" className="form-size"/>
                        </div>
                    </div>
                    {/*Github*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("github")}</span>
                        <div className="know">
                            <input type="text" ref="github" name="github" className="form-size"/>
                        </div>
                    </div>
                    {/*Twitter*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("twitter")}</span>
                        <div className="know">
                            <input type="text" ref="twitter" name="twitter" className="form-size"/>
                        </div>
                    </div>
                    {/*Telegram*/}
                    <div className="form-text">
                        <span className="form-name">{intl.get("telegram")}</span>
                        <div className="know">
                            <input type="text" ref="telegram" name="telegram" className="form-size"/>
                        </div>
                    </div>
                    {/*提交*/}
                    <div className="form-text">
                        <span className="form-name"></span>
                        <div className="know">
                            <div className="form-btn">
                                <button onClick = {this.handleSubmit.bind(this)} className="btn">{intl.get("submit")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*遮罩层*/}
            <div id="m-modal">
                <div className="m-body">
                    <div className="m-images"><img src={iconInfo} alt=""/></div>
                    <div className="m-size"><p>{intl.get("Submit")}</p></div>
                    <button className="jump">{intl.get("btnHome")}</button>
                </div>
            </div>
        </div>
        );
    }
}
export default FormGame;