import React from "react";
import PropTypes from "prop-types";
import "./DetailSlider.scss";
import Swiper from "swiper/dist/js/swiper.min";
import "swiper/dist/css/swiper.css";

class DetailSlider extends React.Component {
    static propTypes = {
        options: PropTypes.object,
        items: PropTypes.array
    };

    static defaultProps = {
        options: {
            direction: 'horizontal',
            // loop:true,
            // noSwiping: true,
            // noSwipingClass: 'stop-swiping',  // 禁止拖动切换图片
            slidesPerView: 'auto',
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        },
        items: []
    }
    ;

    constructor(props) {
        super(props);
        this.currentSwiper = null;
        this.state = {isArrowShow: true};

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    componentDidMount() {
        this.updateSwiper();
    }

    componentDidUpdate() {
        this.updateSwiper();
    }

    getSwiper() {
        return this.currentSwiper;
    }

    clearSwiper() {
        if (this.currentSwiper) {
            this.currentSwiper.destroy();
            this.currentSwiper = null;
        }
    }

    updateSwiper() {
        const swiper = this.getSwiper();
        if (swiper) {
            this.clearSwiper();
        }
        const {options} = this.props;
        const {swiperContainer} = this.refs;
        const currentSwiper = new Swiper(swiperContainer, {...options});
        this.currentSwiper = currentSwiper;
        /*if (this.currentSwiper.slides.length <= 3) {
         this.clearSwiper();
         }*/
    }

    mouseEnter(event) {
        this.setState(preState => ({
            isArrowShow: true
        }));
    }

    mouseLeave(event) {
        this.setState(preState => ({
            isArrowShow: false
        }));
    }

    isArrowVisible() {
        return this.state.isArrowShow ? 'flex' : 'none';
    }

    render() {
        const {items} = this.props;
        /*onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}*/
        return (
            <div className="detail-slider" >
                <div className={`swiper-container`} ref="swiperContainer">
                    <div className="swiper-wrapper">
                        {
                            items && items.map((item) => {
                                const {picture, url} = item;
                                return (
                                    <div className="swiper-slide" key={picture} >
                                        {url ?
                                            (<a href={url} target="_blank" rel="noopener noreferrer">
                                                <img src={picture} alt="logo"/>
                                            </a>)
                                            :
                                            (<img src={picture} alt="logo"/>)
                                        }
                                    </div>);
                            })
                        }
                    </div>
                    <div className="swiper-button-prev" style={{display: this.isArrowVisible()}} />
                    <div className="swiper-button-next" style={{display: this.isArrowVisible()}} />
                </div>
            </div>
        );
    }
}

export default DetailSlider;