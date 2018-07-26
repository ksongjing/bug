import React, { Component } from 'react';
import './Product.scss'
import PropTypes from "prop-types";
import iconGameIntro from "../../../assets/images/icon-gameintro.png";
import iconSDK from "../../../assets/images/icon-sdk.png";
/**
 * Created by ChenLiheng on 2018/7/15.
 * @desc 产品与服务介绍组件
 */

class Product extends Component{
    static propTypes = {
        title: PropTypes.string
    };
    render() {
        const {title} = this.props;
        return (
            <div id="product" className="product">
                <div className="container product-container">
                    <h2>{title}</h2>
                    <div className="product-items">
                        <div className="product-item">
                            <img className="item-img" src={iconGameIntro} alt="Fair Games"/>
                            <div className="item-content">
                                <h3 className="item-title">Fair Games</h3>
                                <div className="item-desc">Fair.Game是全球首個基於區塊鏈技術建立的公平遊戲平臺，已在全球範圍內率先推出正式公鏈上運行的區塊鏈遊戲。並將在今後陸續推出更多類型的區塊鏈遊戲，傳遞給全球數億的線上遊戲用戶。</div>
                            </div>
                        </div>
                        <div className="product-item">
                            <img className="item-img" src={iconSDK} alt="Fair SDK"/>
                            <div className="item-content">
                                <h3 className="item-title">Fair SDK</h3>
                                <div className="item-desc">SDK是Fair.Game平台推出的面向傳統遊戲開發商以及開發者，利用區塊鏈技術，提供完全公平性能力、遊戲道具區塊鏈資產化、用戶安全數字錢包、以及區塊鏈貨幣支付通道的革命性產品。</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Product;
