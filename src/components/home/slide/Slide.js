import React from "react";
import PropTypes from 'prop-types';
import "./Slide.scss"
import Swiper from 'swiper/dist/js/swiper.min';
import 'swiper/dist/css/swiper.css';

class Slide extends React.Component {
    static propTypes = {
        options: PropTypes.object,
        items: PropTypes.array
    };

    static defaultProps = {
        options: {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                stopOnLastSlide: false
            },
            pagination: {
                el: '.swiper-pagination'
            },
            loop: true
        },
        items: []
    };

    constructor(props) {
        super(props);
        this.currentSwiper = null;
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
        if (this.currentSwiper.slides.length <= 3) {
            this.clearSwiper();
        }
    }

    render() {
        const {items} = this.props;
        return (
            <div className="slide">
                <div className={`swiper-container`} ref="swiperContainer">
                    <div className="swiper-wrapper">
                        {
                            items && items.map((item) => {
                                const {picture, url} = item;
                                return (<div className="slider-item swiper-slide" key={picture}>
                                    <div className="slide-content custom-slide-content">
                                        {url ? (<a href={url} target="_blank" rel="noopener noreferrer">
                                            <div className="swiper-img custom-swiper-img"
                                                 style={{backgroundImage: "url(" + picture + ")"}}/>
                                        </a>) : (<div className="swiper-img custom-swiper-img"
                                                      style={{backgroundImage: "url(" + picture + ")"}}/>)}
                                    </div>
                                </div>);
                            })
                        }
                    </div>
                    <div className="swiper-pagination" />
                </div>
            </div>
        );
    }
}

export default Slide;