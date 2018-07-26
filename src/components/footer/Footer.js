import React, {Component} from 'react';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <div className="Footer-contact">
                    <a href="https://www.facebook.com/Fair-Game-123349521678470/" target="_blank" rel="noopener noreferrer">
                        <div className="img-fcb" alt="Facebook"/>
                    </a>
                    <a href="https://github.com/FairGame2017" target="_blank" rel="noopener noreferrer">
                        <div className="img-git" alt="Git"/>
                    </a>
                    <a href="https://twitter.com/fairgameonline" target="_blank" rel="noopener noreferrer">
                        <div className="img-twi" alt="Twitter"/>
                    </a>
                    <a href="https://t.me/fairgame_global" target="_blank" rel="noopener noreferrer">
                        <div className="img-tel" alt="Telegram"/>
                    </a>
                    <a href="https://medium.com/@FairGameOnline" target="_blank" rel="noopener noreferrer">
                        <div className="img-med" alt="Medium"/>
                    </a>
                </div>
                <div className="Footer-copyright">
                    <div className="text">COPYRIGHT © 2017-2018 Fair.Game 版權所有。</div>
                </div>
            </div>
        );
    }
}

export default Footer;