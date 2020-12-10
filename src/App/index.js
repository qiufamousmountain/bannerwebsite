import React from 'react';
import ReactDom from 'react-dom';
import ReactSwipe from 'react-swipe';

import { axios } from '../utils/server'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      FS: false
    }
  }


  fullScreen(e, el = document.documentElement) {
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
      wscript;

    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
      this.setState({
        FS: true
      })
      return;
    }
    if (typeof window.ActiveXObject != "undefined") {
      wscript = new ActiveXObject("WScript.Shell");
      if (wscript) {
        wscript.SendKeys("{F11}");
        this.setState({
          FS: true
        })
      }
    }
  }
  exitFullScreen(e, el = document) {
    let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
      wscript;

    if (typeof cfs != "undefined" && cfs) {
      cfs.call(el);

      this.setState({
        FS: false
      })
      return;
    }
    if (typeof window.ActiveXObject != "undefined") {
      wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{F11}");
        this.setState({
          FS: false
        })
      }
    }

  }

  componentDidMount() {
    this.getBanner()
    window.addEventListener('resize', (e) => {
      let { FS } = this.state;
      let isFull = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false
      console.log(isFull, FS,e)
      this.setState({
        FS:!!(isFull)
      })
    })

  }
  componentWillUnmount() {
    window.removeEventListener('resize')
  }
  getBanner() {
    axios.get(`/api/getBanner`)
      .then((response) => {

        let resData = response.data

        if (resData.code == 200) {

          this.setState({
            banner: resData.data
          })
        } else {

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { banner, FS } = this.state;
    return (
      <div className='banner-c'>

        <div className="control-box">

          {
            FS ?
              <div className="control-item out-full" onClick={this.exitFullScreen.bind(this)}>退出全屏</div>
              : <div className="control-item full-btn" onClick={this.fullScreen.bind(this)}>启动全屏</div>


          }

        </div>
        <div className="control-box-bottom">

          <div className="control-item get-btn" onClick={this.getBanner.bind(this)}>获取最新</div>




        </div>
        <ReactSwipe
          className="carousel"
          childCount={banner.length}
          swipeOptions={{
            startSlide: 0,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
          }}
        >
          {banner.map((m, i) => {

            let style = {

            }
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
            if (m.width / m.height > clientWidth / clientHeight) {
              style.width = '100%'
            } else {
              style.height = '100%'
            }
            return (




              <div className="items"
                key={i + 'banner'}

              >
                <img className="item-banner"
                  src={`/images/${decodeURIComponent(m.url)}`}
                  style={style}

                />
              </div>


            )
          })
          }
        </ReactSwipe>
      </div>



    )
  }
}
